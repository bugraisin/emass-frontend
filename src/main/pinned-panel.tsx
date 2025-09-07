import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import PushPinIcon from '@mui/icons-material/PushPin';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';

interface PinnedPanelProps {
    pinnedListings: any[];
    onUnpinListing: (listingId: string) => void;
}

// Son görüntülenen ilanları yönetmek için utility fonksiyonlar
const getRecentListings = (): any[] => {
    try {
        const recent = localStorage.getItem('recentListings');
        return recent ? JSON.parse(recent) : [];
    } catch (error) {
        console.error('Recent listings alınırken hata:', error);
        return [];
    }
};

const addToRecentListings = (listing: any) => {
    try {
        let recentListings = getRecentListings();
        
        // Aynı ilan zaten varsa çıkar
        recentListings = recentListings.filter(item => item.id !== listing.id);
        
        // Yeni ilanı başa ekle
        recentListings.unshift({
            id: listing.id,
            title: listing.title,
            price: listing.price,
            district: listing.district,
            neighborhood: listing.neighborhood,
            thumbnailUrl: listing.thumbnailUrl || listing.imageUrl || listing.image,
            createdAt: listing.createdAt,
            viewedAt: new Date().toISOString()
        });
        
        // Maksimum 10 ilan tut
        if (recentListings.length > 10) {
            recentListings = recentListings.slice(0, 10);
        }
        
        localStorage.setItem('recentListings', JSON.stringify(recentListings));
    } catch (error) {
        console.error('Recent listings kaydedilirken hata:', error);
    }
};

export { addToRecentListings }; // Bu fonksiyonu ilan detay sayfalarında kullanmak için export ediyoruz

export default function PinnedPanel({ pinnedListings, onUnpinListing }: PinnedPanelProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'pinned' | 'liked' | 'recent'>('pinned');
    const [recentListings, setRecentListings] = useState<any[]>([]);
    
    // Component mount olduğunda recent listings'i yükle
    useEffect(() => {
        setRecentListings(getRecentListings());
    }, []);
    
    // localStorage değişikliklerini dinle (başka sekme/pencereden değişirse)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'recentListings') {
                setRecentListings(getRecentListings());
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    
    // Dummy data for testing - backend'den gelecek
    const likedListings: any[] = []; // Backend'den gelecek
    
    // Aktif sekmeye göre gösterilecek veriyi belirle
    const getCurrentListings = () => {
        switch (activeTab) {
            case 'pinned':
                return pinnedListings;
            case 'liked':
                return likedListings;
            case 'recent':
                return recentListings;
            default:
                return pinnedListings;
        }
    };

    const currentListings = getCurrentListings();
    
    // Hiç veri yoksa paneli gösterme
    if (pinnedListings.length === 0 && likedListings.length === 0 && recentListings.length === 0) {
        return null;
    }

    const handleCardClick = (listing: any) => {
        // İlan detayına gitme işlemi
        navigate(`/ilan/${listing.id}`);
        
        // Eğer recent sekmesinde değilsek, bu ilanı recent'e ekle
        if (activeTab !== 'recent') {
            addToRecentListings(listing);
            setRecentListings(getRecentListings()); // State'i güncelle
        }
    };

    const handleUnpin = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        if (activeTab === 'pinned') {
            onUnpinListing(listingId);
        }
        // Liked ve recent için ayrı handler'lar eklenebilir
    };

    // Recent listeden ilan silme fonksiyonu
    const handleRemoveFromRecent = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        const updatedRecent = recentListings.filter(item => item.id !== listingId);
        localStorage.setItem('recentListings', JSON.stringify(updatedRecent));
        setRecentListings(updatedRecent);
    };

    // Tab içeriği ve sayıları
    const getTabInfo = (tab: 'pinned' | 'liked' | 'recent') => {
        switch (tab) {
            case 'pinned':
                return { 
                    label: 'Sabitlendi', 
                    icon: <PushPinIcon sx={{ fontSize: 14 }} />, 
                    count: pinnedListings.length 
                };
            case 'liked':
                return { 
                    label: 'Beğeniler', 
                    icon: <FavoriteIcon sx={{ fontSize: 14 }} />, 
                    count: likedListings.length 
                };
            case 'recent':
                return { 
                    label: 'Son Görüntülenen', 
                    icon: <HistoryIcon sx={{ fontSize: 14 }} />, 
                    count: recentListings.length 
                };
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                background: 'rgba(148, 163, 184, 0.1)',
                border: '1px solid rgba(148, 163, 184, 0.3)',                
                padding: '4px',
                maxHeight: '100%',
                overflowY: 'auto',
            }}
        >
            {/* Tab Butonları */}
            <Box sx={{ 
                display: 'flex', 
                marginBottom: '8px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.7)',
                padding: '2px'
            }}>
                {(['pinned', 'liked', 'recent'] as const).map((tab) => {
                    const tabInfo = getTabInfo(tab);
                    const isActive = activeTab === tab;
                    const hasContent = tab === 'pinned' ? pinnedListings.length > 0 : 
                                     tab === 'liked' ? likedListings.length > 0 : 
                                     recentListings.length > 0;
                    
                    return (
                        <Button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            sx={{
                                flex: 1,
                                fontSize: '9px', 
                                fontWeight: 600,
                                color: isActive ? '#ed9517' : '#64748b',
                                backgroundColor: isActive ? 'rgba(237, 149, 23, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '8px 2px',
                                minWidth: 0,
                                textTransform: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '3px',
                                '&:hover': {
                                    backgroundColor: isActive ? 'rgba(237, 149, 23, 0.15)' : 'rgba(100, 116, 139, 0.1)',
                                },
                                opacity: hasContent ? 1 : 0.5
                            }}
                        >
                            {tabInfo.icon}
                            <Box sx={{ fontSize: '9px', lineHeight: 1, textAlign: 'center' }}> {/* 8px'ten 9px'e */}
                                {tabInfo.label}
                            </Box>
                            <Box sx={{ fontSize: '8px', lineHeight: 1, color: isActive ? '#ed9517' : '#9ca3af' }}> {/* 7px'ten 8px'e */}
                                ({tabInfo.count})
                            </Box>
                        </Button>
                    );
                })}
            </Box>
            
            {/* İçerik listesi */}
            {currentListings.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    color: '#9ca3af',
                    textAlign: 'center'
                }}>
                    {getTabInfo(activeTab).icon}
                    <Typography sx={{ fontSize: '11px', marginTop: '4px' }}>
                        {activeTab === 'pinned' && 'Henüz sabitlenmiş ilan yok'}
                        {activeTab === 'liked' && 'Henüz beğenilen ilan yok'}
                        {activeTab === 'recent' && 'Henüz görüntülenen ilan yok'}
                    </Typography>
                </Box>
            ) : (
                currentListings.map((listing) => (
                    <Box key={listing.id} sx={{ marginBottom: '6px' }}>
                        <Card sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            overflow: 'hidden',
                            height: '85px',
                            position: 'relative',
                            cursor: 'pointer',
                            "&:hover": {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                        }}
                        onClick={() => handleCardClick(listing)}
                        >
                            {/* Close/Unpin butonu - sadece pinned sekmesinde, recent'te de var ama farklı */}
                            {(activeTab === 'pinned' || activeTab === 'recent') && (
                                <IconButton
                                    onClick={(e) => activeTab === 'pinned' ? handleUnpin(e, listing.id) : handleRemoveFromRecent(e, listing.id)}
                                    sx={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(4px)',
                                        width: '22px',
                                        height: '22px',
                                        zIndex: 2,
                                        '&:hover': {
                                            background: '#fee2e2',
                                            color: '#dc2626',
                                        }
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                            )}
                            
                            {/* Resim */}
                            {listing.thumbnailUrl || listing.imageUrl || listing.image ? (
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        width: 80,
                                        height: '100%', 
                                        objectFit: 'cover',
                                        flexShrink: 0
                                    }}
                                    image={listing.thumbnailUrl || listing.imageUrl || listing.image}
                                    alt={listing.title}
                                />
                            ) : (
                                <Box sx={{
                                    width: 80,
                                    height: '100%',
                                    backgroundColor: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <ImageIcon sx={{ fontSize: 28, color: '#9ca3af' }} />
                                </Box>
                            )}
                            
                            {/* İçerik */}
                            <CardContent sx={{ 
                                padding: '4px 6px',
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                height: '100%',
                                '&:last-child': { paddingBottom: '4px' }
                            }}>
                                {/* Başlık */}
                                <Typography 
                                    variant="h6" 
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        fontSize: '12px',
                                        letterSpacing: '-0.1px',
                                        lineHeight: 1.2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        marginBottom: '2px'
                                    }}
                                >
                                    {listing.title}
                                </Typography>
                                
                                {/* İlçe ve Mahalle */}
                                <Typography 
                                    variant="body2" 
                                    sx={{
                                        color: '#64748b',
                                        fontSize: '10px',
                                        lineHeight: 1.2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginBottom: '2px'
                                    }}
                                >
                                    {listing.district && listing.neighborhood 
                                        ? `${listing.district}, ${listing.neighborhood}`
                                        : listing.district || listing.neighborhood || 'Konum bilgisi yok'
                                    }
                                </Typography>

                                {/* Alt satır: Tarih sol, Fiyat sağ */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginTop: 'auto'
                                }}>
                                    {/* Eklenme/Görüntülenme Tarihi */}
                                    <Typography 
                                        variant="caption" 
                                        sx={{
                                            color: '#9ca3af',
                                            fontSize: '9px',
                                        }}
                                    >
                                        {activeTab === 'recent' && listing.viewedAt ? 
                                            new Date(listing.viewedAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) :
                                            listing.createdAt ? 
                                                new Date(listing.createdAt).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }) : 
                                                'Tarih yok'
                                        }
                                    </Typography>
                                    
                                    {/* Fiyat */}
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color: '#ed9517',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            letterSpacing: '-0.1px',
                                        }}
                                    >
                                        {listing.price ? 
                                            `${parseInt(listing.price).toLocaleString('tr-TR')} ₺` : 
                                            'Fiyat yok'
                                        }
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))
            )}
        </Box>
    );
}

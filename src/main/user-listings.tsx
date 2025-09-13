import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Skeleton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ListingService } from './services/ListingService.ts';
import { addToRecentListings } from './pinned-panel.tsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getUserId } from './util.ts';

interface UserListing {
    id: string;
    title: string;
    price: string;
    district: string;
    neighborhood: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    createdAt: string;
    favoriteCount: number;
    viewCount: number;
    status: 'ACTIVE' | 'INACTIVE' | 'SOLD';
}

export default function UserListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState<UserListing[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = getUserId();
    const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'views' | 'favorites'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const loadUserListings = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const listingData = await ListingService.getUserListings(currentUserId);
                const mappedListings: UserListing[] = listingData.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    district: item.district ?? '',
                    neighborhood: item.neighborhood ?? '',
                    imageUrl: item.imageUrl,
                    thumbnailUrl: item.thumbnailUrl,
                    createdAt: item.createdAt,
                    favoriteCount: item.favoriteCount ?? 0,
                    viewCount: item.viewCount ?? 0,
                    status: item.status ?? 'ACTIVE'
                }));
                setListings(mappedListings);
            } catch (error) {
                console.error('İlanlar yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserListings();
    }, [currentUserId]);

    // Sıralanmış ilanlar
    const sortedListings = useMemo(() => {
        return [...listings].sort((a, b) => {
            if (sortBy === 'date') {
                const dateA = new Date(a.createdAt || 0).getTime();
                const dateB = new Date(b.createdAt || 0).getTime();
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            } else if (sortBy === 'price') {
                const priceA = parseInt(a.price) || 0;
                const priceB = parseInt(b.price) || 0;
                return sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
            } else if (sortBy === 'views') {
                return sortOrder === 'desc' ? b.viewCount - a.viewCount : a.viewCount - b.viewCount;
            } else if (sortBy === 'favorites') {
                return sortOrder === 'desc' ? b.favoriteCount - a.favoriteCount : a.favoriteCount - b.favoriteCount;
            }
            return 0;
        });
    }, [listings, sortBy, sortOrder]);

    const handleEditListing = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        navigate(`/ilan-duzenle/${listingId}`);
    };

    const handleShareListing = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/ilan/${listingId}`);
    };

    const handleCardClick = (listing: UserListing) => {
        addToRecentListings(listing);
        navigate(`/ilan/${listing.id}`);
    };

    const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const handleSortSelect = (type: 'date' | 'price' | 'views' | 'favorites', order: 'asc' | 'desc') => {
        setSortBy(type);
        setSortOrder(order);
        setSortAnchorEl(null);
    };

    // Buton metnini ve ok yönünü belirleyen fonksiyon
    const getSortButtonContent = () => {
        const isDescending = sortOrder === 'desc';
        let sortText = '';
        switch (sortBy) {
            case 'date':
                sortText = 'Tarihe Göre';
                break;
            case 'price':
                sortText = 'Fiyata Göre';
                break;
            case 'views':
                sortText = 'Görüntülenmeye Göre';
                break;
            case 'favorites':
                sortText = 'Favoriye Göre';
                break;
        }
        const ArrowIcon = isDescending ? KeyboardArrowDownIcon : KeyboardArrowUpIcon;
        
        return { sortText, ArrowIcon };
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return { bg: '#dcfce7', color: '#16a34a' };
            case 'INACTIVE':
                return { bg: '#fef3c7', color: '#d97706' };
            case 'SOLD':
                return { bg: '#fee2e2', color: '#dc2626' };
            default:
                return { bg: '#f3f4f6', color: '#6b7280' };
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'Aktif';
            case 'INACTIVE':
                return 'Pasif';
            case 'SOLD':
                return 'Satıldı';
            default:
                return 'Bilinmiyor';
        }
    };

    const SkeletonLoadingCards = () => (
        <Box 
            sx={{ 
                backgroundColor: '#f1f5f9',
                borderRadius: '6px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1 // Daha tutarlı gap
            }}
        >
            {/* Header Skeleton - Gerçek header yapısına uygun */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mb: 1 // Daha az margin
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Geri butonu skeleton */}
                    <Skeleton 
                        variant="rectangular" 
                        width={40} 
                        height={40} 
                        animation="wave"
                        sx={{ borderRadius: 1 }}
                    />
                    {/* Favoriler başlığı skeleton */}
                    <Skeleton 
                        variant="text" 
                        width={80} 
                        height={24} 
                        animation="wave"
                    />
                    {/* Sayaç skeleton */}
                    <Skeleton 
                        variant="rectangular" 
                        width={30} 
                        height={20} 
                        animation="wave"
                        sx={{ borderRadius: '6px' }}
                    />
                </Box>
                {/* Sıralama butonu skeleton */}
                <Skeleton 
                    variant="rectangular" 
                    width={100} 
                    height={32} 
                    animation="wave"
                    sx={{ borderRadius: '6px' }}
                />
            </Box>
            
            {/* İlan kartları skeleton - MainPanel card yapısına uygun */}
            {Array.from({ length: 6 }).map((_, index) => (
                <Card
                    key={index}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: '#fff',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        height: '160px' // Gerçek kartlarla aynı yükseklik
                    }}
                >
                    {/* Fotoğraf skeleton */}
                    <Skeleton 
                        variant="rectangular" 
                        width={200} 
                        height="100%" 
                        animation="wave"
                    />
                    
                    <CardContent sx={{ 
                        padding: '12px 16px', // Gerçek padding değerleri
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        height: '100%',
                        '&:last-child': { paddingBottom: '12px' }
                    }}>
                        {/* 1. SATIR: Tarih (sol) ve Butonlar (sağ) */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            height: '28px', // Gerçek yükseklik
                            marginBottom: '8px'
                        }}>
                            {/* Tarih skeleton */}
                            <Skeleton 
                                variant="text" 
                                width="25%" 
                                height={14} 
                                animation="wave"
                            />
                            
                            {/* Butonlar skeleton */}
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <Skeleton 
                                    variant="text" 
                                    width={50} 
                                    height={14} 
                                    animation="wave"
                                />
                                <Skeleton 
                                    variant="text" 
                                    width={80} 
                                    height={14} 
                                    animation="wave"
                                />
                            </Box>
                        </Box>
                        
                        {/* 2. SATIR: Başlık */}
                        <Box sx={{ 
                            flex: 1,
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: '8px'
                        }}>
                            <Box sx={{ width: '100%' }}>
                                <Skeleton 
                                    variant="text" 
                                    width="85%" 
                                    height={20} 
                                    animation="wave"
                                    sx={{ mb: 0.5 }}
                                />
                                <Skeleton 
                                    variant="text" 
                                    width="60%" 
                                    height={20} 
                                    animation="wave"
                                />
                            </Box>
                        </Box>
                        
                        {/* 3. SATIR: Adres (sol) ve Fiyat (sağ) */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            height: '24px' // Gerçek yükseklik
                        }}>
                            {/* Adres skeleton */}
                            <Skeleton 
                                variant="text" 
                                width="45%" 
                                height={16} 
                                animation="wave"
                            />
                            
                            {/* Fiyat skeleton */}
                            <Skeleton 
                                variant="text" 
                                width="35%" 
                                height={20} 
                                animation="wave"
                            />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px' }}>
                <Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <SkeletonLoadingCards />
                </Box>
            </Box>
        );
    }

    if (listings.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px' }}>
                <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Box 
                        sx={{ 
                            backgroundColor: 'rgba(30, 41, 59, 0.2)',
                            borderRadius: '6px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <Button onClick={() => navigate('/')} sx={{ minWidth: 'auto', color: "#1e293b" }}>
                                <ArrowBackIcon />
                            </Button>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                İlanlarım
                            </Typography>
                        </Box>
                        
                        <Box display="flex" justifyContent="center" alignItems="center" height="50vh" flexDirection="column">
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                                Henüz ilan yok
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                İlk ilanınızı oluşturun ve yayınlamaya başlayın
                            </Typography>
                            <Button
                                onClick={() => navigate('/ilan-ekle')}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ed9517',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    px: 3
                                }}
                            >
                                İlan Oluştur
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', padding: '16px' }}>
            <Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Box 
                    sx={{ 
                        backgroundColor: 'rgba(30, 41, 59, 0.2)',
                        borderRadius: '6px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button 
                                onClick={() => navigate('/')} 
                                sx={{ minWidth: 'auto', color: "#1e293b" }}
                            >
                                <ArrowBackIcon />
                            </Button>
                            
                            <Typography 
                                variant="h6" 
                                sx={{ fontWeight: 600, color: '#1e293b' }}
                            >
                                İlanlarım
                            </Typography>
                            
                            <Typography 
                                sx={{
                                    color: '#374151',
                                    fontWeight: 600,
                                    fontSize: '17px',
                                }}
                            >
                                ({listings.length})
                            </Typography>
                        </Box>
                        
                        {/* Sıralama Butonu */}
                        <Button
                            onClick={handleSortClick}
                            endIcon={React.createElement(getSortButtonContent().ArrowIcon)}
                            sx={{
                                backgroundColor: 'white',
                                color: '#64748b',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                textTransform: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: '#f8fafc'
                                }
                            }}
                        >
                            {getSortButtonContent().sortText}
                        </Button>
                    </Box>

                    {/* İlanlar */}
                    {sortedListings.map((listing) => (
                        <Card
                            key={listing.id}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                cursor: "pointer",
                                background: '#fff',
                                borderRadius: '6px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                height: '180px',
                                position: 'relative',
                                "&:hover": {
                                    border: '1px solid #1e293b',
                                },
                            }}
                            onClick={() => handleCardClick(listing)}
                        >
                            {/* Durum Badge */}
                            <Box sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                backgroundColor: getStatusColor(listing.status).bg,
                                color: getStatusColor(listing.status).color,
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                zIndex: 1
                            }}>
                                {getStatusText(listing.status)}
                            </Box>

                            {listing.thumbnailUrl || listing.imageUrl ? (
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        width: 200, 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        flexShrink: 0
                                    }}
                                    image={listing.thumbnailUrl || listing.imageUrl}
                                    alt={listing.title}
                                />
                            ) : (
                                <Box sx={{
                                    width: 200,
                                    height: '100%',
                                    backgroundColor: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <img 
                                        src="https://via.placeholder.com/200x180/f3f4f6/9ca3af?text=No+Image" 
                                        alt="Fotoğraf yok" 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }} 
                                    />
                                </Box>
                            )}
                              
                            <CardContent sx={{ 
                                padding: '12px 16px', 
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column',
                                height: '100%',
                                '&:last-child': { paddingBottom: '12px' }
                            }}>
                                {/* 1. SATIR: Tarih (sol) ve Butonlar (sağ) */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    height: '28px',
                                    marginBottom: '8px'
                                }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{
                                            color: '#9ca3af',
                                            fontSize: '12px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '60%'
                                        }}
                                    >
                                        {listing.createdAt ? 
                                            new Date(listing.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 
                                            'Tarih yok'
                                        }
                                    </Typography>
                                      
                                    {/* Butonlar */}
                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Typography
                                            onClick={(e) => handleShareListing(e, listing.id)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                color: '#64748b',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                '&:hover': { 
                                                    textDecoration: 'underline',
                                                    color: '#3b82f6'
                                                }
                                            }}
                                        >
                                            <ShareIcon sx={{ fontSize: 12 }} />
                                            Paylaş
                                        </Typography>
                                        
                                        <Typography
                                            onClick={(e) => handleEditListing(e, listing.id)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                color: '#ed9517',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                '&:hover': { 
                                                    textDecoration: 'underline',
                                                    color: '#f59e0b'
                                                }
                                            }}
                                        >
                                            <EditIcon sx={{ fontSize: 12 }} />
                                            Düzenle
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                {/* 2. SATIR: Başlık */}
                                <Box sx={{ 
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            fontSize: '16px',
                                            letterSpacing: '-0.1px',
                                            lineHeight: 1.3,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            wordBreak: 'break-word',
                                            width: '100%'
                                        }}
                                    >
                                        {listing.title}
                                    </Typography>
                                </Box>
                                
                                {/* 3. SATIR: Adres (sol) ve Fiyat (sağ) */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    height: '24px',
                                    marginBottom: '8px'
                                }}>
                                    <Typography 
                                        variant="body2" 
                                        sx={{
                                            color: '#64748b',
                                            fontSize: '14px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '55%'
                                        }}
                                    >
                                        {listing.district && listing.neighborhood 
                                            ? `${listing.district}, ${listing.neighborhood}`
                                            : listing.district || listing.neighborhood || 'Konum bilgisi yok'
                                        }
                                    </Typography>
                                    
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color: '#ed9517',
                                            fontWeight: 700,
                                            fontSize: '18px',
                                            letterSpacing: '-0.1px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '40%',
                                            textAlign: 'right'
                                        }}
                                    >
                                        {listing.price ? 
                                            `${parseInt(listing.price).toLocaleString('tr-TR')} ₺` : 
                                            'Fiyat yok'
                                        }
                                    </Typography>
                                </Box>

                                {/* 4. SATIR: İstatistikler */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 2,
                                    height: '20px'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <FavoriteIcon sx={{ fontSize: 14, color: '#dc2626' }} />
                                        <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                                            {listing.favoriteCount} favori
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <VisibilityIcon sx={{ fontSize: 14, color: '#3b82f6' }} />
                                        <Typography sx={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                                            {listing.viewCount} görüntülenme
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Sıralama Menu */}
                <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={handleSortClose}
                    PaperProps={{
                        sx: {
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }
                    }}
                >
                    <MenuItem onClick={() => handleSortSelect('date', 'desc')} sx={{ fontSize: '14px' }}>
                        Tarihe Göre (Yeniden Eskiye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('date', 'asc')} sx={{ fontSize: '14px' }}>
                        Tarihe Göre (Eskiden Yeniye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('price', 'desc')} sx={{ fontSize: '14px' }}>
                        Fiyata Göre (Yüksekten Düşüğe)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('price', 'asc')} sx={{ fontSize: '14px' }}>
                        Fiyata Göre (Düşükten Yükseğe)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('views', 'desc')} sx={{ fontSize: '14px' }}>
                        Görüntülenmeye Göre (Yüksek-Düşük)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('views', 'asc')} sx={{ fontSize: '14px' }}>
                        Görüntülenmeye Göre (Düşük-Yüksek)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('favorites', 'desc')} sx={{ fontSize: '14px' }}>
                        Favoriye Göre (Yüksek-Düşük)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('favorites', 'asc')} sx={{ fontSize: '14px' }}>
                        Favoriye Göre (Düşük-Yüksek)
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
// pinned-panel.tsx - Beğeniler sekmesi kaldırılmış hali

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import PushPinIcon from '@mui/icons-material/PushPin';
import HistoryIcon from '@mui/icons-material/History';
import { PinnedListingService } from './services/PinnedListing.ts';
import { RecentListingsService, RecentListingItem } from './services/RecentListingsService.ts';

interface PinnedPanelProps {
    pinnedListings: any[];
    onUnpinListing: (listingId: string) => void;
}

// Export for other components
export const addToRecentListings = (listing: any) => {
    RecentListingsService.addToRecentListings(listing);
};

export default function PinnedPanel({ pinnedListings, onUnpinListing }: PinnedPanelProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'pinned' | 'recent'>('pinned');
    const [recentListings, setRecentListings] = useState<RecentListingItem[]>([]);
    
    // İlk yükleme - recent listings'leri al
    useEffect(() => {
        const recentData = RecentListingsService.getRecentListings();
        setRecentListings(recentData);
    }, []);

    // Recent listings değişikliklerini dinle
    useEffect(() => {
        const cleanup = RecentListingsService.subscribeToRecentListings((updatedListings) => {
            setRecentListings(updatedListings);
        });

        return cleanup;
    }, []);
    
    const getCurrentListings = () => {
        return activeTab === 'pinned' ? pinnedListings : recentListings;
    };

    const currentListings = getCurrentListings();
    
    if (pinnedListings.length === 0 && recentListings.length === 0) {
        return null;
    }

    const handleCardClick = (listing: any) => {
        navigate(`/ilan/${listing.id}`);
        if (activeTab !== 'recent') {
            RecentListingsService.addToRecentListings(listing);
        }
    };

    const handleUnpin = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        if (activeTab === 'pinned') {
            PinnedListingService.unpinListing(listingId);
        }
    };

    const handleRemoveFromRecent = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        RecentListingsService.removeFromRecentListings(listingId);
    };

    const getTabInfo = (tab: 'pinned' | 'recent') => {
        switch (tab) {
            case 'pinned':
                return { 
                    label: 'Sabitlendi', 
                    icon: <PushPinIcon sx={{ fontSize: 14 }} />, 
                    count: pinnedListings.length 
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
                padding: '2px',
                maxHeight: '100%',
                overflowY: 'auto',
            }}
        >
            {/* Tab Butonları */}
            <Box sx={{ 
                display: 'flex', 
                marginBottom: '8px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.9)',
            }}>
                {(['pinned', 'recent'] as const).map((tab) => {
                    const tabInfo = getTabInfo(tab);
                    const isActive = activeTab === tab;
                    
                return (
                <Button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        sx={{
                        flex: 1,
                        fontSize: '10px',
                        fontWeight: 500,
                        color: isActive ? '#1e293b' : '#64748b',
                        backgroundColor: isActive ? 'rgba(30, 41, 59, 0.2)' : 'transparent',
                        minWidth: 0,
                        textTransform: 'none',
                        boxShadow: 'none',
                        border: 'none',
                    }}
                >
                    <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '10px',
                    }}
                    >
                    <Box
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '10px',
                        }}
                    >
                        {tabInfo.icon}
                    </Box>
                    {tabInfo.label}
                    <Box>
                        ({tabInfo.count})
                    </Box>
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
                        {activeTab === 'recent' && 'Henüz görüntülenen ilan yok'}
                    </Typography>
                </Box>
            ) : (
                currentListings.map((listing, index) => (
                    <Box key={`${activeTab}-${listing.id}-${index}`} sx={{ marginBottom: '6px' }}>
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
                              border: '1px solid #1e293b',
                            },
                        }}
                        onClick={() => handleCardClick(listing)}
                        >
                            {/* Close/Unpin butonu */}
                            <IconButton
                                onClick={(e) => activeTab === 'pinned' ? handleUnpin(e, listing.id) : handleRemoveFromRecent(e, listing.id)}
                                sx={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '2px',
                                    width: '20px',
                                    height: '20px',
                                    zIndex: 10,
                                    '&:hover': {
                                        background: '#fee2e2',
                                        color: '#dc2626',
                                    }
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                            
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
                                paddingRight: '6px',
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
                                        marginBottom: '4px',
                                        maxWidth: '100%',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {listing.title}
                                </Typography>

                                {/* Alt bilgiler: Adres ve Fiyat dikey sırada */}
                                <Box sx={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: 'auto',
                                    gap: '2px'
                                }}>
                                    {/* Adres Bilgisi */}
                                    <Typography 
                                        variant="caption" 
                                        sx={{
                                            color: '#9ca3af',
                                            fontSize: '9px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {listing.district && listing.neighborhood 
                                            ? `${listing.neighborhood}, ${listing.district}`
                                            : listing.district || listing.neighborhood || ''
                                        }
                                    </Typography>
                                    
                                    {/* Fiyat */}
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            color: '#ed9517',
                                            fontWeight: 700,
                                            fontSize: '10px',
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
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Skeleton, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';
import { FavoritesService } from './services/FavoritesService.ts';
import { addToRecentListings } from './pinned-panel.tsx';

interface FavoriteListing {
    id: string;
    title: string;
    price: string;
    district: string;
    neighborhood: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    createdAt: string;
}

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<FavoriteListing[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')?.userId || null;
    const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
    const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const loadFavorites = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const favoriteData = await FavoritesService.getFavoriteListings(currentUserId);
                const mappedFavorites: FavoriteListing[] = favoriteData.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    district: item.district ?? '',
                    neighborhood: item.neighborhood ?? '',
                    imageUrl: item.imageUrl,
                    thumbnailUrl: item.thumbnailUrl,
                    createdAt: item.createdAt
                }));
                setFavorites(mappedFavorites);
            } catch (error) {
                console.error('Favoriler yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [currentUserId]);

    useEffect(() => {
        const handleFavoriteChange = async () => {
            const favoriteData = await FavoritesService.getFavoriteListings(currentUserId);
            const mappedFavorites: FavoriteListing[] = favoriteData.map((item: any) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                district: item.district ?? '',
                neighborhood: item.neighborhood ?? '',
                imageUrl: item.imageUrl,
                thumbnailUrl: item.thumbnailUrl,
                createdAt: item.createdAt
            }));
            setFavorites(mappedFavorites);
        };

        window.addEventListener('favoritesChanged', handleFavoriteChange);
        return () => window.removeEventListener('favoritesChanged', handleFavoriteChange);
    }, [currentUserId]);

    const sortedFavorites = useMemo(() => {
        return [...favorites].sort((a, b) => {
            if (sortBy === 'date') {
                const dateA = new Date(a.createdAt || 0).getTime();
                const dateB = new Date(b.createdAt || 0).getTime();
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            } else {
                const priceA = parseInt(a.price) || 0;
                const priceB = parseInt(b.price) || 0;
                return sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
            }
        });
    }, [favorites, sortBy, sortOrder]);

    const handleRemoveFromFavorites = async (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        try {
            await FavoritesService.toggleFavorite(listingId, currentUserId);
            window.dispatchEvent(new Event('favoritesChanged'));
        } catch (error) {
            console.error('Favorilerden çıkarma hatası:', error);
        }
    };

    const handleShareListing = (e: React.MouseEvent, listingId: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/ilan/${listingId}`);
    };

    const handleCardClick = (listing: FavoriteListing) => {
        addToRecentListings(listing);
        navigate(`/ilan/${listing.id}`);
    };

    const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const handleSortSelect = (type: 'date' | 'price', order: 'asc' | 'desc') => {
        setSortBy(type);
        setSortOrder(order);
        setSortAnchorEl(null);
    };

    const getSortText = () => {
        if (sortBy === 'date') {
            return sortOrder === 'desc' ? 'Tarihe Göre ↓' : 'Tarihe Göre ↑';
        } else {
            return sortOrder === 'desc' ? 'Fiyata Göre ↓' : 'Fiyata Göre ↑';
        }
    };

const SkeletonLoadingCards = () => (
    <Box sx={{ 
        minHeight: '100vh', 
        padding: '12px' 
    }}>
        <Box sx={{ maxWidth: '900px', borderRadius: "8px", backgroundColor: 'rgba(30, 41, 59, 0.1)', margin: '0 auto', padding: "12px" }}>
            {/* Header Skeleton */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 1,
                p: 1,
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={120} height={24} />
                </Box>
                <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: '6px' }} />
            </Box>

            {/* Cards Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: '#fff',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        height: '120px'
                    }}>
                        {/* Image Skeleton */}
                        <Skeleton variant="rectangular" width={140} height="100%" />
                        
                        <CardContent sx={{ 
                            padding: '8px 12px', 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            height: '100%',
                            '&:last-child': { paddingBottom: '8px' }
                        }}>
                            {/* First Row: Date and Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton variant="text" width={60} height={14} />
                                <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: '6px' }} />
                            </Box>
                            
                            {/* Second Row: Title */}
                            <Skeleton variant="text" width="80%" height={18} />
                            
                            {/* Third Row: Location and Price */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton variant="text" width="40%" height={16} />
                                <Skeleton variant="text" width="30%" height={18} />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    </Box>
);

    if (loading) {
        return <SkeletonLoadingCards />;
    }

    if (favorites.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px' }}>
                <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Box sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        padding: '24px'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <IconButton onClick={() => navigate('/')} sx={{ color: '#64748b' }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                Favoriler
                            </Typography>
                        </Box>
                        
                        <Box display="flex" justifyContent="center" alignItems="center" height="50vh" flexDirection="column">
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                                Henüz favori ilan yok
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                İlanları beğenmeye başlayın, burada görüntüleyin
                            </Typography>
                            <Button
                                onClick={() => navigate('/')}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ed9517',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: '#d97706'
                                    }
                                }}
                            >
                                İlanları Keşfet
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', padding: '12px' }}>
            <Box sx={{ maxWidth: '900px', borderRadius: "8px", backgroundColor: 'rgba(30, 41, 59, 0.1)', margin: '0 auto', padding: "12px" }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    p: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={() => navigate('/')} sx={{ color: '#64748b' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 500, color: '#1e293b' }}>
                            Favoriler ({favorites.length})
                        </Typography>
                    </Box>

                    <Button
                        onClick={handleSortClick}
                        startIcon={<SortIcon />}
                        sx={{
                            color: '#64748b',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#f8fafc',
                                borderColor: '#cbd5e1'
                            }
                        }}
                    >
                        {getSortText()}
                    </Button>
                </Box>

                {/* Listings */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {sortedFavorites.map((listing) => (
                <Card
                    key={listing.id}
                    onClick={() => handleCardClick(listing)}
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
                        height: '120px',
                        position: 'relative',
                        "&:hover": {
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        },  
                    }}
                >
                    {/* Image */}
                    {listing.thumbnailUrl || listing.imageUrl ? (
                        <CardMedia
                            component="img"
                            sx={{ 
                                width: 140, 
                                height: '100%', 
                                objectFit: 'cover',
                                flexShrink: 0
                            }}
                            image={listing.thumbnailUrl || listing.imageUrl}
                            alt={listing.title}
                        />
                    ) : (
                        <Box sx={{
                            width: 120,
                            height: '100%',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#94a3b8',
                            fontSize: '12px'
                        }}>
                            Fotoğraf Yok
                        </Box>
                    )}

                    {/* Content */}
                    <CardContent sx={{ 
                        padding: '8px 12px',
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%',
                        '&:last-child': { paddingBottom: '8px' }
                    }}>
                        {/* First Row: Date and Actions */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                        }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11px' }}>
                                {listing.createdAt ? 
                                    new Date(listing.createdAt).toLocaleDateString('tr-TR', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    }) : 
                                    'Tarih yok'
                                }
                            </Typography>

                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    onClick={(e) => handleRemoveFromFavorites(e, listing.id)}
                                    size="small"
                                    startIcon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                                    sx={{
                                        minWidth: 'auto',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        borderRadius: '6px',
                                        color: '#dc2626',
                                        fontSize: '10px',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                            color: '#ef4444',
                                            borderColor: '#ef4444'
                                        }
                                    }}
                                >
                                    Favorilerden Çıkar
                                </Button>
                            </Box>
                        </Box>

                        {/* Second Row: Title */}
                        <Typography 
                            variant="subtitle1" 
                            sx={{
                                fontWeight: 600,
                                color: '#1e293b',
                                fontSize: '14px',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {listing.title}
                        </Typography>
                        {/* Third Row: Location and Price */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mt: 'auto'
                        }}>
                            <Typography 
                                variant="body2" 
                                sx={{
                                    color: '#64748b',
                                    fontSize: '12px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '50%'
                                }}
                            >
                                {listing.district && listing.neighborhood 
                                    ? `${listing.district}, ${listing.neighborhood}`
                                    : listing.district || listing.neighborhood || 'Konum bilgisi yok'
                                }
                            </Typography>
                            
                            <Typography 
                                variant="subtitle1" 
                                sx={{
                                    color: '#ed9517',
                                    fontWeight: 700,
                                    fontSize: '14px'
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
                    ))}
                </Box>

                {/* Sort Menu */}
                <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={handleSortClose}
                    PaperProps={{
                        sx: {
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            mt: 1
                        }
                    }}
                >
                    <MenuItem onClick={() => handleSortSelect('date', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                        Tarihe Göre (Yeniden Eskiye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('date', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                        Tarihe Göre (Eskiden Yeniye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('price', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                        Fiyata Göre (Yüksekten Düşüğe)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('price', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                        Fiyata Göre (Düşükten Yükseğe)
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
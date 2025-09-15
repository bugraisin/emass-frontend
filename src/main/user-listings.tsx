import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Skeleton,
    Menu,
    MenuItem,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ListingService } from './services/ListingService.ts';
import { addToRecentListings } from './pinned-panel.tsx';
import { FavoritesService } from './services/FavoritesService.ts';

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
    status: 'PUBLISHED' | 'NON_PUBLISHED';
}

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type: 'delete' | 'publish' | 'unpublish';
    listingTitle: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    type,
    listingTitle
}) => {
    const getDialogConfig = () => {
        switch (type) {
            case 'delete':
                return {
                    title: 'İlanı Sil',
                    icon: <DeleteIcon sx={{ fontSize: 24, color: '#ef4444' }} />,
                    message: 'Bu ilanı kalıcı olarak silmek istediğinizden emin misiniz?',
                    warning: 'Bu işlem geri alınamaz ve ilan kalıcı olarak silinecektir.',
                    confirmText: 'Sil',
                    confirmColor: '#ef4444',
                    confirmBg: '#fef2f2'
                };
            case 'unpublish':
                return {
                    title: 'İlanı Yayından Kaldır',
                    icon: <VisibilityOffIcon sx={{ fontSize: 24, color: '#f59e0b' }} />,
                    message: 'Bu ilanı yayından kaldırmak istediğinizden emin misiniz?',
                    warning: 'İlan artık sitede görünmeyecek ve aramalar sonucunda çıkmayacaktır.',
                    confirmText: 'Yayından Kaldır',
                    confirmColor: '#f59e0b',
                    confirmBg: '#fef3c7'
                };
            case 'publish':
                return {
                    title: 'İlanı Yayınla',
                    icon: <VisibilityIcon sx={{ fontSize: 24, color: '#22c55e' }} />,
                    message: 'Bu ilanı yayınlamak istediğinizden emin misiniz?',
                    warning: 'İlan sitede yayınlanacak ve aramalar sonucunda görünecektir.',
                    confirmText: 'Yayınla',
                    confirmColor: '#22c55e',
                    confirmBg: '#dcfce7'
                };
        }
    };

    const config = getDialogConfig();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {config.icon}
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {config.title}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                <Typography variant="body1" sx={{ color: '#374151', mb: 2 }}>
                    {config.message}
                </Typography>

                <Box sx={{
                    backgroundColor: '#f8fafc',
                    padding: 2,
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    mb: 2
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                        İlan:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {listingTitle}
                    </Typography>
                </Box>

                <Alert
                    severity={type === 'delete' ? 'error' : type === 'unpublish' ? 'warning' : 'info'}
                    sx={{
                        backgroundColor: config.confirmBg,
                        border: `1px solid ${config.confirmColor}20`,
                        '& .MuiAlert-icon': {
                            color: config.confirmColor
                        }
                    }}
                >
                    <Typography variant="body2">
                        {config.warning}
                    </Typography>
                </Alert>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderColor: '#e2e8f0',
                        color: '#64748b',
                        '&:hover': {
                            borderColor: '#cbd5e1',
                            backgroundColor: '#f8fafc'
                        }
                    }}
                >
                    İptal
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: config.confirmColor,
                        '&:hover': {
                            backgroundColor: config.confirmColor,
                            filter: 'brightness(0.9)'
                        }
                    }}
                >
                    {config.confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default function UserListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState<UserListing[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')?.userId || null;
    const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'views' | 'favorites'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Dialog state
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        type: 'delete' | 'publish' | 'unpublish';
        listing: UserListing | null;
    }>({
        open: false,
        type: 'delete',
        listing: null
    });

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
                    status: item.status ?? 'PUBLISHED'
                }));
                setListings(mappedListings);
                if (mappedListings.length > 0) {
                    updateFavoriteCounts(mappedListings);
                }
            } catch (error) {
                console.error('İlanlar yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserListings();
    }, [currentUserId]);

    useEffect(() => {
        const handleFavoritesChanged = () => {
            if (listings.length > 0) {
                updateFavoriteCounts(listings);
            }
        };

        window.addEventListener('favoritesChanged', handleFavoritesChanged);
        return () => {
            window.removeEventListener('favoritesChanged', handleFavoritesChanged);
        };
    }, [listings]);

    const updateFavoriteCounts = async (listingsData: UserListing[]) => {
        try {
            const updatedListings = await Promise.all(
                listingsData.map(async (listing) => {
                    try {
                        const favoriteCount = await FavoritesService.getFavoriteCount(listing.id);
                        return {
                            ...listing,
                            favoriteCount: favoriteCount
                        };
                    } catch (error) {
                        console.error(`Listing ${listing.id} için favori sayısı alınamadı:`, error);
                        return listing;
                    }
                })
            );
            setListings(updatedListings);
        } catch (error) {
            console.error('Favori sayıları güncellenirken hata:', error);
        }
    };

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

    // Dialog handlers
    const handleDeleteListing = (e: React.MouseEvent, listing: UserListing) => {
        e.stopPropagation();
        setDialogState({
            open: true,
            type: 'delete',
            listing
        });
    };

    const handleToggleStatus = (e: React.MouseEvent, listing: UserListing) => {
        e.stopPropagation();
        setDialogState({
            open: true,
            type: listing.status === 'PUBLISHED' ? 'unpublish' : 'publish',
            listing
        });
    };

    const handleDialogClose = () => {
        setDialogState({ open: false, type: 'delete', listing: null });
    };

    const handleDialogConfirm = async () => {
        if (!dialogState.listing) return;

        try {
            if (dialogState.type === 'delete') {
                // Silme API çağrısı
                await ListingService.deleteListing(dialogState.listing.id);
                setListings(prev => prev.filter(item => item.id !== dialogState.listing!.id));
            } else {
                // Durum değiştirme API çağrısı
                await ListingService.toggleListingStatus(dialogState.listing.id);
                setListings(prev => prev.map(item =>
                    item.id === dialogState.listing!.id
                        ? { ...item, status: item.status === 'PUBLISHED' ? 'NON_PUBLISHED' : 'PUBLISHED' }
                        : item
                ));
            }
        } catch (error) {
            console.error('İşlem hatası:', error);
        } finally {
            handleDialogClose();
        }
    };

    const getSortText = () => {
        if (sortBy === 'date') {
            return sortOrder === 'desc' ? 'Tarihe Göre ↓' : 'Tarihe Göre ↑';
        } else if (sortBy === 'price') {
            return sortOrder === 'desc' ? 'Fiyata Göre ↓' : 'Fiyata Göre ↑';
        } else if (sortBy === 'views') {
            return sortOrder === 'desc' ? 'Görüntülenmeye Göre ↓' : 'Görüntülenmeye Göre ↑';
        } else {
            return sortOrder === 'desc' ? 'Favoriye Göre ↓' : 'Favoriye Göre ↑';
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
                            height: '120px',
                            position: 'relative'
                        }}>
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Skeleton variant="text" width={60} height={14} />
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            <Skeleton variant="rectangular" width={30} height={18} sx={{ borderRadius: '4px' }} />
                                            <Skeleton variant="rectangular" width={30} height={18} sx={{ borderRadius: '4px' }} />
                                        </Box>
                                    </Box>
                                    <Skeleton variant="rectangular" width={150} height={24} sx={{ borderRadius: '6px' }} />
                                </Box>

                                <Skeleton variant="text" width="80%" height={18} />

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

    if (listings.length === 0) {
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
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: '#d97706'
                                    }
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
        <>
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
                                İlanlarım ({listings.length})
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
                        {sortedListings.map((listing) => (
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
                                        width: 140,
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                                            {/* Stats Badges */}
                                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.4,
                                                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                                    borderRadius: '4px',
                                                    px: 1,
                                                    py: 0.3
                                                }}>
                                                    <FavoriteIcon sx={{ fontSize: 12, color: '#dc2626' }} />
                                                    <Typography sx={{ fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>
                                                        {listing.favoriteCount}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.4,
                                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                    borderRadius: '4px',
                                                    px: 1,
                                                    py: 0.3
                                                }}>
                                                    <VisibilityIcon sx={{ fontSize: 12, color: '#3b82f6' }} />
                                                    <Typography sx={{ fontSize: '10px', color: '#3b82f6', fontWeight: 600 }}>
                                                        {listing.viewCount}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {/* Status Toggle - Chip Style */}
                                            <Box
                                                onClick={(e) => handleToggleStatus(e, listing)}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    px: 1.5,
                                                    py: 0.5,
                                                    backgroundColor: listing.status === 'PUBLISHED' ? '#dcfce7' : '#f1f5f9',
                                                    color: listing.status === 'PUBLISHED' ? '#166534' : '#475569',
                                                    border: `1px solid ${listing.status === 'PUBLISHED' ? '#bbf7d0' : '#cbd5e1'}`,
                                                    borderRadius: '12px',
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: listing.status === 'PUBLISHED' ? '#bbf7d0' : '#e2e8f0',
                                                        transform: 'scale(1.02)'
                                                    }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor: listing.status === 'PUBLISHED' ? '#22c55e' : '#64748b'
                                                    }}
                                                />
                                                {listing.status === 'PUBLISHED' ? 'Yayında' : 'Yayında Değil'}
                                            </Box>

                                            {/* Actions Group - With Text */}
                                            <Box sx={{
                                                display: 'flex',
                                                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                overflow: 'hidden'
                                            }}>
                                                <Button
                                                    onClick={(e) => handleEditListing(e, listing.id)}
                                                    size="small"
                                                    startIcon={<EditIcon sx={{ fontSize: 12 }} />}
                                                    sx={{
                                                        borderRadius: 0,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        minWidth: 'auto',
                                                        color: '#64748b',
                                                        fontSize: '10px',
                                                        fontWeight: 500,
                                                        textTransform: 'none',
                                                        borderRight: '1px solid #e2e8f0',
                                                        '&:hover': {
                                                            backgroundColor: '#f1f5f9',
                                                            color: '#3b82f6'
                                                        }
                                                    }}
                                                >
                                                    Düzenle
                                                </Button>

                                                <Button
                                                    onClick={(e) => handleDeleteListing(e, listing)}
                                                    size="small"
                                                    startIcon={<DeleteIcon sx={{ fontSize: 12 }} />}
                                                    sx={{
                                                        borderRadius: 0,
                                                        px: 1.5,
                                                        py: 0.5,
                                                        minWidth: 'auto',
                                                        color: '#64748b',
                                                        fontSize: '10px',
                                                        fontWeight: 500,
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#fef2f2',
                                                            color: '#ef4444'
                                                        }
                                                    }}
                                                >
                                                    Sil
                                                </Button>
                                            </Box>
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
                                            WebkitLineClamp: 1,
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
                        <MenuItem onClick={() => handleSortSelect('views', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                            Görüntülenmeye Göre (Yüksek-Düşük)
                        </MenuItem>
                        <MenuItem onClick={() => handleSortSelect('views', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                            Görüntülenmeye Göre (Düşük-Yüksek)
                        </MenuItem>
                        <MenuItem onClick={() => handleSortSelect('favorites', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                            Favoriye Göre (Yüksek-Düşük)
                        </MenuItem>
                        <MenuItem onClick={() => handleSortSelect('favorites', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                            Favoriye Göre (Düşük-Yüksek)
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={dialogState.open}
                onClose={handleDialogClose}
                onConfirm={handleDialogConfirm}
                type={dialogState.type}
                listingTitle={dialogState.listing?.title || ''}
            />
        </>
    );
}
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid, CardMedia, IconButton, Pagination, Skeleton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import PushPinIcon from '@mui/icons-material/PushPin';
import { addToRecentListings } from './pinned-panel.tsx';
import { PinnedListingService } from "./services/PinnedListing.ts";

interface MainPanelProps {
    searchResults?: any[];
    isLoading?: boolean;
    onPinListing?: (listing: any) => void;
    onUnpinListing?: (listingId: string) => void;
    pinnedListings?: any[];
}

export default function MainPanel({ searchResults = [], isLoading = false, pinnedListings = [] }: MainPanelProps) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    const sortedResults = useMemo(() => {
        return [...searchResults].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
        });
    }, [searchResults]);


    // Skeleton loading animasyonu
    const SkeletonLoadingCards = () => (
        <Box 
            display="flex" 
            flexDirection="column" 
            height="100%" 
            sx={{ padding: '8px' }}
        >
            <Grid container spacing={1} sx={{ alignContent: 'flex-start' }}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                background: '#fff',
                                borderRadius: '6px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                height: '120px'
                            }}
                        >
                            <Skeleton 
                                variant="rectangular" 
                                width={130} 
                                height="100%" 
                                animation="wave"
                                sx={{ 
                                    flexShrink: 0,
                                    backgroundColor: '#d1d5db',
                                    border: '1px solid #e5e7eb'
                                }}
                            />
                            
                            <CardContent sx={{ 
                                padding: '8px 12px', 
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                height: '100%',
                                '&:last-child': { paddingBottom: '8px' }
                            }}>
                                <Skeleton 
                                    variant="text" 
                                    width="75%" 
                                    height={20} 
                                    animation="wave"
                                    sx={{ 
                                        backgroundColor: '#e5e7eb',
                                        marginBottom: '4px'
                                    }}
                                />
                                
                                <Skeleton 
                                    variant="text" 
                                    width="60%" 
                                    height={16} 
                                    animation="wave" 
                                    sx={{ 
                                        backgroundColor: '#f3f4f6',
                                        marginBottom: '8px'
                                    }} 
                                />
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginTop: 'auto'
                                }}>
                                    <Skeleton 
                                        variant="text" 
                                        width="35%" 
                                        height={14} 
                                        animation="wave" 
                                        sx={{ 
                                            backgroundColor: '#f3f4f6'
                                        }} 
                                    />
                                    
                                    <Skeleton 
                                        variant="text" 
                                        width="45%" 
                                        height={18} 
                                        animation="wave" 
                                        sx={{ 
                                            backgroundColor: '#e5e7eb'
                                        }} 
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    if (isLoading) {
        
        return <SkeletonLoadingCards />;
    }

    if (sortedResults.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
                <Typography variant="h6" color="textSecondary">
                    İlan bulunamadı
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Farklı arama kriterleri deneyebilirsiniz
                </Typography>
            </Box>
        );
    }

    const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = sortedResults.slice(startIndex, endIndex);

    const handleCardClick = (property: any) => {
        addToRecentListings(property);
        navigate(`/ilan/${property.id}`);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handlePinToggle = (e: React.MouseEvent, property: any) => {
        e.stopPropagation();
        PinnedListingService.togglePinListing(property);
    };

    const isListingPinned = (propertyId: string): boolean => {
        return pinnedListings.some(p => String(p.id) === String(propertyId));
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            height="100%" 
            sx={{
                padding: '8px',
            }}
        >
            <Grid container spacing={1} sx={{ alignContent: 'flex-start' }}>
                {currentProperties.map((property, index) => (
                    <Grid item xs={12} sm={6} key={`${property.id}-${index}`}>
                        <Card
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
                                transition: 'box-shadow 0.15s ease',
                                position: 'relative',
                                "&:hover": {
                                    border: '1px solid #1e293b',
                                },
                            }}
                            onClick={() => handleCardClick(property)}
                        >
                        {property.thumbnailUrl || property.imageUrl || property.image ? (
                            <CardMedia
                                component="img"
                                sx={{ 
                                    width: 130, 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    flexShrink: 0
                                }}
                                image={property.thumbnailUrl || property.imageUrl || property.image}
                                alt={property.title}
                            />
                        ) : (
                            <Box sx={{
                                width: 130,
                                height: '100%',
                                backgroundColor: '#f3f4f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <img 
                                    src="https://via.placeholder.com/130x120/f3f4f6/9ca3af?text=No+Image" 
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
                                padding: '6px 8px', 
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column',
                                height: '100%',
                                '&:last-child': { paddingBottom: '6px' }
                            }}>
                                {/* 1. SATIR: Tarih (sol) ve Butonlar (sağ) */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    height: '24px',
                                    marginBottom: '4px'
                                }}>
                                    {/* Tarih */}
                                    <Typography 
                                        variant="caption" 
                                        sx={{
                                            color: '#9ca3af',
                                            fontSize: '10px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '60%'
                                        }}
                                    >
                                        {property.createdAt ? 
                                            new Date(property.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 
                                            'Tarih yok'
                                        }
                                    </Typography>
                                      
                                    {/* Butonlar */}
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        {/* Pin butonu */}
                                        <IconButton
                                            onClick={(e) => handlePinToggle(e, property)}
                                            sx={{
                                                width: 18,
                                                height: 18,
                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                color: isListingPinned(property.id) ? '#ed9517' : '#64748b',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,1)',
                                                    color: '#ed9517'
                                                }
                                            }}
                                        >
                                            <PushPinIcon sx={{ fontSize: 10 }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                                
                                {/* 2. SATIR: Başlık */}
                                <Box sx={{ 
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    marginBottom: '4px'
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            fontSize: '12px',
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
                                        {property.title}
                                    </Typography>
                                </Box>
                                
                                {/* 3. SATIR: Adres (sol) ve Fiyat (sağ) */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    height: '20px'
                                }}>
                                    {/* Adres */}
                                    <Typography 
                                        variant="body2" 
                                        sx={{
                                            color: '#64748b',
                                            fontSize: '10px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '55%'
                                        }}
                                    >
                                        {property.district && property.neighborhood 
                                            ? `${property.district}, ${property.neighborhood}`
                                            : property.district || property.neighborhood || 'Konum bilgisi yok'
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
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '40%',
                                            textAlign: 'right'
                                        }}
                                    >
                                        {property.price ? 
                                            `${parseInt(property.price).toLocaleString('tr-TR')} ₺` : 
                                            'Fiyat yok'
                                        }
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '20px',
                paddingBottom: '16px'
            }}>
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange}
                    color="primary"
                    size="medium"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#64748b',
                            '&:hover': {
                                backgroundColor: 'rgba(237, 149, 23, 0.1)',
                                color: '#ed9517'
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#ed9517',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#d97706'
                                }
                            }
                        }
                    }}
                />
            </Box>
        </Box>
    );
}
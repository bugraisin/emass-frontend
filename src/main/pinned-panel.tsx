import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

interface PinnedPanelProps {
    pinnedListings: any[];
    onUnpinListing: (listingId: string) => void;
}

export default function PinnedPanel({ pinnedListings, onUnpinListing }: PinnedPanelProps) {
    if (pinnedListings.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                width: '350px',
                background: '#fce4c391',
                boxShadow: '0 8px 25px rgba(148, 163, 184, 0.15)',
                padding: '6px',
                maxHeight: '100%',
                overflowY: 'auto',
                position: 'sticky',
            }}
        >
            <Typography variant="h6" sx={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#64748b',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
            }}>
                📌 Sabitlenmiş İlanlar ({pinnedListings.length})
            </Typography>
            
            {pinnedListings.map((listing) => (
                <Box key={listing.id} sx={{ marginBottom: '8px' }}>
                    <Card sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        height: '110px',
                        position: 'relative',
                        cursor: 'pointer',
                        "&:hover": {
                          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                        },
                    }}>
                        {/* Unpin butonu */}
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onUnpinListing(listing.id);
                            }}
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
                        
                        {/* Resim */}
                        {listing.thumbnailUrl || listing.imageUrl || listing.image ? (
                            <CardMedia
                                component="img"
                                sx={{ 
                                    width: 100, 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    flexShrink: 0
                                }}
                                image={listing.thumbnailUrl || listing.imageUrl || listing.image}
                                alt={listing.title}
                            />
                        ) : (
                            <Box sx={{
                                width: 100,
                                height: '100%',
                                backgroundColor: '#f3f4f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <ImageIcon sx={{ fontSize: 32, color: '#9ca3af' }} />
                            </Box>
                        )}
                        
                        {/* İçerik */}
                        <CardContent sx={{ 
                            padding: '6px 8px', 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            height: '100%',
                            '&:last-child': { paddingBottom: '6px' }
                        }}>
                            {/* Başlık */}
                            <Typography 
                                variant="h6" 
                                sx={{
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    fontSize: '13px',
                                    letterSpacing: '-0.1px',
                                    lineHeight: 1.3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    marginBottom: '3px'
                                }}
                            >
                                {listing.title}
                            </Typography>
                            
                            {/* İlçe ve Mahalle */}
                            <Typography 
                                variant="body2" 
                                sx={{
                                    color: '#64748b',
                                    fontSize: '11px',
                                    lineHeight: 1.3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '4px'
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
                                {/* Eklenme Tarihi */}
                                <Typography 
                                    variant="caption" 
                                    sx={{
                                        color: '#9ca3af',
                                        fontSize: '9px',
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
                                
                                {/* Fiyat */}
                                <Typography 
                                    variant="h6" 
                                    sx={{
                                        color: '#ed9517',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        letterSpacing: '-0.1px',
                                    }}
                                >
                                    {listing.price ? 
                                        `${parseInt(listing.price).toLocaleString('tr-TR')} TL` : 
                                        'Fiyat belirtilmemiş'
                                    }
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}

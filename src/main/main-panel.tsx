import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid, CardMedia, IconButton, Pagination, Skeleton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import PushPinIcon from '@mui/icons-material/PushPin';

interface MainPanelProps {
    searchResults?: any[];
    isLoading?: boolean;
    onPinListing?: (listing: any) => void;
    pinnedListings?: any[];
}

export default function MainPanel({ searchResults = [], isLoading = false, onPinListing, pinnedListings = [] }: MainPanelProps) {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

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
                            {/* Resim skeleton */}
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
                            
                            {/* İçerik skeleton */}
                            <CardContent sx={{ 
                                padding: '8px 12px', 
                                flex: 1, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                height: '100%',
                                '&:last-child': { paddingBottom: '8px' }
                            }}>
                                {/* Başlık skeleton */}
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
                                
                                {/* İlçe-Mahalle skeleton */}
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
                                
                                {/* Alt satır: Tarih sol, Fiyat sağ skeleton */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginTop: 'auto'
                                }}>
                                    {/* Tarih skeleton */}
                                    <Skeleton 
                                        variant="text" 
                                        width="35%" 
                                        height={14} 
                                        animation="wave" 
                                        sx={{ 
                                            backgroundColor: '#f3f4f6'
                                        }} 
                                    />
                                    
                                    {/* Fiyat skeleton */}
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

    if (searchResults.length === 0) {
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

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = searchResults.slice(startIndex, endIndex);

    const handleCardClick = (property: any) => {
        navigate(`/ilan/${property.id}`);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
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
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => handleCardClick(property)}
            >
              {/* Pin butonu */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onPinListing?.(property);
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                  width: 28,
                  height: 28,
                  zIndex: 2,
                  opacity: pinnedListings.some(p => p.id === property.id) ? 1 : 0.7,
                  color: pinnedListings.some(p => p.id === property.id) ? '#ed9517' : '#64748b',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.95)',
                    color: '#ed9517',
                    opacity: 1,
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <PushPinIcon sx={{ fontSize: 16 }} />
              </IconButton>
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
                    <ImageIcon sx={{ fontSize: 40, color: '#9ca3af' }} />
                </Box>
            )}
              <CardContent sx={{ 
                padding: '8px 12px', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                height: '100%',
                '&:last-child': { paddingBottom: '8px' }
              }}>
                {/* Başlık */}
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '14px',
                    letterSpacing: '-0.1px',
                    lineHeight: 1.3,
                    wordWrap: 'break-word',
                    marginBottom: '4px'
                  }}
                >
                  {property.title}
                </Typography>
                
                {/* İlçe ve Mahalle */}
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#64748b',
                    fontSize: '12px',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px'
                  }}
                >
                  {property.district && property.neighborhood 
                    ? `${property.district}, ${property.neighborhood}`
                    : property.district || property.neighborhood || 'Konum bilgisi yok'
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
                      fontSize: '11px',
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
                  
                  {/* Fiyat */}
                  <Typography 
                    variant="h6" 
                    sx={{
                      color: '#ed9517',
                      fontWeight: 700,
                      fontSize: '14px',
                      letterSpacing: '-0.1px',
                    }}
                  >
                    {property.price ? 
                      `${parseInt(property.price).toLocaleString('tr-TR')} TL` : 
                      'Fiyat belirtilmemiş'
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
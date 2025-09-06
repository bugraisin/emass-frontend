import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CardMedia, Dialog, DialogActions, DialogContent, Button, IconButton, Pagination, Skeleton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';

interface MainPanelProps {
    searchResults?: any[];
    isLoading?: boolean;
}

export default function MainPanel({ searchResults = [], isLoading = false }: MainPanelProps) {

    const [open, setOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    // Arama loading animasyonu
    const SearchLoadingAnimation = () => (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100%" 
            flexDirection="column"
            sx={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(237, 149, 23, 0.1), transparent)',
                    animation: 'shimmer 2s infinite'
                }
            }}
        >
            <style>
                {`
                    @keyframes shimmer {
                        0% { left: -100%; }
                        100% { left: 100%; }
                    }
                    @keyframes searchPulse {
                        0%, 100% { 
                            transform: scale(1) rotate(0deg);
                            opacity: 0.8;
                        }
                        50% { 
                            transform: scale(1.1) rotate(180deg);
                            opacity: 1;
                        }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes dots {
                        0%, 20% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes ripple {
                        0% {
                            transform: scale(0);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `}
            </style>
            
            {/* Ana loading container */}
            <Box sx={{
                position: 'relative',
                marginBottom: '32px',
                animation: 'float 3s ease-in-out infinite'
            }}>
                {/* Ripple efektleri */}
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        border: '2px solid rgba(237, 149, 23, 0.3)',
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        animation: 'ripple 2s linear infinite'
                    },
                    '&::after': {
                        animationDelay: '1s'
                    }
                }} />
                
                {/* Dış halka */}
                <Box sx={{
                    width: '120px',
                    height: '120px',
                    border: '3px solid rgba(237, 149, 23, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'spin 3s linear infinite',
                    background: 'linear-gradient(45deg, rgba(237, 149, 23, 0.1), rgba(237, 149, 23, 0.05))'
                }}>
                    {/* İç loading spinner */}
                    <CircularProgress 
                        size={80} 
                        thickness={3}
                        sx={{
                            color: '#ed9517',
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }}
                    />
                    
                    {/* Merkez ikon */}
                    <Box sx={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <SearchIcon sx={{ 
                            fontSize: 32, 
                            color: '#ed9517',
                            animation: 'searchPulse 2s ease-in-out infinite'
                        }} />
                    </Box>
                </Box>
            </Box>
            
            {/* Ana metin */}
            <Typography 
                variant="h5" 
                sx={{
                    color: '#1e293b',
                    fontWeight: 700,
                    marginBottom: '8px',
                    animation: 'float 3s ease-in-out infinite 0.5s',
                    textAlign: 'center'
                }}
            >
                İlanlar Aranıyor
            </Typography>
            
            {/* Alt metin animasyonlu noktalarla */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography 
                    variant="body1" 
                    sx={{
                        color: '#64748b',
                        fontSize: '16px'
                    }}
                >
                    Lütfen bekleyin
                </Typography>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                    {[0, 1, 2].map((index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: '#ed9517',
                                borderRadius: '50%',
                                animation: `dots 1.5s infinite ${index * 0.5}s`
                            }}
                        />
                    ))}
                </Box>
            </Box>
            
            {/* Skeleton preview kartları */}
            <Box sx={{ 
                marginTop: '48px',
                width: '100%',
                maxWidth: '800px',
                padding: '0 20px'
            }}>
                <Grid container spacing={2}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    background: '#fff',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    overflow: 'hidden',
                                    height: '100px',
                                    opacity: 0.7,
                                    animation: `float 3s ease-in-out infinite ${index * 0.2}s`
                                }}
                            >
                                <Skeleton 
                                    variant="rectangular" 
                                    width={100} 
                                    height="100%" 
                                    animation="wave"
                                    sx={{ 
                                        flexShrink: 0,
                                        backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                    }}
                                />
                                <CardContent sx={{ 
                                    padding: '12px', 
                                    flex: 1, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    '&:last-child': { paddingBottom: '12px' }
                                }}>
                                    <Skeleton 
                                        variant="text" 
                                        width="70%" 
                                        height={16} 
                                        animation="wave"
                                        sx={{ backgroundColor: 'rgba(237, 149, 23, 0.1)' }}
                                    />
                                    <Skeleton 
                                        variant="text" 
                                        width="50%" 
                                        height={14} 
                                        animation="wave" 
                                        sx={{ 
                                            marginTop: '4px',
                                            backgroundColor: 'rgba(237, 149, 23, 0.08)'
                                        }} 
                                    />
                                    <Skeleton 
                                        variant="text" 
                                        width="40%" 
                                        height={16} 
                                        animation="wave" 
                                        sx={{ 
                                            marginTop: '8px',
                                            backgroundColor: 'rgba(237, 149, 23, 0.15)'
                                        }} 
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );

    if (isLoading) {
        return (
            <Box 
                display="flex" 
                flexDirection="column" 
                height="100%" 
                sx={{ padding: '8px' }}
            >
                <SearchLoadingAnimation />
            </Box>
        );
    }

    if (searchResults.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
                <Typography variant="h6" color="textSecondary">
                    Henüz arama yapılmadı
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Sol panelden kriterleri seçip "Ara" butonuna basın
                </Typography>
            </Box>
        );
    }

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = searchResults.slice(startIndex, endIndex);

    const handleCardClick = (property: any) => {
        setSelectedProperty(property);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                height: '120px',
                transition: 'all 0.3s ease',
                "&:hover": {
                  boxShadow: '0 2px 8px rgba(30,41,59,0.15)',
                  borderColor: '#1e293b',
                  transform: 'translateY(-2px)'
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
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '14px',
                    letterSpacing: '-0.1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '2px'
                  }}
                >
                  {property.title}
                </Typography>
                
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
                  {property.description}
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{
                    color: '#ed9517',
                    fontWeight: 700,
                    fontSize: '14px',
                    letterSpacing: '-0.1px',
                  }}
                >
                  {property.price}
                </Typography>
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
              fontWeight: 600,
              fontSize: '14px',
              color: '#64748b',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(237, 149, 23, 0.1)',
                color: '#ed9517',
                transform: 'scale(1.05)'
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

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: '0 32px 80px rgba(0, 0, 0, 0.15), 0 16px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden'
          }
        }}
      >
      <DialogContent sx={{ padding: '32px' }}>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            position: "absolute", 
            top: 20, 
            right: 20,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="flex-start" gap={4}>
          <Box sx={{ flex: 1 }}>
        <img 
          src={selectedProperty?.thumbnailUrl || selectedProperty?.imageUrl || selectedProperty?.image} 
          alt="Property" 
          style={{ 
            width: "100%", 
            height: "auto", 
            borderRadius: '8px',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)'
          }} 
        />
          </Box>
          <Box sx={{ flex: 1, paddingLeft: '24px' }}>
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: '16px',
                fontSize: '32px',
                letterSpacing: '-0.5px'
              }}
            >
              {selectedProperty?.title}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: '#64748b',
                marginBottom: '24px',
                fontSize: '16px',
                lineHeight: 1.6
              }}
            >
              {selectedProperty?.description}
            </Typography>
            <Box sx={{
              padding: '20px',
              background: 'linear-gradient(135deg, #fef3cd 0%, #fde68a 100%)',
              borderRadius: '8px',
              border: '2px solid rgba(237, 149, 23, 0.2)'
            }}>
              <Typography 
                variant="h5" 
                sx={{
                  background: 'linear-gradient(135deg, #ed9517 0%, #f59e0b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  fontSize: '24px',
                  letterSpacing: '-0.3px'
                }}
              >
                {selectedProperty?.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    </Box>
  );
}
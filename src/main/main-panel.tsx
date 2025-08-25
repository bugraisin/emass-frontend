import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CardMedia, Dialog, DialogActions, DialogContent, Button, IconButton, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const properties = [
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
  { id: 1, title: "Ev 1", description: "Güzel bir daire.", price: "2.500.000 TL", image: "ev.jpeg" },
  { id: 2, title: "Ev 2", description: "Geniş bahçeli bir villa.", price: "5.000.000 TL", image: "ev.jpeg" },
  { id: 3, title: "Ev 3", description: "Şehir merkezinde modern bir rezidans.", price: "3.750.000 TL", image: "ev.jpeg" },
  { id: 4, title: "Ev 4", description: "Deniz manzaralı lüks bir daire.", price: "7.200.000 TL", image: "ev.jpeg" },
];

export default function MainPanel() {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Sayfa başına 12 ilan

  // Pagination hesaplaması
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

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
      height="100vh" 
      sx={{
        padding: '12px',
      }}
    >
      <Grid container spacing={1} sx={{ flex: 1 }}>
        {currentProperties.map((property, index) => (
          <Grid item xs={12} sm={6} key={`${property.id}-${index}`}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: '10px',
                cursor: "pointer",
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 16px rgba(0, 0, 0, 0.04)',
                backdropFilter: 'blur(20px)',
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: 'relative',
                overflow: 'hidden',
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #ed9517, #f59e0b, #ed9517)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }
              }}
              onClick={() => handleCardClick(property)}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: 160, 
                  height: 120, 
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                }}
                image={property.image}
                alt={property.title}
              />
              <Box sx={{ flex: 1, paddingLeft: '20px' }}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '8px',
                    fontSize: '18px',
                    letterSpacing: '-0.3px'
                  }}
                >
                  {property.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#64748b',
                    marginBottom: '12px',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}
                >
                  {property.description}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    background: 'linear-gradient(135deg, #ed9517 0%, #f59e0b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                    fontSize: '16px',
                    letterSpacing: '-0.2px'
                  }}
                >
                  {property.price}
                </Typography>
              </Box>
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

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
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
              src={selectedProperty?.image} 
              alt="Property" 
              style={{ 
                width: "100%", 
                height: "auto", 
                borderRadius: '20px',
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
              borderRadius: '16px',
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

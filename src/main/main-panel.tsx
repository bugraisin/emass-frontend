import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CardMedia, Dialog, DialogActions, DialogContent, Button, IconButton, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const properties = [
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1" },
];

export default function MainPanel() {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =162 // Sayfa başına 12 ilan

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
      height="100%" 
      sx={{
        padding: '12px',
      }}
    >
      {/* Kategori başlığı barı */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: '#f8fafc',
        borderBottom: '1px solid #e5e7eb',
        padding: '8px 32px',
        fontWeight: 700,
        color: '#1e293b',
        fontSize: '15px',
        letterSpacing: '-0.1px',
        marginBottom: '8px',
      }}>
        <Box sx={{ width: 140 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0, flex: 1, paddingLeft: '32px' }}>
          <Box sx={{ flex: 1, textAlign: 'left' }}>İlan Başlığı</Box>
          <Box sx={{ flex: 1, textAlign: 'left' }}>Oda Sayısı</Box>
          <Box sx={{ flex: 1, textAlign: 'left' }}>Metrekare</Box>
          <Box sx={{ flex: 1, textAlign: 'left' }}>Fiyat</Box>
        </Box>
      </Box>
      <Grid container spacing={1} sx={{ flex: 1, alignItems: 'flex-start' }}>
        {currentProperties.map((property, index) => (
          <Grid item xs={12} key={`${property.id}-${index}`}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: '8px',
                cursor: "pointer",
                background: '#fff',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
                "&:hover": {
                  boxShadow: '0 4px 16px rgba(30,41,59,0.08)',
                  borderColor: '#1e293b',
                },
              }}
              onClick={() => handleCardClick(property)}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: 140, 
                  height: 100, 
                  borderRadius: '4px',
                  objectFit: 'cover',
                  boxShadow: 'none'
                }}
                image={property.image}
                alt={property.title}
              />
              <Box sx={{ flex: 1, paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                      fontSize: '16px',
                      flex: 1,
                      letterSpacing: '-0.2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {property.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#64748b',
                      fontWeight: 500,
                      fontSize: '14px',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {property.rooms}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#334155',
                      fontWeight: 500,
                      fontSize: '14px',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {property.area}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{
                      color: '#ed9517',
                      fontWeight: 700,
                      fontSize: '15px',
                      flex: 1,
                      letterSpacing: '-0.1px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign: 'right',
                    }}
                  >
                    {property.price}
                  </Typography>
                </Box>
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
              src={selectedProperty?.image} 
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

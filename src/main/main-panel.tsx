import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CardMedia, Dialog, DialogActions, DialogContent, Button, IconButton, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const properties = [
  { id: 1, title: "Ev 1", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Merkezi konumda, modern yaşam alanı" },
  { id: 2, title: "Ev 2", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Geniş bahçeli, lüks villa tipi konut" },
  { id: 3, title: "Ev 3", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Yeni yapım, asansörlü binada daire" },
  { id: 4, title: "Ev 4", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Deniz manzaralı, ferah ve aydınlık" },
  { id: 5, title: "Ev 5", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Metro yakını, ulaşım avantajlı" },
  { id: 6, title: "Ev 6", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Kapalı otopark ve güvenlik sistemi" },
  { id: 7, title: "Ev 7", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Şehir merkezinde, alışveriş merkezi yakını" },
  { id: 8, title: "Ev 8", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Sosyal tesisli kompleks içinde" },
  { id: 9, title: "Ev 9", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Yenilenen mutfak ve banyo" },
  { id: 10, title: "Ev 10", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Geniş balkonlu, park manzaralı" },
  { id: 11, title: "Ev 11", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Işıklı ve temiz, hazır yaşanacak" },
  { id: 12, title: "Ev 12", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Prestijli semtte, güvenlikli site" },
  { id: 13, title: "Ev 13", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Okul ve hastane yakını konumda" },
  { id: 14, title: "Ev 14", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Çocuk parkı ve oyun alanı bulunan" },
  { id: 15, title: "Ev 15", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Yatırım için ideal konum" },
  { id: 16, title: "Ev 16", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Panoramik şehir manzarası" },
  { id: 17, title: "Ev 17", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Sessiz sokakta huzurlu yaşam" },
  { id: 18, title: "Ev 18", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Geniş teras ve barbekü alanı" },
  { id: 19, title: "Ev 19", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Genç çiftler için ideal" },
  { id: 20, title: "Ev 20", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Lüks yapı malzemeleri kullanılmış" },
  { id: 21, title: "Ev 21", price: "2.500.000 TL", image: "ev.jpeg", area: "120 m²", rooms: "3+1", description: "Ailelere uygun güvenli mahalle" },
  { id: 22, title: "Ev 22", price: "5.000.000 TL", image: "ev.jpeg", area: "350 m²", rooms: "6+2", description: "Spor salonu ve yüzme havuzu" },
  { id: 23, title: "Ev 23", price: "3.750.000 TL", image: "ev.jpeg", area: "90 m²", rooms: "2+1", description: "Cafe ve restoranlar çevresinde" },
  { id: 24, title: "Ev 24", price: "7.200.000 TL", image: "ev.jpeg", area: "180 m²", rooms: "4+1", description: "Özel tasarım mimarisi ile" },
];

export default function MainPanel() {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Sayfa başına 12 ilan

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
        padding: '8px',
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
                cursor: "pointer",
                background: '#fff',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                height: '120px',
                "&:hover": {
                  boxShadow: '0 2px 8px rgba(30,41,59,0.15)',
                  borderColor: '#1e293b',
                },
              }}
              onClick={() => handleCardClick(property)}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: 130, 
                  height: '100%', 
                  objectFit: 'cover',
                  flexShrink: 0
                }}
                image={property.image}
                alt={property.title}
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

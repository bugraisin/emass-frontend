import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, CardMedia, Dialog, DialogActions, DialogContent, Button } from "@mui/material";

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
];

export default function MainPanel() {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handleCardClick = (property: any) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" padding={2}>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} key={property.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: 8,
                },
              }}
              onClick={() => handleCardClick(property)}
            >
              <CardMedia
                component="img"
                sx={{ width: 150, height: 100, borderRadius: 1 }}
                image={property.image}
                alt={property.title}
              />
              <Box sx={{ flex: 1, paddingLeft: 2 }}>
                <Typography variant="h6">{property.title}</Typography>
                <Typography variant="body2" color="text.secondary">{property.description}</Typography>
                <Typography variant="h6" color="primary" marginTop={1}>{property.price}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <Box sx={{ flex: 1, paddingRight: 2 }}>
              <img src={selectedProperty?.image} alt="Property" style={{ width: "100%", height: "auto" }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>{selectedProperty?.title}</Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>{selectedProperty?.description}</Typography>
              <Typography variant="h6" color="primary">{selectedProperty?.price}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

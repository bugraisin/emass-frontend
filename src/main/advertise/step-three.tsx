import React from "react";
import { Box, Typography } from "@mui/material";

interface StepThreeProps {
  onCoordinatesSelect: (lat: number, lng: number) => void;
  il: string;
  ilce: string;
  mahalle: string;
}

export default function StepThree({ onCoordinatesSelect, il, ilce, mahalle }: StepThreeProps) {
  return (
    <Box sx={{ 
      height: "60vh", 
      width: "100%", 
      borderRadius: "16px",
      backgroundColor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed #ccc"
    }}>
      <Typography variant="h6" color="textSecondary">
        Harita Bileşeni (Geliştirme Aşamasında)
      </Typography>
    </Box>
  );
}

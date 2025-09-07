import React from "react";
import { Box, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

interface LocationPanelProps {
  latitude: number | null;
  longitude: number | null;
  city: string;
  district: string;
  neighborhood: string;
}

export default function LocationPanel({ latitude, longitude, city, district, neighborhood }: LocationPanelProps) {
  return (
    <Box sx={{
      height: 400,
      border: "1px solid #e2e8f0",
      borderRadius: 1,
      backgroundColor: "#f8fafc",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {latitude && longitude ? (
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: 4 }}
        />
      ) : (
        <Box sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#64748b'
        }}>
          <LocationOn sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
          <Typography sx={{ fontSize: '12px', mt: 0.5, opacity: 0.7 }}>
            Konum bilgisi mevcut değil
          </Typography>
        </Box>
      )}
    </Box>
  );
}
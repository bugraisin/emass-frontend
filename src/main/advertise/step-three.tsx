import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import cities from '../../data/city-centers.json';

interface StepThreeProps {
  onCoordinatesSelect: (lat: number, lng: number) => void;
  il: string;
}

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
  borderRadius: "16px",
};

export default function StepThree({ onCoordinatesSelect, il }: StepThreeProps) {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [defaultCenter, setDefaultCenter] = useState<{ lat: number; lng: number }>({ lat: 39.92077, lng: 32.85411 });

  // Google Maps API yüklemesi
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAkRZWBQ7fwn76-3jbf2P2LOrehP2GQhX8", // Kendi API anahtarınızı ekleyin
  });

  useEffect(() => {
    // JSON içinden il ismine göre koordinat bul
    const foundCity = cities.find((city) => city.il.toLowerCase() === il.toLowerCase());
    
    if (foundCity) {
      setDefaultCenter({ lat: foundCity.lat, lng: foundCity.lng });
    }
  }, [il]);

  // Harita tıklandığında marker ekleme
  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });
      onCoordinatesSelect(lat, lng);
    }
  }, [onCoordinatesSelect]);

  if (loadError) return <div>Harita yüklenemedi</div>;
  if (!isLoaded) return <div>Harita yükleniyor...</div>;

  return (
    <Box sx={{ borderRadius: "16px", width: "100%" }}>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={defaultCenter} 
        zoom={12} 
        onClick={onMapClick} // Haritaya tıklayınca çalışır
      >
        {/* Kullanıcının seçtiği marker */}
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </Box>
  );
}

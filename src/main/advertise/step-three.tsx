import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { GoogleMap, useLoadScript, Marker, Polygon } from "@react-google-maps/api";

interface StepThreeProps {
  onCoordinatesSelect: (lat: number, lng: number) => void;
  il: string;
  ilce: string;
  mahalle: string;
}

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
  borderRadius: "16px",
};

export default function StepThree({ onCoordinatesSelect, il, ilce, mahalle }: StepThreeProps) {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [defaultCenter, setDefaultCenter] = useState<{ lat: number; lng: number }>({ lat: 39.92077, lng: 32.85411 });
  const [zoom, setZoom] = useState<number>(14);
  const [polygonPaths, setPolygonPaths] = useState<Array<{ lat: number; lng: number }>>([]);

  // Google Maps API yüklemesi
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAkRZWBQ7fwn76-3jbf2P2LOrehP2GQhX8",
  });

  useEffect(() => {
    if (isLoaded && il && ilce && mahalle) {
      const address = `${mahalle}, ${ilce}, ${il}, Türkiye`;
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          setDefaultCenter({ lat: location.lat(), lng: location.lng() });
          setZoom(15); // Mahalle seviyesinde zoom yap

          // Polygon verisini al (Bu veriyi bir API'den veya JSON dosyasından almalısın)
          fetch(`/data/polygons/${il}/${ilce}/${mahalle}.json`)
            .then((res) => res.json())
            .then((data) => {
              if (data.coordinates) {
                const paths = data.coordinates.map(([lng, lat]: [number, number]) => ({
                  lat,
                  lng,
                }));
                setPolygonPaths(paths);
              }
            })
            .catch((err) => console.error("Polygon verisi alınamadı:", err));
        } else {
          console.error("Adres bulunamadı veya geocoding başarısız oldu.");
        }
      });
    }
  }, [isLoaded, il, ilce, mahalle]);

  // Harita tıklandığında marker ekleme
  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedPosition({ lat, lng });
        onCoordinatesSelect(lat, lng);
      }
    },
    [onCoordinatesSelect]
  );

  if (loadError) return <div>Harita yüklenemedi</div>;
  if (!isLoaded) return <div>Harita yükleniyor...</div>;

  return (
    <Box sx={{ borderRadius: "16px", width: "100%" }}>
      <GoogleMap key={`${defaultCenter.lat}-${defaultCenter.lng}`} mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={zoom} onClick={onMapClick}>
        {selectedPosition && <Marker position={selectedPosition} />}

        {/* Mahalle sınırlarını çiz */}
        {polygonPaths.length > 0 && (
          <Polygon
            paths={polygonPaths}
            options={{
              fillColor: "#2196F3",
              fillOpacity: 0.3,
              strokeColor: "#1976D2",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

// CSS stilleri için gerekli
import "leaflet/dist/leaflet.css";

export default function StepThree() {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

    const MapClick = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
        });
        return null;
    };

    return (
        <Box sx={{ height: '60vh', width: '100%', borderRadius: "16px", border: '2px solid #ed9517' }}>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "60vh", width: "100%", borderRadius: "16px" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClick />
                {selectedPosition && (
                    <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
                        <Popup>
                            Seçilen Nokta: {selectedPosition.lat.toFixed(4)}, {selectedPosition.lng.toFixed(4)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </Box>
    );
}

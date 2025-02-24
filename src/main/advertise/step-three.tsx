import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface StepThreeProps {
    onCoordinatesSelect: (lat: number, lng: number) => void;
}

export default function StepThree({ onCoordinatesSelect }: StepThreeProps) {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

    const MapClick = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
                onCoordinatesSelect(e.latlng.lat, e.latlng.lng);
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
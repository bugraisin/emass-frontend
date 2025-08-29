import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Alert,
    Chip
} from '@mui/material';
import {
    LocationOn,
    MyLocation,
    Clear
} from '@mui/icons-material';

declare global {
    interface Window {
        initMap: () => void;
    }
}

interface StepFiveProps {
    latitude: number | null;
    longitude: number | null;
    setLatitude: (lat: number | null) => void;
    setLongitude: (lng: number | null) => void;
    addressText: string;
    setAddressText: (address: string) => void;
}

export default function StepFive({ 
    latitude, 
    longitude, 
    setLatitude, 
    setLongitude,
    addressText,
    setAddressText
}: StepFiveProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);

    // Varsayılan başlangıç konumu (Türkiye merkezi - Ankara yakını)
    const defaultCenter = { lat: 39.9334, lng: 32.8597 };

    // Reverse geocoding - koordinatlardan adres bulma
    const reverseGeocode = useCallback((lat: number, lng: number) => {
        if (geocoderRef.current) {
            geocoderRef.current.geocode(
                { location: { lat, lng } },
                (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        setAddressText(results[0].formatted_address);
                    }
                }
            );
        }
    }, [setAddressText]);

    // Marker oluştur/güncelle fonksiyonu
    const updateMarker = useCallback((lat: number, lng: number, mapInstance: google.maps.Map) => {
        // Mevcut marker'ı temizle
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }

        // Yeni marker oluştur
        const newMarker = new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
            draggable: true,
            title: 'İlan Konumu'
        });

        // Drag eventi ekle
        newMarker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
            const newLat = event.latLng?.lat();
            const newLng = event.latLng?.lng();
            if (newLat && newLng) {
                setLatitude(newLat);
                setLongitude(newLng);
                reverseGeocode(newLat, newLng);
            }
        });

        markerRef.current = newMarker;
    }, [setLatitude, setLongitude, reverseGeocode]);

    // Google Maps yükleme kontrolü
    useEffect(() => {
        const initializeMap = () => {
            if (!mapRef.current) return;

            // Harita her zaman varsayılan konumda başlasın
            const center = latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

            const mapInstance = new google.maps.Map(mapRef.current, {
                zoom: latitude && longitude ? 16 : 6, // Türkiye tamamı için zoom 6
                center: center,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                gestureHandling: 'greedy',
                scrollwheel: true,
                disableDoubleClickZoom: false,
            });

            const geocoderInstance = new google.maps.Geocoder();
            geocoderRef.current = geocoderInstance;

            // Başlangıç marker'ı (sadece latitude ve longitude varsa)
            if (latitude && longitude) {
                updateMarker(latitude, longitude, mapInstance);
            }

            // Harita tıklama eventi
            mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
                const lat = event.latLng?.lat();
                const lng = event.latLng?.lng();
                
                if (lat && lng) {
                    setLatitude(lat);
                    setLongitude(lng);
                    updateMarker(lat, lng, mapInstance);
                    reverseGeocode(lat, lng);
                }
            });

            setMap(mapInstance);
            setIsLoading(false);
        };

        // Google Maps API yüklü mü kontrol et
        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            // Google Maps API'yi yükle
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpadBabY_4rFGLLG_wNe4iQwpVIoxV4MI&callback=initMap`;
            script.async = true;
            script.defer = true;
            
            window.initMap = initializeMap;
            document.head.appendChild(script);
        }
    }, [latitude, longitude, updateMarker, reverseGeocode, setLatitude, setLongitude]);

    // Mevcut konumu al
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    setLatitude(lat);
                    setLongitude(lng);
                    
                    if (map) {
                        map.setCenter({ lat, lng });
                        map.setZoom(16);
                        updateMarker(lat, lng, map);
                        reverseGeocode(lat, lng);
                    }
                },
                (error) => {
                    console.error('Konum alınamadı:', error);
                    alert('Mevcut konumunuz alınamadı. Lütfen manuel olarak konumu seçin.');
                }
            );
        }
    };

    // Konumu temizle
    const clearLocation = () => {
        setLatitude(null);
        setLongitude(null);
        setAddressText('');
        
        if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
        }
        
        if (map) {
            map.setCenter(defaultCenter);
            map.setZoom(6); // Türkiye tamamı zoom seviyesi
        }
    };

    return (
        <Box sx={{ 
            width: "100%", 
            padding: 2,
            maxHeight: 'none',
            overflowY: 'visible',
        }}>
            <Card sx={{ 
                borderRadius: 2,
                boxShadow: 2,
                border: '1px solid rgba(0, 0, 0, 0.12)',
                mb: 3
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#1e293b',
                        fontSize: '16px',
                        mb: 2
                    }}>
                        Konum Seçimi
                    </Typography>

                    <Typography variant="body2" sx={{ 
                        color: '#64748b',
                        fontSize: '14px',
                        mb: 3
                    }}>
                        İlanınızın tam konumunu harita üzerinde işaretleyin. Haritaya tıklayarak konum seçebilirsiniz.
                    </Typography>

                    {/* Harita */}
                    <Box sx={{ 
                        height: '600px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '2px solid #e5e7eb',
                        position: 'relative',
                        mb: 3
                    }}>
                        {isLoading && (
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f8fafc',
                                zIndex: 1
                            }}>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    Harita yükleniyor...
                                </Typography>
                            </Box>
                        )}
                        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
                    </Box>

                    {/* Konumum butonu - Harita altında */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 3 
                    }}>
                        <Button
                            variant="contained"
                            onClick={getCurrentLocation}
                            startIcon={<MyLocation />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                backgroundColor: '#475569',
                                fontSize: '16px',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#334155'
                                }
                            }}
                        >
                            Mevcut Konumumu Kullan
                        </Button>
                    </Box>

                    {/* Durum mesajları */}
                    {latitude && longitude ? (
                        <Alert severity="success" sx={{ mb: 3, fontSize: '14px' }}>
                            Konum başarıyla seçildi. Marker'ı sürükleyerek konumu hassas ayarlayabilirsiniz.
                        </Alert>
                    ) : (
                        <Alert severity="info" sx={{ mb: 3, fontSize: '14px' }}>
                            Lütfen harita üzerinde bir konum seçin. Haritaya tıklayabilir veya mevcut konumunuzu kullanabilirsiniz.
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Alert,
} from '@mui/material';
import {
    MyLocation,
} from '@mui/icons-material';

// Add global declaration for Leaflet
declare global {
    interface Window {
        L: any;
    }
}

interface StepFiveProps {
    latitude: number | null;
    longitude: number | null;
    setLatitude: (lat: number | null) => void;
    setLongitude: (lng: number | null) => void;
}

export default function StepFive({ 
    latitude, 
    longitude, 
    setLatitude, 
    setLongitude,
}: StepFiveProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [leafletLoaded, setLeafletLoaded] = useState(false);
    const [mapInitialized, setMapInitialized] = useState(false);

    // Varsayılan başlangıç konumu (Türkiye merkezi - Ankara)
    const defaultCenter = [39.9334, 32.8597];

    // Marker ekleme fonksiyonu
    const addMarker = useCallback((lat: number, lng: number) => {
        if (!mapInstanceRef.current) return;

        // Eski marker'ı kaldır
        if (markerRef.current) {
            mapInstanceRef.current.removeLayer(markerRef.current);
        }

        // Yeni marker ekle
        const newMarker = window.L.marker([lat, lng], {
            draggable: true
        }).addTo(mapInstanceRef.current);

        // Drag eventi ekle
        newMarker.on('dragend', (dragEvent: any) => {
            const newLatLng = dragEvent.target.getLatLng();
            setLatitude(newLatLng.lat);
            setLongitude(newLatLng.lng);
        });

        markerRef.current = newMarker;
    }, [setLatitude, setLongitude]);

    // Leaflet kütüphanesini yükle
    useEffect(() => {
        const loadLeaflet = () => {
            // Eğer zaten yüklüyse, tekrar yükleme
            if (window.L) {
                setLeafletLoaded(true);
                return;
            }

            // CSS yükle
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
            link.crossOrigin = '';
            document.head.appendChild(link);

            // JS yükle
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            script.crossOrigin = '';
            script.onload = () => {
                // Leaflet yüklendikten sonra kısa bir gecikme
                setTimeout(() => {
                    setLeafletLoaded(true);
                }, 100);
            };
            script.onerror = () => {
                console.error('Leaflet yüklenemedi');
                setIsLoading(false);
            };
            document.head.appendChild(script);
        };

        loadLeaflet();
    }, []);

    // Harita başlat
    useEffect(() => {
        if (!leafletLoaded || !mapRef.current || mapInitialized) return;

        const center = latitude && longitude ? [latitude, longitude] : defaultCenter;
        const zoom = latitude && longitude ? 16 : 6;

        try {
            // Harita oluştur
            const mapInstance = window.L.map(mapRef.current, {
                zoomControl: true,
                scrollWheelZoom: true,
                doubleClickZoom: true,
                dragging: true
            }).setView(center, zoom);

            // OpenStreetMap tile layer ekle
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(mapInstance);

            // Başlangıç marker'ı (sadece koordinat varsa)
            if (latitude && longitude) {
                addMarker(latitude, longitude);
            }

            // Harita tıklama eventi
            mapInstance.on('click', (e: any) => {
                const { lat, lng } = e.latlng;
                
                setLatitude(lat);
                setLongitude(lng);
                addMarker(lat, lng);
            });

            // Harita hazır olduğunda
            mapInstance.whenReady(() => {
                setIsLoading(false);
                // Harita boyutlarını yeniden hesapla
                setTimeout(() => {
                    mapInstance.invalidateSize();
                }, 100);
            });

            mapInstanceRef.current = mapInstance;
            setMapInitialized(true);

        } catch (error) {
            console.error('Harita başlatma hatası:', error);
            setIsLoading(false);
        }

        // Cleanup fonksiyonu
        return () => {
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch (error) {
                    console.error('Harita temizleme hatası:', error);
                }
                mapInstanceRef.current = null;
            }
            setMapInitialized(false);
        };
    }, [leafletLoaded, addMarker, setLatitude, setLongitude]);

    // Koordinat değişikliklerini izle ve haritayı güncelle
    useEffect(() => {
        if (!mapInstanceRef.current || !mapInitialized) return;

        if (latitude && longitude) {
            // Harita görünümünü güncelle
            mapInstanceRef.current.setView([latitude, longitude], mapInstanceRef.current.getZoom());
            
            // Marker'ı güncelle
            if (!markerRef.current) {
                addMarker(latitude, longitude);
            }
        }
    }, [latitude, longitude, mapInitialized, addMarker]);

    // Mevcut konumu al
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Tarayıcınız konum servislerini desteklemiyor.');
            return;
        }

        setIsLoading(true);
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                setLatitude(lat);
                setLongitude(lng);
                
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([lat, lng], 16);
                    addMarker(lat, lng);
                }
                
                setIsLoading(false);
            },
            (error) => {
                console.error('Konum alınamadı:', error);
                let errorMessage = 'Mevcut konumunuz alınamadı.';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += ' Konum erişim izni verilmedi.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += ' Konum bilgisi mevcut değil.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += ' Konum alma işlemi zaman aşımına uğradı.';
                        break;
                }
                
                alert(errorMessage + ' Lütfen manuel olarak konumu seçin.');
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    };

    // Konumu temizle
    const clearLocation = () => {
        setLatitude(null);
        setLongitude(null);
        
        if (markerRef.current && mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
        }
        
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView(defaultCenter, 6);
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
                        mb: 1
                    }}>
                        Konum Seçimi
                    </Typography>

                    {/* Harita */}
                    <Box sx={{ 
                        height: '600px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '2px solid #e5e7eb',
                        position: 'relative',
                        mb: 1
                    }}>
                        {(isLoading || !leafletLoaded || !mapInitialized) && (
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
                                zIndex: 1000
                            }}>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    {!leafletLoaded ? 'Harita kütüphanesi yükleniyor...' : 'Harita başlatılıyor...'}
                                </Typography>
                            </Box>
                        )}
                        
                        {/* Mevcut Konumum Butonu - Harita üzerinde */}
                        <Button
                        variant="contained"
                        onClick={getCurrentLocation}
                        disabled={isLoading || !mapInitialized}
                        startIcon={<MyLocation />}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 1000,
                            borderRadius: 2,
                            backgroundColor: '#475569',
                            color: 'white',
                            fontSize: '12px',
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                                backgroundColor: '#334155',
                                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                        >
                        Konumumu Bul
                        </Button>

                        <div 
                            ref={mapRef} 
                            style={{ 
                                width: '100%', 
                                height: '100%',
                                minHeight: '600px'
                            }} 
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ListingDetailHouse from './listing-details/listing-detail-house.tsx';
import PinnedPanel from './pinned-panel.tsx';

// Import detail components

interface ListingData {
  id: string;
  listingType: string;
  propertyType: string;
  subtype: string;
  title: string;
  description: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
  photos: any[];
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export default function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<ListingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pinnedListings, setPinnedListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        setError('İlan ID bulunamadı');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/listings/${id}`);
        
        if (!response.ok) {
          throw new Error('İlan yüklenirken hata oluştu');
        }
        
        const backendData = await response.json();
        
        // Backend data'sını frontend formatına çevir
        const mappedListing: ListingData = {
          id: backendData.id.toString(),
          listingType: backendData.listingType, // SALE olarak bırak
          propertyType: backendData.propertyType, // KONUT olarak bırak
          subtype: backendData.housingDetails?.subtype || backendData.commercialDetails?.subtype || '',
          title: backendData.title,
          description: backendData.description,
          price: backendData.price.toString(),
          city: backendData.city,
          district: backendData.district,
          neighborhood: backendData.neighborhood,
          details: backendData.housingDetails || backendData.commercialDetails || backendData.officeDetails || backendData.industrialDetails || backendData.serviceDetails || backendData.landDetails || {},
          photos: backendData.photoUrls ? backendData.photoUrls.map((photo: any) => ({
            id: photo.id.toString(),
            url: photo.imageUrl,
            isMain: photo.seqNumber === 1
          })) : [],
          latitude: backendData.latitude,
          longitude: backendData.longitude,
          createdAt: backendData.createdAt
        };
        
        setListing(mappedListing);
      } catch (error) {
        console.error('İlan detayları yüklenirken hata:', error);
        setError('İlan detayları yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Pinned listings'i localStorage'dan yükle
  useEffect(() => {
    const savedPinnedListings = localStorage.getItem('pinnedListings');
    if (savedPinnedListings) {
      try {
        const parsedListings = JSON.parse(savedPinnedListings);
        setPinnedListings(parsedListings);
      } catch (error) {
        console.error('Pinned listings localStorage hatası:', error);
        localStorage.removeItem('pinnedListings');
      }
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePinListing = (listingToPin: any) => {
    const updatedPinnedListings = pinnedListings.find(p => p.id === listingToPin.id) 
      ? pinnedListings // Zaten pinlenmiş, değişiklik yapma
      : [...pinnedListings, listingToPin]; // Yeni pin ekle
      
    setPinnedListings(updatedPinnedListings);
    localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
  };

  const handleUnpinListing = (listingId: string) => {
    const updatedPinnedListings = pinnedListings.filter(p => p.id !== listingId);
    setPinnedListings(updatedPinnedListings);
    localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
  };

  const renderListingDetail = () => {
    if (!listing) return null;

    switch (listing.propertyType) {
      case 'KONUT':
        return (
          <ListingDetailHouse 
            listing={listing}
            pinnedListings={pinnedListings}
            onUnpinListing={handleUnpinListing}
            onPinListing={handlePinListing}
          />
        );
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Bu emlak tipi için detay görünümü yakında eklenecek
              </Typography>
              <Typography variant="body2">
                Şu anda sadece konut ilanları için detaylı görünüm mevcuttur. 
                Diğer emlak tipleri ({listing.propertyType}) için detay sayfaları yakında eklenecektir.
              </Typography>
            </Alert>
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography color="textSecondary">İlan yükleniyor...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        flexDirection="column"
        gap={2}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
        </Alert>
        <IconButton onClick={handleBack} sx={{ mt: 2 }}>
          <ArrowBack />
          <Typography sx={{ ml: 1 }}>Geri Dön</Typography>
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      {/* Ana İçerik */}
      <Box sx={{ 
        width: '100%', 
        maxWidth: '1200px', 
        position: 'relative',
      }}>
        {renderListingDetail()}
      </Box>
      
      {/* Sağ Panel - Pinned Listings */}
      <PinnedPanel 
        pinnedListings={pinnedListings}
        onUnpinListing={handleUnpinListing}
      />
    </Box>
  );
}
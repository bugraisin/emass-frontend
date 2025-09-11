// listing-details.tsx - TEK YER PIN YÖNETİMİ

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PinnedPanel from './pinned-panel.tsx';
import ListingDetailHouse from './listing-details/listing-detail-house.tsx';
import ListingDetailCommercial from './listing-details/listing-detail-commercial.tsx';
import ListingDetailIndustrial from './listing-details/listing-detail-industrial.tsx';
import ListingDetailOffice from './listing-details/listing-detail-office.tsx';
import ListingDetailLand from './listing-details/listing-detail-land.tsx';
import ListingDetailService from './listing-details/listing-detail-service.tsx';
import { PinnedListingService } from './services/PinnedListing.ts';
import { ListingService } from './services/ListingService.ts';
import { FavoritesService } from './services/FavoritesService.ts';


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
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentUserId] = useState<number>(1);

  // İlan detaylarını yükle
  useEffect(() => {
    const loadListingDetails = async () => {
      if (!id) {
        setError('İlan ID bulunamadı');
        setLoading(false);
        return;
      }

      try {
        const listingData = await ListingService.getListingById(id);
        setListing(listingData);
      } catch (error: any) {
        setError(error.message || 'İlan detayları yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadListingDetails();
  }, [id]);

  // Favori durumunu kontrol et
  useEffect(() => {
    const loadFavoriteInfo = async () => {
      if (!listing?.id) return;
      
      try {
        const isFavorited = await FavoritesService.checkFavoriteStatus(listing.id, currentUserId);
        setIsFavorited(isFavorited);
      } catch (error) {
        console.error("Favori bilgileri yüklenemedi:", error);
      }
    };

    loadFavoriteInfo();
  }, [listing?.id, currentUserId]);

  // Pinned listings yükle
  useEffect(() => {
    const initialPinnedListings = PinnedListingService.getPinnedListings();
    setPinnedListings(initialPinnedListings);

    const cleanup = PinnedListingService.subscribeToPinnedListings((updatedListings) => {
      setPinnedListings(updatedListings);
    });

    return cleanup;
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = async () => {
    if (!listing) return;

    try {
      const newStatus = await FavoritesService.toggleFavorite(listing.id, currentUserId);
      
      setIsFavorited(newStatus);
      
      window.dispatchEvent(new Event('favoritesChanged'));
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
    }
  };

  const handlePinToggle = () => {
    if (!listing) return;
    
    try {
      PinnedListingService.togglePinListing(listing);
    } catch (error) {
      console.error('Pin işlemi hatası:', error);
    }
  };

  const handleUnpinListing = (listingId: string) => {
    try {
      PinnedListingService.unpinListing(listingId);
    } catch (error) {
      console.error('Unpin işlemi hatası:', error);
    }
  };

  const renderListingDetail = () => {
    if (!listing) return null;
    const isPinned = PinnedListingService.isListingPinned(listing.id);
    
    const commonProps = {
      listing,
      isPinned,
      onPinToggle: handlePinToggle,
      isFavorited,
      onFavoriteToggle: handleFavoriteToggle
    };


    switch (listing.propertyType) {
      case 'KONUT':
        return <ListingDetailHouse {...commonProps} />;
      case 'TICARI':
        return <ListingDetailCommercial {...commonProps} />;
      case 'ENDUSTRIYEL':
        return <ListingDetailIndustrial {...commonProps} />;
      case 'OFIS':
        return <ListingDetailOffice {...commonProps} />;
      case 'HIZMET':
        return <ListingDetailService {...commonProps} />;
      case 'ARSA':
        return <ListingDetailLand {...commonProps} />;
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Bu emlak tipi için detay görünümü yakında eklenecek
              </Typography>
            </Alert>
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column" gap={2}>
        <CircularProgress size={40} />
        <Typography color="textSecondary">İlan yükleniyor...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" flexDirection="column" gap={2}>
        <Alert severity="error" sx={{ maxWidth: 400 }}>{error}</Alert>
        <IconButton onClick={handleBack} sx={{ mt: 2 }}>
          <ArrowBack />
          <Typography sx={{ ml: 1 }}>Geri Dön</Typography>
        </IconButton>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start">
      <Box display="flex" flexDirection="column" width="100%" maxWidth="1440px" 
           sx={{ border: '1px solid rgba(148, 163, 184, 0.5)' }}>
        <Box display="flex" flex="1" sx={{ minHeight: 'calc(100vh - 40px)' }}>
          
          <Box flex="1" sx={{ 
            background: 'rgba(148, 163, 184, 0.1)', 
            overflow: "auto", 
            display: "flex", 
            justifyContent: "center" 
          }}>
            <Box sx={{ 
              width: "100%", 
              maxWidth: "1200px", 
              fontFamily: "sans-serif", 
              p: 1, 
              backgroundColor: 'white', 
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
            }}>
              {renderListingDetail()}
            </Box>
          </Box>

          <Box width="20%">
            <PinnedPanel 
              pinnedListings={pinnedListings}
              onUnpinListing={handleUnpinListing}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
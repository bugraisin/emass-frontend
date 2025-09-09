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
import ListingDetailService from './listing-details/listing-detail-service.tsx';
import ListingDetailLand from './listing-details/listing-detail-land.tsx';

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
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [currentUserId] = useState<number>(1);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if(!listing?.id) return;
      
      try {
        const favoriteResponse = await fetch(
          `http://localhost:8080/api/favorites/${listing.id}/check?userId=${currentUserId}`
        );
        if (favoriteResponse.ok) {
          const isFav = await favoriteResponse.json();
          setIsFavorited(isFav);
        }

        const countResponse = await fetch(
          `http://localhost:8080/api/favorites/count/${listing.id}`
        );

        if(countResponse.ok) {
          const count = await countResponse.json();
          setFavoriteCount(count);
        }
      } catch(error) {
        console.error("Favorite durumu kontrol edilirken hata", error);
      }
    };

    checkFavoriteStatus();
  }, [listing?.id, currentUserId]);

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
        
        const mappedListing: ListingData = {
          id: backendData.id.toString(),
          listingType: backendData.listingType,
          propertyType: backendData.propertyType,
          subtype: backendData.details?.subtype || '',
          title: backendData.title,
          description: backendData.description,
          price: backendData.price.toString(),
          city: backendData.city,
          district: backendData.district,
          neighborhood: backendData.neighborhood,
          details: backendData.details || {},
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

  // localStorage'dan pinned listings'i yükle
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pinnedListings');
      setPinnedListings(saved ? JSON.parse(saved) : []);
    } catch {
      setPinnedListings([]);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = async () => {
    if (!listing) return;

    try {
      if (isFavorited) {
        // Favoriden çıkar
        const response = await fetch(
          `http://localhost:8080/api/favorites/${listing.id}`,
          { 
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUserId })
          }
        );

        if (response.ok) {
          setIsFavorited(false);
          setFavoriteCount(prev => prev - 1);
          window.dispatchEvent(new Event('favoritesChanged'));
        }
      } else {
        // Favoriye ekle
        const response = await fetch(
          `http://localhost:8080/api/favorites/${listing.id}`,
          { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUserId })
          }
        );

        if (response.ok) {
          setIsFavorited(true);
          setFavoriteCount(prev => prev + 1);
          window.dispatchEvent(new Event('favoritesChanged'));
        }
      }
    } catch (error) {
      console.error("Favori işlemi hatası:", error);
    }
  };


  const handlePinToggle = () => {
    if (!listing) return;
    
    try {
      const current = JSON.parse(localStorage.getItem('pinnedListings') || '[]');
      const isAlreadyPinned = current.some((item: any) => String(item.id) === String(listing.id));
      
      let updated;
      if (isAlreadyPinned) {
        // Unpin
        updated = current.filter((item: any) => String(item.id) !== String(listing.id));
      } else {
        // Pin
        const pinnedItem = {
          id: String(listing.id),
          title: listing.title,
          price: listing.price,
          district: listing.district,
          neighborhood: listing.neighborhood,
          thumbnailUrl: listing.photos?.[0]?.url || '',
          createdAt: listing.createdAt
        };
        updated = [...current, pinnedItem];
      }
      
      localStorage.setItem('pinnedListings', JSON.stringify(updated));
      setPinnedListings(updated);
      window.dispatchEvent(new Event('pinnedListingsChanged'));
    } catch (error) {
      console.error('Pin işlemi hatası:', error);
    }
  };

  const handleUnpinListing = (listingId: string) => {
    try {
      const updated = pinnedListings.filter(p => String(p.id) !== String(listingId));
      localStorage.setItem('pinnedListings', JSON.stringify(updated));
      setPinnedListings(updated);
      window.dispatchEvent(new Event('pinnedListingsChanged'));
    } catch (error) {
      console.error('Unpin işlemi hatası:', error);
    }
  };

  const renderListingDetail = () => {
    if (!listing) return null;

    // PIN DURUMUNU HESAPLA
    const isPinned = pinnedListings.some(p => String(p.id) === String(listing.id));
    
    const commonProps = {
      listing,
      isPinned,
      onPinToggle: handlePinToggle,
      isFavorited,
      onFavoriteToggle: handleFavoriteToggle,
      favoriteCount
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
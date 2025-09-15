// listing-details.tsx - Refactored version
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, IconButton, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import PinnedPanel from '../pinned-panel.tsx';
import ListingDetailHouse from './details/listing-detail-house.tsx';
import ListingDetailCommercial from './details/listing-detail-commercial.tsx';
import ListingDetailIndustrial from './details/listing-detail-industrial.tsx';
import ListingDetailOffice from './details/listing-detail-office.tsx';
import ListingDetailLand from './details/listing-detail-land.tsx';
import ListingDetailService from './details/listing-detail-service.tsx';
import ListingDetailsSkeleton from './ListingDetailsSkeleton.tsx';
import HeaderWithActions from './shared/HeaderWithActions.tsx';
import PhotoGallery from './shared/PhotoGallery.tsx';
import DescriptionBox from './shared/DescriptionBox.tsx';
import TabbedPanel from './shared/TabbedPanel.tsx';
import { PinnedListingService } from '../services/PinnedListing.ts';
import { ListingService } from '../services/ListingService.ts';
import { FavoritesService } from '../services/FavoritesService.ts';
import { getUserId } from '../util.ts';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUserId = getUserId();

  // İlan detaylarını yükle
  useEffect(() => {
    const loadListingDetails = async () => {
      if (!id) {
        setError('İlan ID bulunamadı');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setListing(null);

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
        const isFavorited = await FavoritesService.isFavorited(listing.id, currentUserId);
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

  // listing-details.tsx içinde
  const handleFavoriteToggle = async () => {
    if (!listing) return;
  
    const newStatus = await FavoritesService.toggleFavorite(listing.id, currentUserId);
    setIsFavorited(newStatus);
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

  // Property-specific panel render eden fonksiyon
  const renderPropertyPanel = () => {
    if (!listing) return null;
    
    switch (listing.propertyType) {
      case 'KONUT':
        return <ListingDetailHouse listing={listing} />;
      case 'TICARI':
        return <ListingDetailCommercial listing={listing} />;
      case 'ENDUSTRIYEL':
        return <ListingDetailIndustrial listing={listing} />;
      case 'OFIS':
        return <ListingDetailOffice listing={listing} />;
      case 'HIZMET':
        return <ListingDetailService listing={listing} />;
      case 'ARSA':
        return <ListingDetailLand listing={listing} />;
      default:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Bu emlak tipi için özellikler paneli yakında eklenecek
            </Typography>
          </Box>
        );
    }
  };

  // Feature categories render eden fonksiyon
  const getFeatureCategories = () => {
    switch (listing?.propertyType) {
      case 'KONUT':
        return [
          {
            title: 'Temel Özellikler',
            features: [
              { key: 'furnished', label: 'Eşyalı' },
              { key: 'balcony', label: 'Balkon' },
              { key: 'terrace', label: 'Teras' },
              { key: 'garden', label: 'Bahçe' },
              { key: 'withinSite', label: 'Site İçerisinde' },
            ]
          },
          {
            title: 'Otopark',
            features: [
              { key: 'openPark', label: 'Açık Otopark' },
              { key: 'closedPark', label: 'Kapalı Otopark' },
              { key: 'garagePark', label: 'Garaj' },
            ]
          },
          {
            title: 'Bina & Güvenlik',
            features: [
              { key: 'elevator', label: 'Asansör' },
              { key: 'security', label: 'Güvenlik' },
              { key: 'concierge', label: 'Kapıcı' },
              { key: 'generator', label: 'Jeneratör' },
            ]
          },
          {
            title: 'Konfor & Isıtma',
            features: [
              { key: 'airConditioning', label: 'Klima' },
              { key: 'floorHeating', label: 'Yerden Isıtma' },
              { key: 'fireplace', label: 'Şömine' },
            ]
          },
          {
            title: 'Mutfak & İç Mekan',
            features: [
              { key: 'builtinKitchen', label: 'Ankastre Mutfak' },
              { key: 'separateKitchen', label: 'Ayrı Mutfak' },
              { key: 'americanKitchen', label: 'Amerikan Mutfak' },
              { key: 'laundryRoom', label: 'Çamaşır Odası' },
            ]
          },
          {
            title: 'Site İmkanları',
            features: [
              { key: 'pool', label: 'Havuz' },
              { key: 'gym', label: 'Spor Salonu' },
              { key: 'childrenPlayground', label: 'Çocuk Oyun Alanı' },
              { key: 'sportsArea', label: 'Spor Alanları' },
            ]
          }
        ];
      case 'TICARI':
        return [
          {
            title: 'Temel Özellikler',
            features: [
              { key: 'furnished', label: 'Eşyalı' },
              { key: 'parking', label: 'Otopark' },
              { key: 'security', label: 'Güvenlik' },
              { key: 'elevator', label: 'Asansör' },
              { key: 'generator', label: 'Jeneratör' },
            ]
          },
          {
            title: 'Konfor & Sistem',
            features: [
              { key: 'airConditioning', label: 'Klima' },
              { key: 'internet', label: 'İnternet' },
              { key: 'kitchen', label: 'Mutfak' },
              { key: 'toilet', label: 'Tuvalet' },
            ]
          },
          {
            title: 'Ticari Özel Alanlar',
            features: [
              { key: 'showcase', label: 'Vitrin' },
              { key: 'warehouse', label: 'Depo Alanı' },
              { key: 'loadingDock', label: 'Yükleme Rampası' },
              { key: 'cashRegister', label: 'Kasa Alanı' },
            ]
          },
          {
            title: 'Müşteri Alanları',
            features: [
              { key: 'outdoorSeating', label: 'Dış Mekan Oturma' },
              { key: 'waitingArea', label: 'Bekleme Alanı' },
              { key: 'changingRoom', label: 'Soyunma Odası' },
            ]
          }
        ];
      case 'ENDUSTRIYEL':
        return [
          {
            title: 'Altyapı & Enerji',
            features: [
              { key: 'threephaseElectricity', label: 'Üç Fazlı Elektrik' },
              { key: 'naturalGasLine', label: 'Doğalgaz Hattı' },
              { key: 'steamLine', label: 'Buhar Hattı' },
              { key: 'waterSystem', label: 'Su Sistemi' },
              { key: 'wasteWaterSystem', label: 'Atık Su Sistemi' },
            ]
          },
          {
            title: 'Üretim & İmalat',
            features: [
              { key: 'craneSystem', label: 'Vinç Sistemi' },
              { key: 'ventilationSystem', label: 'Havalandırma Sistemi' },
              { key: 'airConditioning', label: 'Klima Sistemi' },
              { key: 'wideOpenArea', label: 'Geniş Açık Alan' },
              { key: 'machineMountingSuitable', label: 'Makine Montajı Uygun' },
            ]
          },
          {
            title: 'Depolama & Lojistik',
            features: [
              { key: 'loadingRamp', label: 'Yükleme Rampası' },
              { key: 'truckEntrance', label: 'TIR Girişi' },
              { key: 'forkliftTraffic', label: 'Forklift Trafiği' },
              { key: 'rackingSystem', label: 'Raf Sistemi' },
              { key: 'coldStorage', label: 'Soğuk Depolama' },
            ]
          },
          {
            title: 'Güvenlik & Sistem',
            features: [
              { key: 'fireExtinguishingSystem', label: 'Yangın Söndürme Sistemi' },
              { key: 'securityCameras', label: 'Güvenlik Kameraları' },
              { key: 'alarmSystem', label: 'Alarm Sistemi' },
              { key: 'fencedArea', label: 'Çitli/Bariyerli Alan' },
              { key: 'security', label: 'Güvenlik' },
            ]
          }
        ];
      case 'OFIS':
        return [
          {
            title: 'Temel Özellikler',
            features: [
              { key: 'furnished', label: 'Eşyalı' },
              { key: 'parking', label: 'Otopark' },
              { key: 'elevator', label: 'Asansör' },
              { key: 'security', label: 'Güvenlik' },
              { key: 'generator', label: 'Jeneratör' },
            ]
          },
          {
            title: 'Ofis Konfor',
            features: [
              { key: 'airConditioning', label: 'Klima' },
              { key: 'internet', label: 'İnternet' },
              { key: 'kitchen', label: 'Mutfak/Çay Ocağı' },
              { key: 'fireSystem', label: 'Yangın Sistemi' },
            ]
          },
          {
            title: 'Çalışma Alanları',
            features: [
              { key: 'reception', label: 'Resepsiyon Alanı' },
              { key: 'meetingRoom', label: 'Toplantı Odası' },
              { key: 'waitingArea', label: 'Bekleme Salonu' },
              { key: 'archive', label: 'Arşiv Odası' },
              { key: 'library', label: 'Kütüphane/Dosya Odası' },
            ]
          },
          {
            title: 'Teknik Altyapı',
            features: [
              { key: 'serverRoom', label: 'Sunucu Odası' },
              { key: 'accessControl', label: 'Kartlı Giriş Sistemi' },
              { key: 'fiberInternet', label: 'Fiber İnternet Altyapısı' },
              { key: 'soundproof', label: 'Ses Yalıtımı' },
            ]
          }
        ];
      case 'ARSA':
        return [
          {
            title: 'Altyapı',
            features: [
              { key: 'electricity', label: 'Elektrik' },
              { key: 'water', label: 'Su' },
              { key: 'naturalGas', label: 'Doğalgaz' },
              { key: 'sewerage', label: 'Kanalizasyon' },
              { key: 'roadAccess', label: 'Yol Erişimi' },
            ]
          },
          {
            title: 'Konum & Manzara',
            features: [
              { key: 'cornerLot', label: 'Köşe Parsel' },
              { key: 'seaView', label: 'Deniz Manzarası' },
              { key: 'cityView', label: 'Şehir Manzarası' },
              { key: 'forestView', label: 'Orman Manzarası' },
              { key: 'mountainView', label: 'Dağ Manzarası' },
            ]
          },
          {
            title: 'Arazi Özellikler',
            features: [
              { key: 'flat', label: 'Düz Arazi' },
              { key: 'slope', label: 'Eğimli Arazi' },
              { key: 'fenced', label: 'Çevrili/Çitli' },
              { key: 'agricultural', label: 'Tarımsal Faaliyet' },
              { key: 'buildingPermit', label: 'Yapı İzni Var' },
            ]
          },
          {
            title: 'Tarım & Bahçe',
            features: [
              { key: 'vineyard', label: 'Bağ/Üzüm' },
              { key: 'orchard', label: 'Meyve Bahçesi' },
              { key: 'oliveTrees', label: 'Zeytin Ağaçları' },
              { key: 'greenhouse', label: 'Sera' },
              { key: 'well', label: 'Su Kuyusu' },
            ]
          }
        ];
      case 'HIZMET':
        return [
          {
            title: 'Temel Altyapı',
            features: [
              { key: 'security', label: 'Güvenlik' },
              { key: 'lighting', label: 'Aydınlatma' },
              { key: 'cctv', label: 'Güvenlik Kamerası' },
              { key: 'internet', label: 'İnternet' },
            ]
          },
          {
            title: 'Hizmet Alanları',
            features: [
              { key: 'reception', label: 'Resepsiyon' },
              { key: 'restRoom', label: 'Tuvalet' },
              { key: 'kitchen', label: 'Mutfak' },
            ]
          },
          {
            title: 'Teknik Donanım',
            features: [
              { key: 'washingArea', label: 'Yıkama Sistemi' },
              { key: 'maintenanceArea', label: 'Bakım/Onarım Alanı' },
              { key: 'airConditioning', label: 'Klima Sistemi' },
              { key: 'ventilationSystem', label: 'Havalandırma' },
            ]
          },
          {
            title: 'Ek Hizmetler',
            features: [
              { key: 'storage', label: 'Depolama Alanı' },
              { key: 'officeArea', label: 'Ofis Alanı' },
              { key: 'customerParking', label: 'Müşteri Otoparkı' },
            ]
          }
        ];
      default:
        return [];
    }
  };

  const renderListingDetail = () => {
    if (!listing) return null;
    const isPinned = PinnedListingService.isListingPinned(listing.id);

    return (
      <>
        <HeaderWithActions 
          title={listing.title}
          isPinned={isPinned}
          onPinToggle={handlePinToggle}
          isFavorited={isFavorited}
          onFavoriteToggle={handleFavoriteToggle}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <PhotoGallery 
              photos={listing.photos || []} 
              currentIndex={currentIndex} 
              setCurrentIndex={setCurrentIndex} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {renderPropertyPanel()}
          </Grid>
        </Grid>

        <DescriptionBox description={listing.description} />

        <TabbedPanel
          details={listing.details}
          latitude={listing.latitude}
          longitude={listing.longitude}
          city={listing.city}
          district={listing.district}
          neighborhood={listing.neighborhood}
          featureCategories={getFeatureCategories()}
        />
      </>
    );
  };

  if (loading) {
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
                <ListingDetailsSkeleton />
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
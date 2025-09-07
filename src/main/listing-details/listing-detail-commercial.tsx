// listing-details/listing-detail-commercial.tsx
import React, { useState } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import PhotoGallery from './shared/PhotoGallery.tsx';
import HeaderWithActions from './shared/HeaderWithActions.tsx';
import DescriptionBox from './shared/DescriptionBox.tsx';
import TabbedPanel from './shared/TabbedPanel.tsx';
import { formatPrice } from './shared/utils.ts';

interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

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
  photos: Photo[];
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

interface ListingDetailCommercialProps {
  listing: ListingData;
  pinnedListings: any[];
  onUnpinListing: (listingId: string) => void;
  onPinListing?: (listing: any) => void;
}

const getImportantDetailsForCommercial = (details: any) => {
  const safeDetails = details || {};
  
  return {
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Bulunduğu Kat": safeDetails.floorNo || 'Belirtilmemiş',
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Isıtma Türü": safeDetails.heatingType || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Vitrin": safeDetails.showcase ? 'Var' : 'Yok',
    "Otopark": safeDetails.parking ? 'Var' : 'Yok',
    "Güvenlik": safeDetails.security ? 'Var' : 'Yok',
    "Asansör": safeDetails.elevator ? 'Var' : 'Yok',
    "Klima": safeDetails.airConditioning ? 'Var' : 'Yok',
  };
};

const COMMERCIAL_FEATURE_CATEGORIES = [
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

const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForCommercial(details);

  return (
    <Box sx={{
      p: 1,
      border: "1px solid #e2e8f0",
      borderRadius: 1,
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      height: '400px',
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#ed9517ff", mb: 0.5 }}>
        {formatPrice(price)} ₺
        {listingType === "RENT" && (
          <Typography component="span" sx={{ fontSize: 16, ml: 0.5, color: "#64748b" }}>
            /ay
          </Typography>
        )}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ color: "#64748b", fontSize: '13px' }}>
          {neighborhood && `${neighborhood}, `} {district}, {city}
        </Typography>
      </Box>

      <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#334155", fontSize: '13px' }}>
          Ticari Emlak Özellikleri
        </Typography>

        <Box>
          {Object.entries(importantDetails).map(([key, value], index, array) => (
            <Box key={key}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0.5,
                px: 0.5
              }}>
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: '11px' }}>
                  {key}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "#1e293b", fontSize: '11px' }}>
                  {value}
                </Typography>
              </Box>
              {index < array.length - 1 && (
                <Divider sx={{ borderColor: '#e5e7eb' }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default function ListingDetailCommercial({
  listing, pinnedListings, onUnpinListing, onPinListing
}: ListingDetailCommercialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPinnedLocal, setIsPinnedLocal] = useState(
    pinnedListings?.some(p => p.id === listing.id) || false
  );

  const handlePinToggle = () => {
    if (isPinnedLocal) {
      onUnpinListing(listing.id);
      setIsPinnedLocal(false);
    } else {
      onPinListing && onPinListing(listing);
      setIsPinnedLocal(true);
    }
  };

  return (
    <>
      <HeaderWithActions 
        title={listing.title}
        isPinned={isPinnedLocal}
        onPinToggle={handlePinToggle}
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
          <PropertyInfoPanel
            listingType={listing.listingType}
            title={listing.title}
            price={listing.price}
            city={listing.city}
            district={listing.district}
            neighborhood={listing.neighborhood}
            details={listing.details}
          />
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
        featureCategories={COMMERCIAL_FEATURE_CATEGORIES}
      />
    </>
  );
}
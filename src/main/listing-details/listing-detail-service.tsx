// listing-details/listing-detail-service.tsx
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

interface ListingDetailServiceProps {
  listing: ListingData;
  pinnedListings: any[];
  onUnpinListing: (listingId: string) => void;
  onPinListing?: (listing: any) => void;
}

const getImportantDetailsForService = (details: any) => {
  const safeDetails = details || {};
  
  return {
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Kapasite": safeDetails.capacity || 'Belirtilmemiş',
    "Kapalılık Durumu": safeDetails.spaceType || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Güvenlik": safeDetails.security ? 'Var' : 'Yok',
    "Aydınlatma": safeDetails.lighting ? 'Var' : 'Yok',
    "Güvenlik Kamerası": safeDetails.cctv ? 'Var' : 'Yok',
    "İnternet": safeDetails.internet ? 'Var' : 'Yok',
    "Resepsiyon": safeDetails.reception ? 'Var' : 'Yok',
    "Müşteri Otoparkı": safeDetails.customerParking ? 'Var' : 'Yok',
  };
};

const SERVICE_FEATURE_CATEGORIES = [
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

const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForService(details);

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
          Hizmet Alanı Özellikleri
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

export default function ListingDetailService({
  listing, pinnedListings, onUnpinListing, onPinListing
}: ListingDetailServiceProps) {
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
        featureCategories={SERVICE_FEATURE_CATEGORIES}
      />
    </>
  );
}
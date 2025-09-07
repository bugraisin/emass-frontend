// listing-details/listing-detail-industrial.tsx
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

interface ListingDetailIndustrialProps {
  listing: ListingData;
  pinnedListings: any[];
  onUnpinListing: (listingId: string) => void;
  onPinListing?: (listing: any) => void;
}

const getImportantDetailsForIndustrial = (details: any) => {
  const safeDetails = details || {};
  
  return {
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Tavan Yüksekliği (m)": safeDetails.ceilingHeight || 'Belirtilmemiş',
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Üç Fazlı Elektrik": safeDetails.threephaseElectricity ? 'Var' : 'Yok',
    "Doğalgaz Hattı": safeDetails.naturalGasLine ? 'Var' : 'Yok',
    "Vinç Sistemi": safeDetails.craneSystem ? 'Var' : 'Yok',
    "Yükleme Rampası": safeDetails.loadingRamp ? 'Var' : 'Yok',
    "TIR Girişi": safeDetails.truckEntrance ? 'Var' : 'Yok',
    "Yangın Sistemi": safeDetails.fireExtinguishingSystem ? 'Var' : 'Yok',
    "Güvenlik": safeDetails.security ? 'Var' : 'Yok',
  };
};

const INDUSTRIAL_FEATURE_CATEGORIES = [
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

const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForIndustrial(details);

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
          Endüstriyel Özellikleri
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

export default function ListingDetailIndustrial({
  listing, pinnedListings, onUnpinListing, onPinListing
}: ListingDetailIndustrialProps) {
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
        featureCategories={INDUSTRIAL_FEATURE_CATEGORIES}
      />
    </>
  );
}
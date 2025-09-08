// listing-details/listing-detail-office.tsx
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

interface ListingDetailOfficeProps {
  listing: ListingData;
  isPinned: boolean;
  onPinToggle: () => void;
}

const getImportantDetailsForOffice = (details: any) => {
  const safeDetails = details || {};
  
  return {
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Oda Sayısı": safeDetails.roomCount || 'Belirtilmemiş',
    "Toplantı Odası": safeDetails.meetingRoomCount || 'Belirtilmemiş',
    "Bulunduğu Kat": safeDetails.floorNo || 'Belirtilmemiş',
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Cephe Yönü": safeDetails.facadeDirection || 'Belirtilmemiş',
    "Isıtma Türü": safeDetails.heatingType || 'Belirtilmemiş',
    "Aidat (₺)": safeDetails.siteFee || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Otopark": safeDetails.parking ? 'Var' : 'Yok',
  };
};

const OFFICE_FEATURE_CATEGORIES = [
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

const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForOffice(details);

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
          Ofis Özellikleri
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

export default function ListingDetailOffice({
  listing, isPinned, onPinToggle
}: ListingDetailOfficeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <HeaderWithActions 
        title={listing.title}
        isPinned={isPinned}
        onPinToggle={onPinToggle}
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
        featureCategories={OFFICE_FEATURE_CATEGORIES}
      />
    </>
  );
}
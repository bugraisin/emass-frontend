// listing-details/listing-detail-house.tsx
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

interface ListingDetailHouseProps {
  listing: ListingData;
  isPinned: boolean;
  onPinToggle: () => void;
}

const getImportantDetailsForKonut = (details: any) => {
  const safeDetails = details || {};
  
  return {
    "Oda Sayısı": safeDetails.roomCount || 'Belirtilmemiş',
    "Brüt Alan (m²)": safeDetails.grossArea || 'Belirtilmemiş',
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Bulunduğu Kat": safeDetails.floorNo || 'Belirtilmemiş',
    "Toplam Kat Sayısı": safeDetails.totalFloors || 'Belirtilmemiş',
    "Banyo Sayısı": safeDetails.bathroomCount || 'Belirtilmemiş',
    "Site/Apartman Adı": safeDetails.siteName || 'Belirtilmemiş',
    "Aidat (₺)": safeDetails.siteFee || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Eşyalı": safeDetails.furnished ? 'Var' : 'Yok',
    "Site İçerisinde": safeDetails.withinSite ? 'Var' : 'Yok',
  };
};

const HOUSE_FEATURE_CATEGORIES = [
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

const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForKonut(details);

  return (
    <Box sx={{
      p: 1,
      border: "1px solid #e2e8f0",
      borderRadius: 1,
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
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
          Emlak Özellikleri
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

export default function ListingDetailHouse({
  listing, isPinned, onPinToggle
}: ListingDetailHouseProps) {
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
        featureCategories={HOUSE_FEATURE_CATEGORIES}
      />
    </>
  );
}
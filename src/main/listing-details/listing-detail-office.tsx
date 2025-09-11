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
  isFavorited: boolean;
  onFavoriteToggle: () => void;
}

const getImportantDetailsForOffice = (details: any, createdAt: string) => {
  const safeDetails = details || {};

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Belirtilmemiş';
    }
  };

  const getHeatingTypeLabel = (value: string) => {
    const heatingOptions = [
      { value: "DOGALGAZ", label: "Doğalgaz" },
      { value: "MERKEZI", label: "Merkezi" },
      { value: "KALORIFER", label: "Kalorifer" },
      { value: "KLIMA", label: "Klima" },
      { value: "ELEKTRIKLI", label: "Elektrikli" },
      { value: "SOBALI", label: "Sobali" },
      { value: "YOK", label: "Yok" }
    ];
    return heatingOptions.find(h => h.value === value)?.label || value;
  };

  const getBuildingTypeDetails = (value: string) => {
    const buildingOptions = [
      { value: "APARTMAN", label: "Apartman"},
      { value: "PLAZA", label: "Plaza"},
      { value: "MUSTAKIL", label: "Müstakil"},
      { value: "PASAJ", label: "Pasaj"},
      { value: "AVM", label: "AVM"},
    ];
    return buildingOptions.find(h => h.value === value)?.label || value;
  };
  
  return {
    "İlan Tarihi": formatDate(createdAt),
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Oda Sayısı": safeDetails.roomCount || 'Belirtilmemiş',
    "Bulunduğu Kat": safeDetails.floorNo || 'Belirtilmemiş',
    "Toplam Kat": safeDetails.floorCount || "Belirtilmemiş",
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Isıtma Tipi": safeDetails.heatingType ? getHeatingTypeLabel(safeDetails.heatingType) : 'Belirtilmemiş',
    "Bina Tipi": safeDetails.buildingType ? getBuildingTypeDetails(safeDetails.buildingType) : "Belirtilmemiş",
    "Aidat (₺)": safeDetails.siteFee || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Mutfak": safeDetails.kitchen ? "Var" : "Yok",
    "Klima": safeDetails.airConditioning ? "Var" : "Yok",
    "Tuvalet": safeDetails.toilet ? "Var" : "Yok",
    "İnternet": safeDetails.internet ? "Var" : "Yok",
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

const PropertyInfoPanel = ({ createdAt, listingType, subtype, price, city, district, neighborhood, details }: {
  createdAt: string;
  listingType: string;
  subtype: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
}) => {
  const importantDetails = getImportantDetailsForOffice(details, createdAt);

  const getSubtypeLabel = (value: string) => {
    const subtypeOptions = [
      { value: "OFIS", label: "Ofis" },
      { value: "BÜRO", label: "Büro" },
      { value: "COWORKING", label: "Coworking" },
      { value: "CALL_CENTER", label: "Call Center" },
      { value: "TOPLANTI_SALONU", label: "Toplantı Salonu" },
      { value: "MUAYENEHANE", label: "Muayenehane" },
      { value: "AVUKATLIK_BÜROSU", label: "Avukatlık Bürosu" },
      { value: "MUHASEBE_OFISI", label: "Muhasebe Ofisi" },
    ];
    return subtypeOptions.find(s => s.value === value)?.label || value;
  };

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
           {getSubtypeLabel(subtype)} Özellikleri
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
  listing, 
  isPinned, 
  onPinToggle,
  isFavorited,
  onFavoriteToggle
}: ListingDetailOfficeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <HeaderWithActions 
        title={listing.title}
        isPinned={isPinned}
        onPinToggle={onPinToggle}
        isFavorited={isFavorited}
        onFavoriteToggle={onFavoriteToggle}
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
            createdAt={listing.createdAt}
            listingType={listing.listingType}
            subtype={listing.subtype}
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
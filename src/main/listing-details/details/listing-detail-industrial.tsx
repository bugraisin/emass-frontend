// listing-details/listing-detail-industrial.tsx - Simplified version
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { formatPrice } from '../shared/utils.ts';

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

interface ListingDetailIndustrialProps {
  listing: ListingData;
}

const getImportantDetailsForIndustrial = (details: any, createdAt: string) => {
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
  
  return {
    "İlan Tarihi": formatDate(createdAt),
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "Tavan Yüksekliği (m)": safeDetails.ceilingHeight || 'Belirtilmemiş',
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Bölüm Sayısı": safeDetails.roomCount || "Belirtilmemiş",
    "Kat Sayısı": safeDetails.floorCount || "Belirtilmemiş",
    "Üç Fazlı Elektrik": safeDetails.threephaseElectricity ? 'Var' : 'Yok',
    "Doğalgaz Hattı": safeDetails.naturalGasLine ? 'Var' : 'Yok',
    "Havalandırma Sistemi": safeDetails.ventilationSystem ? 'Var' : 'Yok',
    "Yangın Sistemi": safeDetails.fireExtinguishingSystem ? 'Var' : 'Yok',
    "Alarm Sistemi": safeDetails.alarmSystem ? "Var" : "Yok",
    "Güvenlik": safeDetails.security ? 'Var' : 'Yok',
  };
};

const getSubtypeLabel = (value: string) => {
  const subtypeOptions = [
    { value: "FABRIKA", label: "Fabrika" },
    { value: "ATOLYE", label: "Atölye" },
    { value: "IMALATHANE", label: "İmalathane" },
    { value: "DEPO", label: "Depo" },
    { value: "SOGUK_HAVA_DEPOSU", label: "Soğuk Hava Deposu" },
    { value: "ANTREPO", label: "Antrepo" },
    { value: "LABORATUVAR", label: "Laboratuvar" },
    { value: "URETIM_TESISI", label: "Üretim Tesisi" }
  ];
  return subtypeOptions.find(s => s.value === value)?.label || value;
};

export default function ListingDetailIndustrial({ listing }: ListingDetailIndustrialProps) {
  const importantDetails = getImportantDetailsForIndustrial(listing.details, listing.createdAt);

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
        {formatPrice(listing.price)} ₺
        {listing.listingType === "RENT" && (
          <Typography component="span" sx={{ fontSize: 16, ml: 0.5, color: "#64748b" }}>
            /ay
          </Typography>
        )}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" sx={{ color: "#64748b", fontSize: '13px' }}>
          {listing.neighborhood && `${listing.neighborhood}, `} {listing.district}, {listing.city}
        </Typography>
      </Box>

      <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#334155", fontSize: '13px' }}>
          {getSubtypeLabel(listing.subtype)} Özellikleri
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
}
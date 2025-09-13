// listing-details/listing-detail-commercial.tsx - Simplified version
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

interface ListingDetailCommercialProps {
  listing: ListingData;
}

const getImportantDetailsForCommercial = (details: any, createdAt: string) => {
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
    "Bulunduğu Kat": safeDetails.floorNo || 'Belirtilmemiş',
    "Toplam Kat": safeDetails.floorCount || "Belirtilmemiş",
    "Bina Yaşı": safeDetails.buildingAge || 'Belirtilmemiş',
    "Depozito (₺)": safeDetails.deposit || 'Belirtilmemiş',
    "Aidat (₺)": safeDetails.siteFee || "Belirtilmemiş",
    "Bina Tipi": safeDetails.buildingType ? getBuildingTypeDetails(safeDetails.buildingType) : "Belirtilmemiş",
    "Isıtma Tipi": safeDetails.heatingType ? getHeatingTypeLabel(safeDetails.heatingType) : 'Belirtilmemiş',
    "Mutfak": safeDetails.kitchen ? "Var" : "Yok",
    "Klima": safeDetails.airConditioning ? "Var" : "Yok",
    "Tuvalet": safeDetails.toilet ? "Var" : "Yok",
    "İnternet": safeDetails.internet ? "Var" : "Yok",
  };
};

const getSubtypeLabel = (value: string) => {
  const subtypeOptions = [
    { value: "DUKKAN", label: "Dükkan" },
    { value: "MAGAZA", label: "Mağaza" },
    { value: "MARKET", label: "Market" },
    { value: "RESTAURANT", label: "Restaurant" },
    { value: "KAFE", label: "Kafe" },
    { value: "BAR", label: "Bar" },
    { value: "PASTANE", label: "Pastane" },
    { value: "BERBER_KUAFOR", label: "Berber & Kuaför" },
    { value: "GuZELLIK_SALONU", label: "Güzellik Salonu" },
    { value: "ECZANE", label: "Eczane" }
  ];
  return subtypeOptions.find(s => s.value === value)?.label || value;
};

export default function ListingDetailCommercial({ listing }: ListingDetailCommercialProps) {
  const importantDetails = getImportantDetailsForCommercial(listing.details, listing.createdAt);

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
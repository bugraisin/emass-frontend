// listing-details/listing-detail-land.tsx - Simplified version
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

interface ListingDetailLandProps {
  listing: ListingData;
}

const getImportantDetailsForLand = (details: any, createdAt: string) => {
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

  const getZoningStatus = (value: string) => {
    const zoningOptions = [
      { value: "IMARLI", label: "İmarlı" },
      { value: "IMARSIZ", label: "İmarsız" },
      { value: "TARLA", label: "Tarla" },
      { value: "BAHCE", label: "Bahçe" },
      { value: "KONUT_IMARLI", label: "Konut İmarlı" },
      { value: "TICARI_IMARLI", label: "Ticari İmarlı" },
      { value: "SANAYI_IMARLI", label: "Sanayi İmarlı" },
      { value: "DIGER", label: "Diğer" }
    ];
    return zoningOptions.find(s => s.value === value)?.label || value;
  };

  const getTitleLandDeedStatus = (value: string) => {
    const zoningOptions = [
      { value: "ARSA_PAYI", label: "Arsa Payı" },
      { value: "MUSTAKIL_TAPULU", label: "Müstakil Tapulu" },
      { value: "HISSELI_TAPULU", label: "Hisseli Tapulu" },
      { value: "TARLA_TAPULU", label: "Tarla Tapulu" }
    ];
    return zoningOptions.find(s => s.value === value)?.label || value;
  };
  
  return {
    "İlan Tarihi": formatDate(createdAt),
    "Net Alan (m²)": safeDetails.netArea || 'Belirtilmemiş',
    "İmar Durumu": safeDetails.zoningStatus ? getZoningStatus(safeDetails.zoningStatus) : 'Belirtilmemiş',
    "Tapu Durumu": safeDetails.titleLandDeedStatus ? getTitleLandDeedStatus(safeDetails.titleLandDeedStatus) : 'Belirtilmemiş',
    "Ada No": safeDetails.adaNo || "Belirtilmemiş",
    "Parsel No": safeDetails.parcelNo || "Belirtilmemiş",
    "Pafta No": safeDetails.paftaNo || "Belirtilmemiş",
    "KAKS": safeDetails.kaks || "Belirtilmemiş",
    "Gabari (m)": safeDetails.gabari || "Belirtilmemiş",
    "Yol Erişimi": safeDetails.roadAccess ? "Var" : "Yok",
    "Elektrik": safeDetails.electricity ? "Var" : "Yok",
    "Su": safeDetails.water ? "Var" : "Yok",
    "Doğalgaz": safeDetails.naturalGas ? "Var" : "Yok",
  };
};

export default function ListingDetailLand({ listing }: ListingDetailLandProps) {
  const importantDetails = getImportantDetailsForLand(listing.details, listing.createdAt);

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
          Arsa Özellikleri
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
// listing-details/shared/CheckboxFeature.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface CheckboxFeatureProps {
  feature: { key: string; label: string };
  isSelected: boolean;
}

export default function CheckboxFeature({ feature, isSelected }: CheckboxFeatureProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.125 }}>
      <Box sx={{
        width: 12, height: 12, border: '1px solid #cbd5e1', borderRadius: 0.25, mr: 0.75,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: isSelected ? '#16a34a' : '#ffffff',
        borderColor: isSelected ? '#16a34a' : '#cbd5e1'
      }}>
        {isSelected && (
          <Typography sx={{ color: '#ffffff', fontSize: '8px', fontWeight: 'bold' }}>✓</Typography>
        )}
      </Box>
      <Typography variant="body2" sx={{
        color: isSelected ? '#1e293b' : '#64748b',
        fontSize: '11px',
        fontWeight: isSelected ? 500 : 400
      }}>
        {feature.label}
      </Typography>
    </Box>
  );
}
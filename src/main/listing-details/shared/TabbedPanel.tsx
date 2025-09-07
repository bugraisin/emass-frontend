import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CheckboxFeature from './CheckboxFeature.tsx';
import LocationPanel from './LocationPanel.tsx';

interface Feature {
  key: string;
  label: string;
}

interface FeatureCategory {
  title: string;
  features: Feature[];
}

interface TabbedPanelProps {
  details: any;
  latitude: number | null;
  longitude: number | null;
  city: string;
  district: string;
  neighborhood: string;
  featureCategories: FeatureCategory[];
}

export default function TabbedPanel({ 
  details, 
  latitude, 
  longitude, 
  city, 
  district, 
  neighborhood, 
  featureCategories 
}: TabbedPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  const FeatureCategories = () => (
    <Grid container spacing={1}>
      {featureCategories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{
            p: 1.5,
            border: '1px solid #e2e8f0',
            borderRadius: 1,
            backgroundColor: '#f8fafc',
            height: 150,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="subtitle2" sx={{
              mb: 1, fontWeight: 600, color: '#334155', fontSize: '12px'
            }}>
              {category.title}
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.25,
              flex: 1,
              overflowY: 'auto'
            }}>
              {category.features.map((feature) => (
                <CheckboxFeature
                  key={feature.key}
                  feature={feature}
                  isSelected={(details && details[feature.key]) || false}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ 
      mt: 2,
      border: "1px solid #e2e8f0",
      borderRadius: 2,
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <Box sx={{
        display: 'flex',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Box
          onClick={() => setActiveTab(0)}
          sx={{
            px: 2.5,
            py: 1.5,
            cursor: 'pointer',
            borderBottom: activeTab === 0 ? '3px solid #ed9517' : '3px solid transparent',
            color: activeTab === 0 ? '#ed9517' : '#64748b',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeTab === 0 ? 'white' : 'transparent',
            '&:hover': {
              color: activeTab === 0 ? '#ed9517' : '#1e293b',
              backgroundColor: activeTab === 0 ? 'white' : '#f1f5f9'
            }
          }}
        >
          Ek Özellikler
        </Box>
        <Box
          onClick={() => setActiveTab(1)}
          sx={{
            px: 2.5,
            py: 1.5,
            cursor: 'pointer',
            borderBottom: activeTab === 1 ? '3px solid #ed9517' : '3px solid transparent',
            color: activeTab === 1 ? '#ed9517' : '#64748b',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeTab === 1 ? 'white' : 'transparent',
            '&:hover': {
              color: activeTab === 1 ? '#ed9517' : '#1e293b',
              backgroundColor: activeTab === 1 ? 'white' : '#f1f5f9'
            }
          }}
        >
          Konum
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        {activeTab === 0 && <FeatureCategories />}
        {activeTab === 1 && (
          <LocationPanel
            latitude={latitude}
            longitude={longitude}
            city={city}
            district={district}
            neighborhood={neighborhood}
          />
        )}
      </Box>
    </Box>
  );
}
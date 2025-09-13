// ListingDetailsSkeleton.tsx
import React from 'react';
import { Box, Typography, Grid, Skeleton, Divider } from '@mui/material';

const ListingDetailsSkeleton = () => {
  return (
    <Box sx={{ p: 1, fontFamily: 'sans-serif' }}>
      {/* HeaderWithActions Skeleton - Tam aynı yapı */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        pb: 1,
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Box sx={{ flex: 1 }}>
          {/* Title skeleton */}
          <Skeleton 
            variant="text" 
            width="65%" 
            height={32} 
            animation="wave"
          />
        </Box>
        {/* Action buttons skeleton */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton 
            variant="circular" 
            width={40} 
            height={40} 
            animation="wave"
          />
          <Skeleton 
            variant="circular" 
            width={40} 
            height={40} 
            animation="wave"
          />
        </Box>
      </Box>

      {/* Grid container spacing={2} - Tam aynı */}
      <Grid container spacing={2}>
        
        {/* Sol taraf - PhotoGallery xs={12} md={8} */}
        <Grid item xs={12} md={8}>
          <Box>
            {/* Ana fotoğraf skeleton */}
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={400} 
              animation="wave"
              sx={{ borderRadius: 1, mb: 1 }}
            />
            
            {/* Küçük fotoğraflar skeleton */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="rectangular" 
                  width={80} 
                  height={60} 
                  animation="wave"
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Sağ taraf - PropertyInfoPanel xs={12} md={4} */}
        <Grid item xs={12} md={4}>
          <Box sx={{
            p: 1, // Aynı padding
            border: "1px solid #e2e8f0",
            borderRadius: 1,
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
          }}>
            {/* Fiyat skeleton - Typography variant="h5" */}
            <Box sx={{ mb: 0.5 }}>
              <Skeleton 
                variant="text" 
                width="60%" 
                height={35} 
                animation="wave"
              />
            </Box>
            
            {/* Adres skeleton - Typography variant="body2" */}
            <Box sx={{ mb: 1 }}>
              <Skeleton 
                variant="text" 
                width="80%" 
                height={20} 
                animation="wave"
              />
            </Box>
            
            {/* Divider - aynı margin */}
            <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />
            
            {/* Alt başlık skeleton - Typography variant="subtitle2" */}
            <Box sx={{ mb: 1 }}>
              <Skeleton 
                variant="text" 
                width="50%" 
                height={18} 
                animation="wave"
              />
            </Box>
            
            {/* Özellik listesi - Object.entries(importantDetails).map() */}
            <Box>
              {[...Array(17)].map((_, index) => ( // 17 tane özellik var
                <Box key={index}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5, // Aynı padding
                    px: 0.5
                  }}>
                    {/* Sol taraf - key skeleton */}
                    <Skeleton 
                      variant="text" 
                      width="45%" 
                      height={14} // fontSize: '11px' 
                      animation="wave"
                    />
                    {/* Sağ taraf - value skeleton */}
                    <Skeleton 
                      variant="text" 
                      width="35%" 
                      height={14} // fontSize: '11px'
                      animation="wave"
                    />
                  </Box>
                  {/* Divider - sadece son item hariç */}
                  {index < 16 && (
                    <Divider sx={{ borderColor: '#e5e7eb' }} />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* DescriptionBox skeleton */}
      <Box sx={{ mt: 2 }}>
        {/* Başlık yok, sadece içerik kutusu */}
        <Box sx={{
          p: 2,
          border: "1px solid #e2e8f0",
          borderRadius: 1,
          backgroundColor: '#f8fafc'
        }}>
          {/* Açıklama text skeleton */}
          <Skeleton 
            variant="text" 
            width="100%" 
            height={18} 
            animation="wave"
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            width="95%" 
            height={18} 
            animation="wave"
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            width="88%" 
            height={18} 
            animation="wave"
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            width="92%" 
            height={18} 
            animation="wave"
            sx={{ mb: 0.5 }}
          />
          <Skeleton 
            variant="text" 
            width="75%" 
            height={18} 
            animation="wave"
          />
        </Box>
      </Box>

      {/* TabbedPanel skeleton */}
      <Box sx={{ mt: 2 }}>
        {/* Tab başlıkları skeleton */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          mb: 2,
          borderBottom: '1px solid #e2e8f0',
          pb: 1
        }}>
          <Skeleton 
            variant="text" 
            width={80} 
            height={32} 
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            width={60} 
            height={32} 
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            width={70} 
            height={32} 
            animation="wave"
          />
        </Box>

        {/* Tab içeriği - HOUSE_FEATURE_CATEGORIES yapısı */}
        <Grid container spacing={3}>
          {[...Array(6)].map((_, categoryIndex) => ( // 6 kategori var
            <Grid item xs={12} sm={6} md={4} key={categoryIndex}>
              <Box>
                {/* Kategori başlığı skeleton */}
                <Skeleton 
                  variant="text" 
                  width="70%" 
                  height={22} 
                  animation="wave"
                  sx={{ mb: 1 }} 
                />
                {/* Feature'lar skeleton - her kategoride farklı sayıda */}
                {[...Array(categoryIndex === 0 ? 5 : categoryIndex === 1 ? 3 : 4)].map((_, featureIndex) => (
                  <Box key={featureIndex} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 0.5 
                  }}>
                    {/* Checkbox/icon skeleton */}
                    <Skeleton 
                      variant="rectangular" 
                      width={16} 
                      height={16} 
                      animation="wave"
                      sx={{ mr: 1, borderRadius: 0.5 }} 
                    />
                    {/* Feature label skeleton */}
                    <Skeleton 
                      variant="text" 
                      width="75%" 
                      height={18} 
                      animation="wave"
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListingDetailsSkeleton;
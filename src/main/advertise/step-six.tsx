import React, { useState } from "react";
import { Box, Typography, Grid, IconButton, Divider } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, LocationOn } from "@mui/icons-material";

interface Photo {
  id: string;
  file: File;
  url: string;
  isMain: boolean;
}

interface StepSixProps {
  listingType: string;
  propertyType: string;
  subtype: string;
  title: string;
  description: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  addressText: string;
  details: any;
  photos: Photo[];
  latitude: number | null;
  longitude: number | null;
}

// Helper functions (normally would be in separate file)
const formatPrice = (priceString: string): string => {
  const num = parseFloat(priceString);
  return new Intl.NumberFormat("tr-TR").format(num);
};

const getImportantDetailsForKonut = (details: any) => {
  return {
    "Oda Sayısı": details.roomCount || 'Belirtilmemiş',
    "Brüt Alan (m²)": details.grossArea || 'Belirtilmemiş',
    "Net Alan (m²)": details.netArea || 'Belirtilmemiş',
    "Bina Yaşı": details.buildingAge || 'Belirtilmemiş',
    "Bulunduğu Kat": details.floorNo || 'Belirtilmemiş',
    "Toplam Kat Sayısı": details.totalFloors || 'Belirtilmemiş',
    "Banyo Sayısı": details.bathroomCount || 'Belirtilmemiş',
    "Site/Apartman Adı": details.siteName || 'Belirtilmemiş',
    "Aidat (₺)": details.siteFee || 'Belirtilmemiş',
    "Depozito (₺)": details.deposit || 'Belirtilmemiş',
  };
};

const FEATURE_CATEGORIES = [
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

// Photo Gallery Component
const PhotoGallery = ({ photos, currentIndex, setCurrentIndex }: {
  photos: Photo[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const handlePrev = () => setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  const handleNext = () => setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);

  if (photos.length === 0) return (
    <Box sx={{ 
      height: 480, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      borderRadius: 2,
      border: '2px dashed #cbd5e1'
    }}>
      <Typography sx={{ color: '#64748b' }}>Fotoğraf yüklenmemiş</Typography>
    </Box>
  );

  return (
    <Box sx={{ position: "relative", height: 480, overflow: "hidden", borderRadius: 2 }}>
      <img
        src={photos[currentIndex].url}
        alt="ilan"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
      />
      {photos.length > 1 && (
        <>
          <IconButton onClick={handlePrev} sx={{
            position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: 1,
            "&:hover": { background: "rgba(0,0,0,0.7)" }
          }}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext} sx={{
            position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: 1,
            "&:hover": { background: "rgba(0,0,0,0.7)" }
          }}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
          <Box sx={{
            position: "absolute", bottom: 10, right: 10,
            background: "rgba(0,0,0,0.6)", color: "#fff",
            padding: "4px 8px", borderRadius: 1, fontSize: 12
          }}>
            {currentIndex + 1} / {photos.length}
          </Box>
        </>
      )}
    </Box>
  );
};

// Property Info Panel Component
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
      p: 2, 
      border: "1px solid #e2e8f0", 
      borderRadius: 1, 
      height: 480,
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#059669", mb: 1.5 }}>
        {formatPrice(price)} TL
        {listingType === "rent" && (
          <Typography component="span" sx={{ fontSize: 16, ml: 0.5, color: "#64748b" }}>
            /ay
          </Typography>
        )}
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1e293b", fontSize: '16px' }}>
        {title}
      </Typography>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocationOn fontSize="small" sx={{ color: "#ef4444", mr: 0.5 }} />
        <Typography variant="body2" sx={{ color: "#64748b", fontSize: '13px' }}>
          {neighborhood && `${neighborhood}, `} {district}, {city}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 1.5, borderColor: '#e2e8f0' }} />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#334155", fontSize: '13px' }}>
          Emlak Özellikleri
        </Typography>
        
        <Grid container spacing={0.25}>
          {Object.entries(importantDetails).map(([key, value]) => (
            <React.Fragment key={key}>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: '11px', py: 0.25 }}>
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "#1e293b", fontSize: '11px', py: 0.25 }}>
                  {value}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

// Checkbox Feature Component
const CheckboxFeature = ({ feature, isSelected }: { feature: { key: string; label: string }; isSelected: boolean }) => (
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

// Feature Categories Component
const FeatureCategories = ({ details }: { details: any }) => (
 <Box sx={{ mt: 3 }}>
   <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1e293b", fontSize: '14px' }}>
     Ek Özellikler
   </Typography>
   
   <Grid container spacing={2}>
     {FEATURE_CATEGORIES.map((category, index) => (
       <Grid item xs={12} sm={6} md={4} key={index}>
         <Box sx={{
           p: 1.5, 
           border: '1px solid #e2e8f0', 
           borderRadius: 1, 
           backgroundColor: '#f8fafc',
           height: 180,
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
                 isSelected={details[feature.key] || false}
               />
             ))}
           </Box>
         </Box>
       </Grid>
     ))}
   </Grid>
 </Box>
);

// Main Component
export default function StepSix({
  listingType, propertyType, subtype, title, description, price,
  city, district, neighborhood, addressText, details, photos, latitude, longitude
}: StepSixProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", fontFamily: "sans-serif" }}>
      {/* Ana içerik: Fotoğraf + Bilgiler */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PhotoGallery photos={photos} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PropertyInfoPanel
            listingType={listingType}
            title={title}
            price={price}
            city={city}
            district={district}
            neighborhood={neighborhood}
            details={details}
          />
        </Grid>
      </Grid>

      {/* Ek Özellikler */}
      <FeatureCategories details={details} />

      {/* Açıklama */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1e293b", fontSize: '14px' }}>
          Açıklama
        </Typography>
        <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.6, fontSize: '14px' }}>
          {description}
        </Typography>
      </Box>

      {/* Konum */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1e293b", fontSize: '14px' }}>
          Konum
        </Typography>
        <Box sx={{ p: 2, border: "1px solid #e2e8f0", borderRadius: 1, backgroundColor: "#f8fafc" }}>
          <Typography variant="body1" sx={{ color: "#374151", mb: 1, fontSize: '14px' }}>
            {addressText || `${neighborhood && `${neighborhood}, `}${district}, ${city}`}
          </Typography>
          {latitude && longitude && (
            <Typography variant="body2" sx={{ color: "#64748b", fontSize: '12px' }}>
              Koordinatlar: {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
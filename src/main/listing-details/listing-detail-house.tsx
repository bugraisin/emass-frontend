import React, { useState } from "react";
import { Box, Typography, Grid, IconButton, Divider, Modal, Backdrop, Chip } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, LocationOn, Close, Fullscreen, Schedule, PushPin } from "@mui/icons-material";

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
  pinnedListings: any[];
  onUnpinListing: (listingId: string) => void;
  onPinListing?: (listing: any) => void;
}

// Helper functions
const formatPrice = (priceString: string): string => {
  const num = parseFloat(priceString);
  return new Intl.NumberFormat("tr-TR").format(num);
};

const getImportantDetailsForKonut = (details: any) => {
  // Güvenlik kontrolü - details undefined veya null ise boş obje kullan
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
  };
};

// Photo Modal Component
const PhotoModal = ({
  open,
  onClose,
  photos,
  currentIndex,
  onPrev,
  onNext
}: {
  open: boolean;
  onClose: () => void;
  photos: Photo[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  if (photos.length === 0) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
      }}>
        {/* Kapat butonu */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            zIndex: 1000
          }}
        >
          <Close />
        </IconButton>

        {/* Fotoğraf */}
        <Box sx={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={photos[currentIndex].url}
            alt={`Fotoğraf ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 8
            }}
          />

          {/* Sol ok */}
          {photos.length > 1 && (
            <IconButton
              onClick={onPrev}
              sx={{
                position: 'fixed',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                width: 50,
                height: 50,
                zIndex: 1001
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}

          {/* Sağ ok */}
          {photos.length > 1 && (
            <IconButton
              onClick={onNext}
              sx={{
                position: 'fixed',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                width: 50,
                height: 50,
                zIndex: 1001
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>

        {/* Fotoğraf sayısı */}
        {photos.length > 1 && (
          <Box sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 2,
            fontSize: 14
          }}>
            {currentIndex + 1} / {photos.length}
          </Box>
        )}
      </Box>
    </Modal>
  );
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

// Photo Gallery Component - StepSix ile aynı görünüm
const PhotoGallery = ({ photos, currentIndex, setCurrentIndex }: {
  photos: Photo[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [thumbnailOffset, setThumbnailOffset] = useState(0); // Thumbnail scroll pozisyonu

  const THUMBNAIL_WIDTH = 55; // Thumbnail + gap genişliği (65'ten 55'e)
  const VISIBLE_THUMBNAILS = 8; // Görünür thumbnail sayısı (6'dan 8'e artırdık)

  // Guard against undefined or null photos
  if (!photos || !Array.isArray(photos)) {
    return (
      <Box sx={{
        width: "100%",
        height: "400px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 2,
        border: '2px dashed #cbd5e1',
        flexShrink: 0,
        minHeight: "400px",
        maxHeight: "400px"
      }}>
        <Typography sx={{ color: '#64748b' }}>Fotoğraf yüklenmemiş</Typography>
      </Box>
    );
  }

  const handlePrev = () => setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  const handleNext = () => setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);

  // Thumbnail navigation
  const handleThumbnailPrev = () => {
    setThumbnailOffset(Math.max(0, thumbnailOffset - VISIBLE_THUMBNAILS));
  };

  const handleThumbnailNext = () => {
    const maxOffset = Math.max(0, photos.length - VISIBLE_THUMBNAILS);
    setThumbnailOffset(Math.min(maxOffset, thumbnailOffset + VISIBLE_THUMBNAILS));
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (photos.length === 0) return (
    <Box sx={{
      width: "100%",
      height: "400px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      borderRadius: 2,
      border: '2px dashed #cbd5e1',
      flexShrink: 0,
      minHeight: "400px",
      maxHeight: "400px"
    }}>
      <Typography sx={{ color: '#64748b' }}>Fotoğraf yüklenmemiş</Typography>
    </Box>
  );

  return (
    <>
      {/* Ana fotoğraf container - StepSix ile aynı boyut */}
      <Box sx={{
        position: "relative",
        width: "100%",
        height: "400px", // StepSix ile aynı yükseklik
        minHeight: "400px",
        maxHeight: "400px",
        overflow: "hidden",
        borderRadius: 2,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginBottom: 0 // Margin kaldırıldı - direkt bitişik
      }}>
        {/* Ana fotoğraf - tıklanabilir */}
        <Box
          onClick={openModal}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover .fullscreen-icon': {
              opacity: 1
            }
          }}
        >
          <img
            src={photos[currentIndex].url}
            alt="ilan"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: 'block'
            }}
          />

          {/* Büyütme ikonu */}
          <Box
            className="fullscreen-icon"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              borderRadius: 1,
              padding: '4px',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            <Fullscreen fontSize="small" />
          </Box>
        </Box>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <IconButton onClick={handlePrev} sx={{
              position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: 1,
              "&:hover": { background: "rgba(0,0,0,0.7)" },
              zIndex: 2
            }}>
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton onClick={handleNext} sx={{
              position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: 1,
              "&:hover": { background: "rgba(0,0,0,0.7)" },
              zIndex: 2
            }}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </>
        )}

        {/* Fotoğraf sayısı - sağ üst köşe */}
        {photos.length > 1 && (
          <Box sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 500
          }}>
            {currentIndex + 1} / {photos.length}
          </Box>
        )}
      </Box>

      {/* Thumbnail Panel - Altında ayrı panel */}
      {photos.length > 1 && (
        <Box sx={{
          width: "100%",
          border: "1px solid #e2e8f0",
          borderRadius: 1,
          backgroundColor: '#f8fafc',
          padding: 0.5 // Çok minimal padding
        }}>
          
          {/* Thumbnail container with navigation */}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: '44px' }}>
            {/* Sol ok */}
            {thumbnailOffset > 0 && (
              <IconButton
                onClick={handleThumbnailPrev}
                sx={{
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  width: 24,
                  height: 24,
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' }
                }}
              >
                <ArrowBackIos fontSize="small" sx={{ fontSize: 14 }} />
              </IconButton>
            )}

            {/* Sağ ok */}
            {thumbnailOffset + VISIBLE_THUMBNAILS < photos.length && (
              <IconButton
                onClick={handleThumbnailNext}
                sx={{
                  position: 'absolute',
                  right: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  width: 24,
                  height: 24,
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' }
                }}
              >
                <ArrowForwardIos fontSize="small" sx={{ fontSize: 14 }} />
              </IconButton>
            )}

            {/* Thumbnail grid - tüm paneli kaplasın */}
            <Box sx={{
              display: 'flex',
              gap: 0.5,
              overflow: 'hidden',
              width: '100%',
              justifyContent: 'space-evenly'
            }}>
              {photos.slice(thumbnailOffset, thumbnailOffset + VISIBLE_THUMBNAILS).map((photo, index) => {
                const actualIndex = thumbnailOffset + index;
                const visibleCount = Math.min(VISIBLE_THUMBNAILS, photos.length - thumbnailOffset);
                const dynamicWidth = `calc((100% - ${(visibleCount - 1) * 4}px) / ${visibleCount})`; // Gap'leri hesaba kat
                
                return (
                  <Box
                    key={photo.id}
                    onClick={() => setCurrentIndex(actualIndex)}
                    sx={{
                      width: dynamicWidth,
                      minWidth: '40px',
                      maxWidth: '80px',
                      height: '50px',
                      borderRadius: 0.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: actualIndex === currentIndex ? '1px solid #ed9517' : '1px solid transparent',
                      position: 'relative',
                      flexShrink: 0,
                      '&:hover': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={`Fotoğraf ${actualIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* Photo Modal */}
      <PhotoModal
        open={modalOpen}
        onClose={closeModal}
        photos={photos}
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

// Property Info Panel Component - StepSix ile aynı görünüm
const PropertyInfoPanel = ({ listingType, title, price, city, district, neighborhood, details, listing, pinnedListings, onPinListing }: {
  listingType: string;
  title: string;
  price: string;
  city: string;
  district: string;
  neighborhood: string;
  details: any;
  listing: any;
  pinnedListings: any[];
  onPinListing?: (listing: any) => void;
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
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#059669" }}>
        {formatPrice(price)} TL
        {listingType === "RENT" && (
          <Typography component="span" sx={{ fontSize: 16, ml: 0.5, color: "#64748b" }}>
            /ay
          </Typography>
        )}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b", fontSize: '16px' }}>
          {title}
        </Typography>
        
        {/* Pin butonu */}
        <IconButton
          onClick={() => onPinListing?.(listing)}
          sx={{
            width: 32,
            height: 32,
            opacity: pinnedListings.some(p => p.id === listing.id) ? 1 : 0.7,
            color: pinnedListings.some(p => p.id === listing.id) ? '#ed9517' : '#64748b',
            '&:hover': {
              color: '#ed9517',
              opacity: 1,
              transform: 'scale(1.1)'
            }
          }}
        >
          <PushPin sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
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

// Checkbox Feature Component - StepSix ile aynı
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

// Feature Categories Component - StepSix ile aynı görünüm
const FeatureCategories = ({ details }: { details: any }) => (
  <Grid container spacing={1}>
    {FEATURE_CATEGORIES.map((category, index) => (
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

// Location Panel Component - StepSix ile aynı görünüm
const LocationPanel = ({ latitude, longitude, city, district, neighborhood }: {
  latitude: number | null;
  longitude: number | null;
  city: string;
  district: string;
  neighborhood: string;
}) => (
  <Box sx={{
    height: 400,
    border: "1px solid #e2e8f0",
    borderRadius: 1,
    backgroundColor: "#f8fafc",
    position: 'relative',
    overflow: 'hidden'
  }}>
    {latitude && longitude ? (
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`}
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: 4 }}
      />
    ) : (
      <Box sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#64748b'
      }}>
        <LocationOn sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
        <Typography sx={{ fontSize: '12px', mt: 0.5, opacity: 0.7 }}>
          Konum bilgisi mevcut değil
        </Typography>
      </Box>
    )}
  </Box>
);

// Tabbed Panel Component - StepSix ile aynı görünüm
const TabbedPanel = ({ details, latitude, longitude, city, district, neighborhood }: {
  details: any;
  latitude: number | null;
  longitude: number | null;
  city: string;
  district: string;
  neighborhood: string;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ mt: 3 }}>
      {/* Custom Tab Headers */}
      <Box sx={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        mb: 3
      }}>
        <Box
          onClick={() => setActiveTab(0)}
          sx={{
            px: 3,
            py: 2,
            cursor: 'pointer',
            borderBottom: activeTab === 0 ? '2px solid #475569' : 'none',
            color: activeTab === 0 ? '#1e293b' : '#64748b',
            fontWeight: activeTab === 0 ? 600 : 400,
            fontSize: '14px',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#1e293b'
            }
          }}
        >
          Ek Özellikler
        </Box>
        <Box
          onClick={() => setActiveTab(1)}
          sx={{
            px: 3,
            py: 2,
            cursor: 'pointer',
            borderBottom: activeTab === 1 ? '2px solid #475569' : 'none',
            color: activeTab === 1 ? '#1e293b' : '#64748b',
            fontWeight: activeTab === 1 ? 600 : 400,
            fontSize: '14px',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#1e293b'
            }
          }}
        >
          Konum
        </Box>
      </Box>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && <FeatureCategories details={details} />}
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
};

// Main Component - StepSix ile aynı görünüm
export default function ListingDetailHouse({
  listing, pinnedListings, onUnpinListing, onPinListing
}: ListingDetailHouseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Box sx={{ width: "100%", 
        mx: "auto", 
        fontFamily: "sans-serif", 
        p: 2, 
        mb: 2,         
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: '1px solid #d3d3d3'
     }}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <PhotoGallery photos={listing.photos || []} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </Grid>
        <Grid item xs={12} md={5}>
          <PropertyInfoPanel
            listingType={listing.listingType}
            title={listing.title}
            price={listing.price}
            city={listing.city}
            district={listing.district}
            neighborhood={listing.neighborhood}
            details={listing.details}
            listing={listing}
            pinnedListings={pinnedListings}
            onPinListing={onPinListing}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 3,
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            borderBottom: "1px solid #e5e7eb",
            px: 2,
            py: 1,
            background: "#f9fafb",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "13px",
              color: "#1e293b",
            }}
          >
            Açıklama
          </Typography>
        </Box>

        {/* Body */}
        <Box
          dangerouslySetInnerHTML={{ __html: listing.description }}
          sx={{
            fontSize: "12px",
            color: "#374151",
            lineHeight: 1.4,
            px: 2,
            py: 1.5,
            whiteSpace: "pre-line",
            "& p": { margin: "0 0 8px 0" },
          }}
        />
      </Box>

      {/* Tab'li Panel: Ek Özellikler / Konum */}
      <TabbedPanel
        details={listing.details}
        latitude={listing.latitude}
        longitude={listing.longitude}
        city={listing.city}
        district={listing.district}
        neighborhood={listing.neighborhood}
      />
    </Box>
  );
}
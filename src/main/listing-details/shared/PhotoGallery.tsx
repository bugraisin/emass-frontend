import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal, Backdrop } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close, Fullscreen } from "@mui/icons-material";

interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function PhotoGallery({ photos, currentIndex, setCurrentIndex }: PhotoGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [thumbnailOffset, setThumbnailOffset] = useState(0);

  const VISIBLE_THUMBNAILS = 18; // 2 sıra x 9 thumbnail = 18 thumbnail

  // Güvenli index hesaplama
  const safeCurrentIndex = currentIndex >= 0 && currentIndex < (photos?.length || 0) ? currentIndex : 0;

  const handlePrev = () => {
    if (!photos || photos.length <= 1) return;
    const newIndex = safeCurrentIndex === 0 ? photos.length - 1 : safeCurrentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (!photos || photos.length <= 1) return;
    const newIndex = safeCurrentIndex === photos.length - 1 ? 0 : safeCurrentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleThumbnailPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setThumbnailOffset(Math.max(0, thumbnailOffset - VISIBLE_THUMBNAILS));
  };

  const handleThumbnailNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const maxOffset = Math.max(0, (photos?.length || 0) - VISIBLE_THUMBNAILS);
    setThumbnailOffset(Math.min(maxOffset, thumbnailOffset + VISIBLE_THUMBNAILS));
  };

  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Keyboard navigation - hem modal açıkken hem de kapalıyken çalışır
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!photos || photos.length <= 1) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'Escape':
          if (modalOpen) {
            event.preventDefault();
            closeModal();
          }
          break;
      }
    };

    // Event listener'ı her zaman ekle (modal durumuna bakma)
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [photos, safeCurrentIndex, modalOpen]); // modalOpen dependency'e eklendi

  // Güvenlik kontrolü
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
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

  const currentPhoto = photos[safeCurrentIndex];

  if (!currentPhoto || !currentPhoto.url) {
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
        <Typography sx={{ color: '#64748b' }}>Fotoğraf yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Ana container - birleşik panel */}
      <Box sx={{
        width: '100%',
        border: '1px solid #e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        {/* Ana fotoğraf */}
        <Box sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
              src={currentPhoto.url}
              alt="ilan"
              key={currentPhoto.id} // Key eklendi re-render için
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: 'block'
              }}
            />

            <Box
              className="fullscreen-icon"
              sx={{
                position: 'absolute',
                top: 15,
                left: 15,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                borderRadius: 1.5,
                padding: '8px',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
            >
              <Fullscreen fontSize="small" />
            </Box>
          </Box>

          {/* Ana fotoğraf navigation okları */}
          {photos.length > 1 && (
            <>
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }} 
                sx={{
                  position: "absolute", 
                  top: "50%", 
                  left: 15, 
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.7)", 
                  color: "#fff", 
                  borderRadius: 2,
                  "&:hover": { background: "rgba(0,0,0,0.9)" },
                  zIndex: 3,
                  width: 40,
                  height: 40
                }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }} 
                sx={{
                  position: "absolute", 
                  top: "50%", 
                  right: 15, 
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.7)", 
                  color: "#fff", 
                  borderRadius: 2,
                  "&:hover": { background: "rgba(0,0,0,0.9)" },
                  zIndex: 3,
                  width: 40,
                  height: 40
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </>
          )}

          {/* Fotoğraf sayacı */}
          {photos.length > 1 && (
            <Box sx={{
              position: 'absolute',
              top: 15,
              right: 15,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 2,
              fontSize: 13,
              fontWeight: 600,
              zIndex: 2
            }}>
              {safeCurrentIndex + 1} / {photos.length}
            </Box>
          )}
        </Box>

        {/* Alt thumbnail paneli - 2 sıra */}
        {photos.length > 1 && (
          <Box sx={{
            width: '100%',
            backgroundColor: '#f3f4f6',
            borderBottom: '1px solid #e5e7eb',
            borderLeft: '1px solid #e5e7eb',
            borderRight: '1px solid #e5e7eb',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            boxShadow: '0 4px 12px rgba(148,163,184,0.10)',
            p: 0.5,
          }}>
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center',
            }}>
              {/* Sol ok */}
              {thumbnailOffset > 0 && (
                <IconButton
                  onClick={handleThumbnailPrev}
                  sx={{
                    position: 'absolute',
                    left: -8,
                    zIndex: 10,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    width: 26,
                    height: 26,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                >
                  <ArrowBackIos fontSize="small" sx={{ fontSize: 12 }} />
                </IconButton>
              )}

              {/* Sağ ok */}
              {thumbnailOffset + VISIBLE_THUMBNAILS < photos.length && (
                <IconButton
                  onClick={handleThumbnailNext}
                  sx={{
                    position: 'absolute',
                    right: -8,
                    zIndex: 10,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    width: 26,
                    height: 26,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                >
                  <ArrowForwardIos fontSize="small" sx={{ fontSize: 12 }} />
                </IconButton>
              )}

              {/* Thumbnail listesi - 2 sıra */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.6,
                overflow: 'hidden',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                px: 1
              }}>
                {/* Üst sıra - İlk 9 thumbnail */}
                <Box sx={{
                  display: 'flex',
                  gap: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {photos.slice(thumbnailOffset, thumbnailOffset + 9).map((photo, index) => {
                    const actualIndex = thumbnailOffset + index;
                    
                    if (!photo || !photo.url || !photo.id) return null;
                    
                    return (
                      <Box
                        key={`top-${photo.id}-${actualIndex}`}
                        onClick={(e) => handleThumbnailClick(e, actualIndex)}
                        sx={{
                          width: '70px',
                          height: '45px',
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: actualIndex === safeCurrentIndex ? '2px solid #ed9517' : '1px solid rgba(0,0,0,0.15)',
                          flexShrink: 0,
                          zIndex: 5,
                          '&:hover': {
                            border: '2px solid #ed9517',
                          },
                          transition: 'border 0.2s ease'
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

                {/* Alt sıra - İkinci 9 thumbnail */}
                {photos.length > thumbnailOffset + 9 && (
                  <Box sx={{
                    display: 'flex',
                    gap: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {photos.slice(thumbnailOffset + 9, thumbnailOffset + 18).map((photo, index) => {
                      const actualIndex = thumbnailOffset + 9 + index;
                      
                      if (!photo || !photo.url || !photo.id) return null;
                      
                      return (
                        <Box
                          key={`bottom-${photo.id}-${actualIndex}`}
                          onClick={(e) => handleThumbnailClick(e, actualIndex)}
                          sx={{
                            width: '70px',
                            height: '45px',
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: actualIndex === safeCurrentIndex ? '2px solid #ed9517' : '1px solid rgba(0,0,0,0.15)',
                            flexShrink: 0,
                            zIndex: 5,
                            '&:hover': {
                              border: '2px solid #ed9517',
                            },
                            transition: 'border 0.2s ease'
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
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
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
          <IconButton
            onClick={closeModal}
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

          <Box sx={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={currentPhoto.url}
              alt={`Fotoğraf ${safeCurrentIndex + 1}`}
              key={`modal-${currentPhoto.id}`} // Modal için ayrı key
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 8
              }}
            />

            {photos.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
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
                <IconButton
                  onClick={handleNext}
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
              </>
            )}
          </Box>

          {/* Modal'da thumbnail çubuğu */}
          {photos.length > 1 && (
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 1
            }}>
              <Box sx={{
                display: 'flex',
                gap: 0.5,
                overflowX: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.4)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(255,255,255,0.6)',
                },
              }}>
                {photos.map((photo, index) => {
                  if (!photo || !photo.url || !photo.id) return null;
                  
                  return (
                    <Box
                      key={`modal-thumb-${photo.id}`}
                      onClick={() => setCurrentIndex(index)}
                      sx={{
                        width: '60px',
                        height: '40px',
                        borderRadius: 1,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: index === safeCurrentIndex ? '2px solid #ed9517' : '2px solid rgba(255,255,255,0.3)',
                        flexShrink: 0,
                        '&:hover': {
                          border: '2px solid #ed9517',
                        },
                        transition: 'border 0.2s ease'
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={`Fotoğraf ${index + 1}`}
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
          )}

          {/* Fotoğraf sayacı modal'da */}
          <Box sx={{
            position: 'absolute',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 2,
            fontSize: 14
          }}>
            {safeCurrentIndex + 1} / {photos.length}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
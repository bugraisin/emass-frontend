import React, { useState } from "react";
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

  const THUMBNAIL_WIDTH = 55;
  const VISIBLE_THUMBNAILS = 8;

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
      <Box sx={{
        position: "relative",
        width: "100%",
        height: "380px",
        minHeight: "400px",
        maxHeight: "400px",
        overflow: "hidden",
        borderRadius: 2,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
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

        {photos.length > 1 && (
          <>
            <IconButton onClick={handlePrev} sx={{
              position: "absolute", top: "50%", left: 15, transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.7)", color: "#fff", borderRadius: 2,
              "&:hover": { background: "rgba(0,0,0,0.9)" },
              zIndex: 3,
              width: 40,
              height: 40
            }}>
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton onClick={handleNext} sx={{
              position: "absolute", top: "50%", right: 15, transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.7)", color: "#fff", borderRadius: 2,
              "&:hover": { background: "rgba(0,0,0,0.9)" },
              zIndex: 3,
              width: 40,
              height: 40
            }}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </>
        )}

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
            fontWeight: 600
          }}>
            {currentIndex + 1} / {photos.length}
          </Box>
        )}

        {photos.length > 1 && (
          <Box sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            backgroundColor: 'black',
            borderRadius: 1,
            padding: 0.5,
            zIndex: 2
          }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: '40px' }}>
              {thumbnailOffset > 0 && (
                <IconButton
                  onClick={handleThumbnailPrev}
                  sx={{
                    position: 'absolute',
                    left: -3,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 4,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    width: 24,
                    height: 24,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                >
                  <ArrowBackIos fontSize="small" sx={{ fontSize: 12 }} />
                </IconButton>
              )}

              {thumbnailOffset + VISIBLE_THUMBNAILS < photos.length && (
                <IconButton
                  onClick={handleThumbnailNext}
                  sx={{
                    position: 'absolute',
                    right: -3,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 4,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    width: 24,
                    height: 24,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                >
                  <ArrowForwardIos fontSize="small" sx={{ fontSize: 12 }} />
                </IconButton>
              )}

              <Box sx={{
                display: 'flex',
                gap: 0.5,
                overflow: 'hidden',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {photos.slice(thumbnailOffset, thumbnailOffset + Math.min(7, photos.length)).map((photo, index) => {
                  const actualIndex = thumbnailOffset + index;
                  
                  return (
                    <Box
                      key={photo.id}
                      onClick={() => setCurrentIndex(actualIndex)}
                      sx={{
                        width: '50px',
                        height: '35px',
                        borderRadius: 0.5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: actualIndex === currentIndex ? '1.5px solid #ed9517' : '1.5px solid rgba(255,255,255,0.3)',
                        position: 'relative',
                        flexShrink: 0,
                        '&:hover': {
                          border: '1.5px solid rgba(255,255,255,0.8)',
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
                      {actualIndex === currentIndex && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(237, 149, 23, 0.3)'
                        }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

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
              src={photos[currentIndex].url}
              alt={`Fotoğraf ${currentIndex + 1}`}
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
    </>
  );
}
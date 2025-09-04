import React, { useState, useRef } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    IconButton,
    Dialog,
    DialogContent,
    Alert
} from '@mui/material';
import {
    CloudUpload,
    Close,
    PhotoCamera
} from '@mui/icons-material';

interface Photo {
    id: string;
    file: File;
    url: string;
    isMain: boolean;
}

interface StepFourProps {
    photos: Photo[];
    setPhotos: (photos: Photo[]) => void;
}

export default function StepFour({ photos, setPhotos }: StepFourProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    // Ana fotoğraf otomatik olarak ilk sıradaki
    const updateMainPhoto = (newPhotos: Photo[]) => {
        return newPhotos.map((photo, index) => ({
            ...photo,
            isMain: index === 0
        }));
    };

    // Fotoğraf yükleme
    const handleFileSelect = async (files: FileList | null) => {
        if (!files) return;

        const maxFileSize = 5 * 1024 * 1024; // 5MB (backend ile uyumlu)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        const filesToProcess = Array.from(files);
        const newPhotos: Photo[] = [];

        for (const file of filesToProcess) {
            // Dosya türü kontrolü
            if (!allowedTypes.includes(file.type)) {
                alert(`${file.name}: Desteklenmeyen dosya türü. Sadece JPG, PNG ve WebP dosyaları yükleyebilirsiniz.`);
                continue;
            }

            // Dosya boyutu kontrolü
            if (file.size > maxFileSize) {
                alert(`${file.name}: Dosya boyutu çok büyük. En fazla 5MB olmalı.`);
                continue;
            }

            // Dosyanın gerçekten geçerli bir resim olduğunu kontrol et
            const isValidImage = await new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    // Minimum boyut kontrolü (çok küçük resimler geçersiz olabilir)
                    if (img.width < 50 || img.height < 50) {
                        alert(`${file.name}: Resim çok küçük. En az 50x50 piksel olmalı.`);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                };
                img.onerror = () => {
                    alert(`${file.name}: Geçersiz resim dosyası.`);
                    resolve(false);
                };
                img.src = URL.createObjectURL(file);
            });

            if (!isValidImage) {
                continue;
            }

            const photoId = Date.now().toString() + Math.random().toString();
            const photoUrl = URL.createObjectURL(file);

            newPhotos.push({
                id: photoId,
                file: file,
                url: photoUrl,
                isMain: false // updateMainPhoto fonksiyonu bunu ayarlayacak
            });
        }

        if (newPhotos.length > 0) {
            setPhotos(updateMainPhoto([...photos, ...newPhotos]));
        }
    };

    // Drag & Drop event handlers for file upload
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragOver(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleFileDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        
        const files = e.dataTransfer.files;
        await handleFileSelect(files);
    };

    // Photo drag & drop sorting handlers
    const handlePhotoDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', ''); // For Firefox compatibility
    };

    const handlePhotoDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    };

    const handlePhotoDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOverIndex(null);
    };

    const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();
        setDragOverIndex(null);
        
        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        const newPhotos = [...photos];
        const draggedPhoto = newPhotos[draggedIndex];
        
        // Remove dragged photo from its current position
        newPhotos.splice(draggedIndex, 1);
        
        // Insert at new position
        newPhotos.splice(dropIndex, 0, draggedPhoto);
        
        setPhotos(updateMainPhoto(newPhotos));
        setDraggedIndex(null);
    };

    const handlePhotoDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    // Fotoğraf silme
    const handleDeletePhoto = (photoId: string) => {
        const updatedPhotos = photos.filter(p => p.id !== photoId);
        setPhotos(updateMainPhoto(updatedPhotos));
    };

    // Fotoğrafa tıklayınca önizleme aç
    const handlePhotoClick = (photo: Photo) => {
        setPreviewPhoto(photo);
    };

    return (
        <Box sx={{ 
            width: "100%", 
            mt: 1,
            maxHeight: 'none',
            overflowY: 'visible',
        }}>
            <Card sx={{ 
                borderRadius: 2,
                boxShadow: 2,
                border: '1px solid rgba(0, 0, 0, 0.12)',
                mb: 3
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#1e293b',
                        fontSize: '16px',
                        mb: 2
                    }}>
                        İlan Fotoğrafları
                    </Typography>

                    {/* Fotoğraf yükleme alanı */}
                    <Box
                        sx={{
                            border: isDragOver ? '2px solid #3b82f6' : '2px dashed #cbd5e1',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            mb: 3,
                            backgroundColor: isDragOver ? '#eff6ff' : '#f8fafc',
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: '#1e293b',
                                backgroundColor: '#f1f5f9'
                            }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleFileDrop}
                    >
                        <CloudUpload sx={{ 
                            fontSize: 48, 
                            color: '#64748b',
                            mb: 1
                        }} />
                        <Typography variant="h6" sx={{ 
                            color: '#1e293b',
                            fontSize: '16px',
                            fontWeight: 600,
                            mb: 1
                        }}>
                            Fotoğraf Yükle
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            color: '#64748b',
                            fontSize: '14px'
                        }}>
                            Bilgisayarınızdan fotoğraf seçin veya sürükleyip bırakın
                        </Typography>
                        <Typography variant="caption" sx={{ 
                            color: '#94a3b8',
                            fontSize: '12px',
                            display: 'block',
                            mt: 1
                        }}>
                            JPG, PNG, WebP • En fazla 10MB
                        </Typography>
                    </Box>

                    {/* Gizli file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={async (e) => await handleFileSelect(e.target.files)}
                        style={{ display: 'none' }}
                    />

                    {/* Fotoğraf listesi */}
                    {photos.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" sx={{ 
                                fontWeight: 600,
                                color: '#1e293b',
                                fontSize: '15px',
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <PhotoCamera sx={{ fontSize: 18 }} />
                                Yüklenen Fotoğraflar ({photos.length})
                            </Typography>

                            <Grid container spacing={2}>
                                {photos.map((photo, index) => (
                                    <Grid item xs={6} sm={4} md={3} key={photo.id}>
                                        <Card
                                            draggable
                                            onDragStart={(e) => handlePhotoDragStart(e, index)}
                                            onDragOver={(e) => handlePhotoDragOver(e, index)}
                                            onDragLeave={handlePhotoDragLeave}
                                            onDrop={(e) => handlePhotoDrop(e, index)}
                                            onDragEnd={handlePhotoDragEnd}
                                            sx={{
                                                position: 'relative',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                border: photo.isMain ? '3px solid #1e293b' : dragOverIndex === index && draggedIndex !== index ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                                cursor: 'grab',
                                                opacity: draggedIndex === index ? 0.5 : 1,
                                                '&:hover': {
                                                    border: photo.isMain ? '2px solid #1e293b' : '1px solid #64748b'
                                                },
                                                '&:active': {
                                                    cursor: 'grabbing'
                                                }
                                            }}
                                        >
                                            {/* Silme butonu - sağ üstte çarpı */}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeletePhoto(photo.id);
                                                }}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    color: 'white',
                                                    width: 24,
                                                    height: 24,
                                                    zIndex: 2,
                                                    '&:hover': { 
                                                        backgroundColor: 'rgba(220, 38, 38, 0.8)'
                                                    }
                                                }}
                                            >
                                                <Close sx={{ fontSize: 14 }} />
                                            </IconButton>

                                            {/* Fotoğraf - tıklanabilir */}
                                            <img
                                                src={photo.url}
                                                alt={`Fotoğraf ${index + 1}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePhotoClick(photo);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '150px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Yardım metni */}
                            <Box sx={{ 
                                mt: 3, 
                                p: 2, 
                                backgroundColor: '#f1f5f9',
                                borderRadius: 1,
                                border: '1px solid #e2e8f0'
                            }}>
                                <Typography variant="caption" sx={{ 
                                    color: '#64748b',
                                    fontSize: '13px',
                                    display: 'block',
                                    mb: 1
                                }}>
                                    💡 İpuçları:
                                </Typography>
                                <Typography variant="caption" sx={{ 
                                    color: '#64748b',
                                    fontSize: '12px',
                                    lineHeight: 1.5
                                }}>
                                    • Fotoğrafları sürükleyip bırakarak sırasını değiştirebilirsiniz<br />
                                    • İlk sıradaki fotoğraf ana fotoğraf ve kapak fotoğrafı olacaktır<br />
                                    • Fotoğrafa tıklayarak büyük görüntüleyebilirsiniz<br />
                                    • Kaliteli ve net fotoğraflar ilanınızın daha çok ilgi görmesini sağlar
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Fotoğraf önizleme modal */}
            <Dialog
                open={!!previewPhoto}
                onClose={() => setPreviewPhoto(null)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { 
                        borderRadius: 2,
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }
                }}
            >
                <DialogContent sx={{ 
                    p: 0, 
                    position: 'relative',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Kapat butonu - sağ üstte */}
                    <IconButton
                        onClick={() => setPreviewPhoto(null)}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            zIndex: 1000,
                            width: 40,
                            height: 40,
                            '&:hover': { 
                                backgroundColor: 'rgba(220, 38, 38, 0.8)'
                            }
                        }}
                    >
                        <Close sx={{ fontSize: 20 }} />
                    </IconButton>

                    {previewPhoto && (
                        <img
                            src={previewPhoto.url}
                            alt="Önizleme"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '8px'
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
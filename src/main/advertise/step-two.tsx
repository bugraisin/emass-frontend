import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    IconButton,
    InputAdornment,
    Divider,
    Slide,
    Fade,
    Zoom
} from '@mui/material';
import {
    LocationOn,
    Search,
    Close,
    KeyboardArrowRight,
    ArrowBack
} from '@mui/icons-material';

interface StepTwoProps {
    listingType: string;
    propertyType: string;
    subtype: string;
    // Temel bilgiler
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    price: string;
    setPrice: (value: string) => void;
    city: string;
    setCity: (value: string) => void;
    district: string;
    setDistrict: (value: string) => void;
    neighborhood: string;
    setNeighborhood: (value: string) => void;
}

export default function StepTwo({ 
    listingType, 
    propertyType, 
    subtype,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    city,
    setCity,
    district,
    setDistrict,
    neighborhood,
    setNeighborhood
}: StepTwoProps) {

    // Backend verileri için state'ler
    const [cities, setCities] = useState<{id: string, name: string}[]>([]);
    const [districts, setDistricts] = useState<{id: string, name: string, provinceId: string}[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<{id: string, name: string, subdistrictId: string}[]>([]);

    // Modal state'leri
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [addressStep, setAddressStep] = useState(0); // 0: şehir, 1: ilçe, 2: mahalle
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const BASE_URL = "http://localhost:8080/api/location";

    // Şehirleri yükle
    useEffect(() => {
        fetch(`${BASE_URL}/provinces`)
            .then(r => r.json())
            .then((data: {id: string, name: string}[]) => setCities(data))
            .catch(console.error);
    }, []);

    // Şehir değiştiğinde ilçeleri yükle
    useEffect(() => {
        if (city) {
            const selectedCity = cities.find(c => c.name === city);
            if (selectedCity) {
                fetch(`${BASE_URL}/${selectedCity.id}/districts`)
                    .then(r => r.json())
                    .then((data: {id: string, name: string, provinceId: string}[]) => {
                        setDistricts(data);
                        setNeighborhoods([]);
                        setNeighborhood('');
                    })
                    .catch(console.error);
            }
        } else {
            setDistricts([]);
            setNeighborhoods([]);
        }
    }, [city, cities]);

    // İlçe değiştiğinde mahalleleri yükle
    useEffect(() => {
        if (district) {
            const selectedDistrict = districts.find(d => d.name === district);
            if (selectedDistrict) {
                fetch(`${BASE_URL}/${selectedDistrict.id}/subdistricts`)
                    .then(r => r.json())
                    .then((subdistricts: {id: string, name: string, districtId: string}[]) => {
                        return Promise.all(
                            subdistricts.map(subdistrict =>
                                fetch(`${BASE_URL}/${subdistrict.id}/neighborhoods`).then(r => r.json())
                            )
                        );
                    })
                    .then((neighborhoodParts: {id: string, name: string, subdistrictId: string}[][]) => {
                        const mergedNeighborhoods = Array.from(
                            new Map(neighborhoodParts.flat().map(n => [n.id, n])).values()
                        );
                        setNeighborhoods(mergedNeighborhoods);
                    })
                    .catch(console.error);
            }
        } else {
            setNeighborhoods([]);
        }
    }, [district, districts]);

    // Arama fonksiyonu
    const normalizeText = (text: string) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ğ/gi, 'g')
            .replace(/ü/gi, 'u')
            .replace(/ş/gi, 's')
            .replace(/ı/gi, 'i')
            .replace(/ö/gi, 'o')
            .replace(/ç/gi, 'c')
            .trim();
    };

    const filterItems = (items: any[], search: string) => {
        if (!search) return items;
        
        const searchNormalized = normalizeText(search);
        
        return items.filter(item => {
            const itemNormalized = normalizeText(item.name);
            const itemOriginal = item.name.toLowerCase();
            
            return itemNormalized.includes(searchNormalized) || 
                   itemOriginal.includes(search.toLowerCase());
        }).sort((a, b) => {
            const aNorm = normalizeText(a.name);
            const bNorm = normalizeText(b.name);
            const searchNorm = normalizeText(search);
            
            const aStarts = aNorm.startsWith(searchNorm);
            const bStarts = bNorm.startsWith(searchNorm);
            
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            
            return a.name.localeCompare(b.name, 'tr');
        });
    };

    // Multi-step address modal render fonksiyonu
    const renderAddressModal = () => {
        const steps = ['Şehir Seçin', 'İlçe Seçin', 'Mahalle Seçin'];
        let currentItems: any[] = [];
        let currentTitle = steps[addressStep];
        
        if (addressStep === 0) {
            currentItems = cities;
        } else if (addressStep === 1) {
            currentItems = districts;
        } else if (addressStep === 2) {
            currentItems = neighborhoods;
        }

        const handleSelect = (item: any) => {
            setIsAnimating(true);
            
            setTimeout(() => {
                if (addressStep === 0) {
                    // Şehir seçildi
                    setCity(item.name);
                    setDistrict('');
                    setNeighborhood('');
                    setAddressStep(1); // İlçe adımına geç
                    setSearchTerm('');
                } else if (addressStep === 1) {
                    // İlçe seçildi
                    setDistrict(item.name);
                    setNeighborhood('');
                    setAddressStep(2); // Mahalle adımına geç
                    setSearchTerm('');
                } else if (addressStep === 2) {
                    // Mahalle seçildi
                    setNeighborhood(item.name);
                    setOpenAddressModal(false);
                    setAddressStep(0); // Reset
                    setSearchTerm('');
                }
                
                setTimeout(() => {
                    setIsAnimating(false);
                }, 150);
            }, 75);
        };

        const handleBack = () => {
            if (addressStep > 0) {
                setIsAnimating(true);
                
                setTimeout(() => {
                    setAddressStep(addressStep - 1);
                    setSearchTerm('');
                    
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 150);
                }, 75);
            }
        };

        const handleClose = () => {
            setOpenAddressModal(false);
            setAddressStep(0);
            setSearchTerm('');
        };

        return (
            <Dialog 
                open={openAddressModal} 
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        boxShadow: '0 20px 60px rgba(237, 149, 23, 0.15)',
                        border: '2px solid #fef3c7',
                        width: '100%',
                        maxWidth: '600px',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    py: 3
                }}>
                    <Fade in={!isAnimating} timeout={200}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {currentTitle}
                        </Typography>
                    </Fade>
                    
                    {/* Back butonu */}
                    {addressStep > 0 && (
                        <Zoom in={addressStep > 0} timeout={250}>
                            <IconButton
                                onClick={handleBack}
                                sx={{ 
                                    position: 'absolute', 
                                    left: 16, 
                                    top: 16,
                                    color: '#cbd5e1',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { 
                                        background: 'rgba(203, 213, 225, 0.1)',
                                        color: 'white',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        </Zoom>
                    )}
                    
                    {/* Close butonu */}
                    <IconButton
                        onClick={handleClose}
                        sx={{ 
                            position: 'absolute', 
                            right: 16, 
                            top: 16,
                            color: '#cbd5e1',
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                                background: 'rgba(203, 213, 225, 0.1)',
                                color: 'white',
                                transform: 'scale(1.1) rotate(90deg)'
                            }
                        }}
                    >
                        <Close />
                    </IconButton>
                    
                    {/* Progress indicator */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mt: 2, 
                        gap: 1 
                    }}>
                        {steps.map((_, index) => (
                            <Zoom 
                                key={index}
                                in={true} 
                                timeout={200 + (index * 50)}
                                style={{ transitionDelay: `${index * 25}ms` }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: index <= addressStep ? '#ed9517' : 'rgba(203, 213, 225, 0.4)',
                                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: index <= addressStep ? 'scale(1.2)' : 'scale(1)',
                                        boxShadow: index <= addressStep ? '0 0 8px rgba(237, 149, 23, 0.6)' : 'none'
                                    }}
                                />
                            </Zoom>
                        ))}
                    </Box>
                </DialogTitle>
                
                <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                    <Fade in={!isAnimating} timeout={200}>
                        <Box sx={{ p: 3, pb: 2 }}>
                            <TextField
                                fullWidth
                                placeholder={`${currentTitle.toLowerCase()} ara...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: '#64748b' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        '&:hover fieldset': { borderColor: '#475569' },
                                        '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                                }}
                            />
                        </Box>
                    </Fade>
                    
                    <Divider />
                    
                    <Box sx={{ 
                        height: 500,
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%'
                    }}>
                        <Slide 
                            direction="left" 
                            in={!isAnimating} 
                            timeout={250}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <Box sx={{ width: '100%', height: '100%' }}>
                                <List sx={{ 
                                    height: '100%',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#f1f5f9',
                                        borderRadius: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                                        }
                                    }
                                }}>
                                {filterItems(currentItems, searchTerm).map((item, index) => (
                                    <Zoom 
                                        key={item.id}
                                        in={!isAnimating} 
                                        timeout={200 + (index * 25)}
                                        style={{ transitionDelay: `${index * 15}ms` }}
                                    >
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={() => handleSelect(item)}
                                                sx={{
                                                    py: 2,
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                                    }
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ 
                                                        background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                                                        width: 32,
                                                        height: 32,
                                                        transition: 'all 0.2s ease'
                                                    }}>
                                                        <LocationOn sx={{ fontSize: 18, color: 'white' }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText 
                                                    primary={item.name}
                                                    primaryTypographyProps={{
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#334155'
                                                    }}
                                                />
                                                <KeyboardArrowRight sx={{ 
                                                    color: '#475569',
                                                    transition: 'all 0.2s ease'
                                                }} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Zoom>
                                ))}
                                {filterItems(currentItems, searchTerm).length === 0 && (
                                    <Fade in={!isAnimating} timeout={200}>
                                        <ListItem>
                                            <ListItemText 
                                                primary="Sonuç bulunamadı"
                                                sx={{ textAlign: 'center', color: '#6b7280' }}
                                            />
                                        </ListItem>
                                    </Fade>
                                )}
                            </List>
                        </Box>
                    </Slide>
                </Box>
                </DialogContent>
            </Dialog>
        );
    };

    const renderBasicInfo = () => (
        <Card sx={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 4,
            border: 'none',
            position: 'relative',
            overflow: 'visible',
            mb: 3,
            minHeight: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1e293b, #334155, #475569)',
                borderRadius: '4px 4px 0 0'
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #e2e8f0'
                }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: '#1e293b',
                        fontSize: '1.3rem'
                    }}>
                        Temel Bilgiler
                    </Typography>
                </Box>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="İlan Başlığı"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            placeholder="Örn: Merkezi Konumda 3+1 Satılık Daire"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#475569',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1e293b',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1e293b',
                                },
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Açıklama"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            placeholder="İlanınız hakkında detaylı bilgi verin..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#475569',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1e293b',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1e293b',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fiyat (₺)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="0"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#475569',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1e293b',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1e293b',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                                setAddressStep(0);
                                setOpenAddressModal(true);
                            }}
                            sx={{
                                height: 56,
                                borderRadius: 3,
                                border: '2px solid #e5e7eb',
                                color: (city && district && neighborhood) ? '#1e293b' : '#64748b',
                                borderColor: '#e5e7eb',
                                background: 'white',
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                justifyContent: 'space-between',
                                px: 2,
                                '&:hover': {
                                    borderColor: '#475569',
                                    background: '#f8fafc',
                                    color: '#1e293b'
                                },
                                '&:focus': {
                                    borderColor: '#1e293b',
                                    boxShadow: '0 0 0 3px rgba(71, 85, 105, 0.1)',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOn sx={{ color: '#64748b' }} />
                                <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                                    {(city && district && neighborhood) 
                                        ? `${city}, ${district}, ${neighborhood}` 
                                        : 'Adres Seçiniz'}
                                </Typography>
                            </Box>
                            <KeyboardArrowRight sx={{ color: '#ed9517' }} />
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column",
            gap: 3, 
            width: "100%", 
            padding: '16px 24px',
            backgroundColor: 'transparent',
            maxHeight: '80vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f5f9',
                borderRadius: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'linear-gradient(180deg, #ed9517 0%, #d97706 100%)',
                borderRadius: '12px',
                '&:hover': {
                    background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
                }
            },
            '@keyframes float': {
                '0%, 100%': {
                    transform: 'perspective(1000px) rotateX(2deg) translateY(0px)'
                },
                '50%': {
                    transform: 'perspective(1000px) rotateX(2deg) translateY(-5px)'
                }
            }
        }}>
            {renderBasicInfo()}
            
            {/* Tek Address Modal */}
            {renderAddressModal()}
        </Box>
    );
}

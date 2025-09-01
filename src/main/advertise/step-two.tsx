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
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    InputAdornment,
    Divider
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
    const [addressStep, setAddressStep] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const BASE_URL = "http://localhost:8080/api/location";

    const formatNumber = (value: string, cursorPosition?: number): { formattedValue: string, newCursorPosition: number } => {
        const numbers = value.replace(/\D/g, '');
        if (!numbers) return { formattedValue: '', newCursorPosition: 0 };
        
        const formatted = new Intl.NumberFormat('tr-TR').format(parseInt(numbers));
        
        // Cursor pozisyonunu hesapla
        let newCursorPosition = cursorPosition || formatted.length;
        if (cursorPosition !== undefined) {
            // Cursor'dan önceki rakam sayısını bul
            const beforeCursor = value.slice(0, cursorPosition);
            const numbersBeforeCursor = beforeCursor.replace(/\D/g, '').length;
            
            // Formatted string'de aynı rakam sayısına karşılık gelen pozisyonu bul
            let count = 0;
            newCursorPosition = 0;
            for (let i = 0; i < formatted.length; i++) {
                if (/\d/.test(formatted[i])) {
                    count++;
                    if (count > numbersBeforeCursor) break;
                }
                newCursorPosition = i + 1;
            }
        }
        
        return { formattedValue: formatted, newCursorPosition };
    };

    const parseNumber = (formattedValue: string): string => {
        // Noktaları kaldır, sadece rakamları döndür
        return formattedValue.replace(/\./g, '');
    };

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
            if (addressStep === 0) {
                // Şehir seçildi
                setCity(item.name);
                setDistrict('');
                setNeighborhood('');
                setAddressStep(1);
                setSearchTerm('');
            } else if (addressStep === 1) {
                // İlçe seçildi
                setDistrict(item.name);
                setNeighborhood('');
                setAddressStep(2);
                setSearchTerm('');
            } else if (addressStep === 2) {
                // Mahalle seçildi
                setNeighborhood(item.name);
                setOpenAddressModal(false);
                setAddressStep(0);
                setSearchTerm('');
            }
        };

        const handleBack = () => {
            if (addressStep > 0) {
                setAddressStep(addressStep - 1);
                setSearchTerm('');
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
                        borderRadius: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        border: '1px solid #e5e7eb',
                        width: '100%',
                        maxWidth: '500px'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    backgroundColor: '#fff',
                    color: '#334155',
                    textAlign: 'center',
                    position: 'relative',
                    fontWeight: 600,
                    fontSize: '18px',
                    py: 0.5,
                }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#334155', letterSpacing: '0.5px', m: 1 }}>
                        {currentTitle}
                    </Typography>
                    
                    {/* Back butonu */}
                    {addressStep > 0 && (
                        <IconButton
                            onClick={handleBack}
                            sx={{ 
                                position: 'absolute', 
                                left: 12, 
                                top: 12,
                                color: '#94a3b8',
                                p: 0.5,
                                '&:hover': { backgroundColor: 'transparent' }
                            }}
                        >
                            <ArrowBack sx={{ fontSize: '18px' }} />
                        </IconButton>
                    )}
                    
                    {/* Close butonu */}
                    <IconButton
                        onClick={handleClose}
                        sx={{ 
                            position: 'absolute', 
                            right: 12, 
                            top: 12,
                            color: '#94a3b8',
                            p: 0.5,
                            '&:hover': { backgroundColor: 'transparent' }
                        }}
                    >
                        <Close sx={{ fontSize: '18px' }} />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ p: 1.5 }}>
                        <TextField
                            fullWidth
                            placeholder={`${currentTitle.replace(' Seçin', '')} ara`}
                            value={searchTerm}
                            autoComplete='off'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#64748b', fontSize: '20px' }} />
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    background: '#f8fafc',
                                    minHeight: '28px',
                                    padding: '2px 8px',
                                    boxShadow: 'none',
                                    borderWidth: '1px',
                                    '& fieldset': { borderWidth: '1px' },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '6px 8px',
                                        fontSize: '13px',
                                    },
                                    '&:hover fieldset': { borderColor: '#e5e7eb', borderWidth: '1.2px' },
                                    '&.Mui-focused fieldset': { borderColor: '#334155', borderWidth: '1.2px' }
                                },
                                '& .MuiInputLabel-root': { fontSize: '12px', color: '#64748b' }
                            }}
                        />
                    </Box>
                    
                    <Divider />
                    
                    <Box sx={{ height: 450, overflow: 'hidden' }}>
                        <List sx={{ 
                            height: '100%',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f8fafc',
                                borderRadius: '2px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#e5e7eb',
                                borderRadius: '2px',
                                '&:hover': {
                                    background: '#cbd5e1',
                                }
                            }
                        }}>
                            {filterItems(currentItems, searchTerm).map((item) => (
                                <ListItem disablePadding key={item.id}>
                                    <ListItemButton
                                        onClick={() => handleSelect(item)}
                                        sx={{
                                            py: 1,
                                            px: 1.5,
                                            borderRadius: 1,
                                            '&:hover': {
                                                backgroundColor: '#f1f5f9'
                                            }
                                        }}
                                    >
                                        <LocationOn sx={{ 
                                            mr: 1.2, 
                                            color: '#94a3b8', 
                                            fontSize: '16px' 
                                        }} />
                                        <ListItemText 
                                            primary={item.name}
                                            primaryTypographyProps={{
                                                fontWeight: 400,
                                                fontSize: '13px',
                                                color: '#334155'
                                            }}
                                        />
                                        <KeyboardArrowRight sx={{ 
                                            color: '#94a3b8',
                                            fontSize: '16px'
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            {filterItems(currentItems, searchTerm).length === 0 && (
                                <ListItem>
                                    <ListItemText 
                                        primary="Sonuç bulunamadı"
                                        sx={{ 
                                            textAlign: 'center', 
                                            color: '#94a3b8',
                                            fontSize: '13px'
                                        }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    };

    const renderBasicInfo = () => (
        <Card sx={{ 
            borderRadius: 2,
            boxShadow: 2,
            border: '1px solid rgba(0, 0, 0, 0.12)',
            mb: 3
        }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '16px',
                    mb: 3
                }}>
                    Temel Bilgiler
                </Typography>
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="İlan Başlığı"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                            autoComplete='off'
                            placeholder="Örn: Merkezi Konumda 3+1 Satılık Daire"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' }
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' }
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={8}
                            label="Açıklama"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            autoComplete='off'
                            placeholder="İlanınız hakkında detaylı bilgi verin..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' }
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fiyat (₺)"
                            value={formatNumber(price).formattedValue}
                            onChange={(e) => {
                                const input = e.target;
                                const cursorPosition = input.selectionStart || 0;
                                const rawValue = parseNumber(e.target.value);
                                
                                setPrice(rawValue);
                                
                                // Cursor pozisyonunu güncelle
                                setTimeout(() => {
                                    const { newCursorPosition } = formatNumber(rawValue, cursorPosition);
                                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                                }, 0);
                            }}
                            variant="outlined"
                            placeholder="0"
                            autoComplete='off'
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' }
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' }
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
                                height: 40,
                                borderRadius: 1,
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                color: (city && district && neighborhood) ? '#1e293b' : '#64748b',
                                textTransform: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                justifyContent: 'space-between',
                                px: 2,
                                '&:hover': {
                                    borderColor: '#1e293b',
                                    backgroundColor: 'rgba(30, 41, 59, 0.1)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOn sx={{ color: '#64748b', fontSize: '18px' }} />
                                <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
                                    {(city && district && neighborhood) 
                                        ? `${city}, ${district}, ${neighborhood}` 
                                        : 'Adres Seçiniz'}
                                </Typography>
                            </Box>
                            <KeyboardArrowRight sx={{ color: '#64748b', fontSize: '18px' }} />
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ 
            width: "100%",
            mt: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f5f9',
                borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#cbd5e1',
                borderRadius: '3px',
                '&:hover': {
                    background: '#94a3b8',
                }
            }
        }}>
            {renderBasicInfo()}
            {renderAddressModal()}
        </Box>
    );
}
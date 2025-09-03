import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem, Select, FormControl, List, ListItem, ListItemButton, Radio, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface HousingDetailsProps {
    selectedCategory: string;
    onDetailsChange?: (detailsData: any) => void;
}

export default forwardRef<any, HousingDetailsProps>(function HousingDetails({ selectedCategory, onDetailsChange }, ref) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'room' | 'age' | 'heating' | 'facade' | 'floor' | 'totalFloor' | 'Temel Özellikler' | 'Otopark' | 'Bina & Güvenlik' | 'Konfor & Isıtma' | 'Mutfak & İç Mekan' | 'Site İmkanları' | null>(null);
    
    // Form states
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [selectedTotalFloors, setSelectedTotalFloors] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedHeatingTypes, setSelectedHeatingTypes] = useState<string[]>([]);
    const [selectedFacadeTypes, setSelectedFacadeTypes] = useState<string[]>([]);
    
    // Min-Max states for areas and fees
    const [netAreaMin, setNetAreaMin] = useState<string>('');
    const [netAreaMax, setNetAreaMax] = useState<string>('');
    const [siteFeeMin, setSiteFeeMin] = useState<string>('');
    const [siteFeeMax, setSiteFeeMax] = useState<string>('');
    const [depositMin, setDepositMin] = useState<string>('');
    const [depositMax, setDepositMax] = useState<string>('');
    
    // Boolean features organized by categories
    const [features, setFeatures] = useState<Record<string, boolean>>({
        // Temel Özellikler
        furnished: false,
        balcony: false,
        terrace: false,
        garden: false,
        withinSite: false,
        // Otopark
        openPark: false,
        closedPark: false,
        garagePark: false,
        // Bina & Güvenlik
        elevator: false,
        security: false,
        concierge: false,
        generator: false,
        // Konfor & Isıtma
        airConditioning: false,
        floorHeating: false,
        fireplace: false,
        // Mutfak & İç Mekan
        builtinKitchen: false,
        separateKitchen: false,
        americanKitchen: false,
        laundryRoom: false,
        // Site İmkanları
        pool: false,
        gym: false,
        childrenPlayground: false,
        sportsArea: false
    });

    // Konut detaylarını döndüren fonksiyon
    const getHousingDetails = () => {
        const housingData = {
            roomCount: selectedRooms,
            floors: selectedFloors,
            totalFloors: selectedTotalFloors,
            buildingAges: selectedBuildingAges,
            heatingTypes: selectedHeatingTypes,
            facadeTypes: selectedFacadeTypes,
            netAreaMin: netAreaMin,
            netAreaMax: netAreaMax,
            siteFeeMin: siteFeeMin,
            siteFeeMax: siteFeeMax,
            depositMin: depositMin,
            depositMax: depositMax,
            features: features
        };
        console.log('🏠 Housing Details verisi alınıyor:', housingData);
        return housingData;
    };

    // Parent'a getDetails fonksiyonunu expose et
    useImperativeHandle(ref, () => ({
        getDetails: getHousingDetails
    }));

    const featureCategories = [
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

    const roomOptions = [
        "1+0", "1+1", "2+1", "2+2", "3+1", "3+2", 
        "4+1", "4+2", "5+1", "5+2", "6+1", "7+"
    ];

    const floorOptions = [
        "-1", "0", "1", "2", "3", "4", "5", 
        "6", "7", "8", "9", "10", "11-15", "16-20", "21+"
    ];

    const totalFloorOptions = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
        "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const heatingOptions = [
        { value: "DOGALGAZ", label: "Doğalgaz" },
        { value: "KOMBI", label: "Kombi" },
        { value: "KALORIFER", label: "Kalorifer" },
        { value: "KLIMA", label: "Klima" },
        { value: "SOBALI", label: "Sobali" },
        { value: "YOK", label: "Yok" }
    ];

    const ageRanges = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const facadeOptions = [
        { value: "KUZEY", label: "Kuzey" },
        { value: "GUNEY", label: "Güney" },
        { value: "DOGU", label: "Doğu" },
        { value: "BATI", label: "Batı" },
        { value: "KUZEY_DOGU", label: "Kuzey-Doğu" },
        { value: "KUZEY_BATI", label: "Kuzey-Batı" },
        { value: "GUNEY_DOGU", label: "Güney-Doğu" },
        { value: "GUNEY_BATI", label: "Güney-Batı" }
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const formatNumber = (value: string) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const cleanNumber = (value: string) => {
        return value.replace(/[^0-9]/g, '');
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'room' | 'age' | 'heating' | 'facade' | 'floor' | 'totalFloor' | 'Temel Özellikler' | 'Otopark' | 'Bina & Güvenlik' | 'Konfor & Isıtma' | 'Mutfak & İç Mekan' | 'Site İmkanları') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const toggleRoom = (room: string) => {
        setSelectedRooms(prev => {
            if (prev.includes(room)) {
                return prev.filter(r => r !== room);
            } else {
                return [...prev, room];
            }
        });
    };

    const toggleFloor = (floor: string) => {
        setSelectedFloors(prev => {
            if (prev.includes(floor)) {
                return prev.filter(f => f !== floor);
            } else {
                return [...prev, floor];
            }
        });
    };

    const toggleTotalFloor = (floor: string) => {
        setSelectedTotalFloors(prev => {
            if (prev.includes(floor)) {
                return prev.filter(f => f !== floor);
            } else {
                return [...prev, floor];
            }
        });
    };

    const toggleBuildingAge = (age: string) => {
        setSelectedBuildingAges(prev => {
            if (prev.includes(age)) {
                return prev.filter(a => a !== age);
            } else {
                return [...prev, age];
            }
        });
    };

    const toggleHeatingType = (heating: string) => {
        setSelectedHeatingTypes(prev => {
            if (prev.includes(heating)) {
                return prev.filter(h => h !== heating);
            } else {
                return [...prev, heating];
            }
        });
    };

    const toggleFacadeType = (facade: string) => {
        setSelectedFacadeTypes(prev => {
            if (prev.includes(facade)) {
                return prev.filter(f => f !== facade);
            } else {
                return [...prev, facade];
            }
        });
    };

    const open = Boolean(anchorEl);

    const getSelectedFeaturesCount = () => {
        return Object.values(features).filter(f => f).length;
    };

    const getAreaDisplayText = (min: string, max: string) => {
        if (min && max) return `${min} - ${max} m²`;
        if (min) return `${min}+ m²`;
        if (max) return `${max} m²'ye kadar`;
        return '';
    };

    const getFeeDisplayText = (min: string, max: string) => {
        if (min && max) return `${min} - ${max} ₺`;
        if (min) return `${min}+ ₺`;
        if (max) return `${max} ₺'ye kadar`;
        return '';
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 1 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Konut Detayları
                </Typography>

                {/* Oda + Salon Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'room')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'room' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'room' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'room' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Oda + Salon
                        </Typography>
                        {selectedRooms.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedRooms.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                
                {/* Net Metrekare Min-Max */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "12px", mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
                        Net Metrekare
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Min"
                            value={netAreaMin}
                            onChange={(e) => setNetAreaMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={netAreaMax}
                            onChange={(e) => setNetAreaMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    </Box>
                </Box>

                {/* Bulunduğu Kat Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'floor')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'floor' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'floor' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'floor' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Bulunduğu Kat
                        </Typography>
                        {selectedFloors.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedFloors.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Toplam Kat Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'totalFloor')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'totalFloor' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'totalFloor' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'totalFloor' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Toplam Kat
                        </Typography>
                        {selectedTotalFloors.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedTotalFloors.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Bina Yaşı Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'age')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'age' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'age' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'age' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Bina Yaşı
                        </Typography>
                        {selectedBuildingAges.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedBuildingAges.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                                {/* Aidat Min-Max */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "12px", mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
                        Aidat
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Min ₺"
                            value={siteFeeMin}
                            onChange={(e) => setSiteFeeMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>-</Typography>
                        <TextField
                            placeholder="Max ₺"
                            value={siteFeeMax}
                            onChange={(e) => setSiteFeeMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    </Box>
                </Box>

                {/* Depozito Min-Max */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "12px", mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
                        Depozito
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Min ₺"
                            value={depositMin}
                            onChange={(e) => setDepositMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>-</Typography>
                        <TextField
                            placeholder="Max ₺"
                            value={depositMax}
                            onChange={(e) => setDepositMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{ 
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '13px',
                                    height: '32px'
                                }
                            }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    </Box>
                </Box>

                {/* Isıtma Türü Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'heating')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'heating' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'heating' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'heating' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Isıtma Türü
                        </Typography>
                        {selectedHeatingTypes.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedHeatingTypes.map(type => heatingOptions.find(h => h.value === type)?.label).join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Cephe Yönü Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'facade')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        backgroundColor: popoverType === 'facade' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'facade' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'facade' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Cephe Yönü
                        </Typography>
                        {selectedFacadeTypes.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedFacadeTypes.map(type => facadeOptions.find(f => f.value === type)?.label).join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Feature Category Panels */}
                {featureCategories.map((category) => (
                    <Box 
                        key={category.title}
                        onClick={(e) => handlePopoverOpen(e, category.title as any)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginBottom: '6px',
                            minHeight: '36px',
                            backgroundColor: popoverType === category.title && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                            borderColor: popoverType === category.title && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                            '&:hover': {
                                backgroundColor: popoverType === category.title && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "13px" }}>
                                {category.title}
                            </Typography>
                            {category.features.some(feature => features[feature.key]) && (
                                <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {category.features.filter(feature => features[feature.key]).length} özellik seçili
                                </Typography>
                            )}
                        </Box>
                        <ChevronRightIcon sx={{ fontSize: "16px" }} />
                    </Box>
                ))}

                {/* Popover Panel */}
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    disableAutoFocus={false}
                    disableEnforceFocus={false}
                    disableRestoreFocus={false}
                    keepMounted={false}
                    hideBackdrop={false}
                    aria-hidden={false}
                    sx={{
                        '& .MuiPopover-paper': {
                            marginLeft: '8px',
                            minWidth: '280px',
                            maxHeight: '400px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        },
                        '& .MuiModal-root': {
                            '&[aria-hidden="true"]': {
                                visibility: 'hidden'
                            }
                        }
                    }}
                >
                    <Paper 
                        sx={{ padding: '12px' }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="popover-title"
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Typography 
                                id="popover-title"
                                variant="h6" 
                                sx={{ fontSize: '14px', fontWeight: 600, flex: 1 }}
                            >
                                {popoverType === 'room' && 'Oda + Salon Seçin'}
                                {popoverType === 'floor' && 'Bulunduğu Kat Seçin'}
                                {popoverType === 'totalFloor' && 'Toplam Kat Seçin'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'heating' && 'Isıtma Türü Seçin'}
                                {popoverType === 'facade' && 'Cephe Yönü Seçin'}
                                {featureCategories.map(cat => cat.title).includes(popoverType as string) && popoverType}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Oda Seçimi Listesi */}
                        {popoverType === 'room' && (
                            <List sx={{ padding: 0 }}>
                                {roomOptions.map((room) => (
                                    <ListItem disablePadding key={room} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleRoom(room)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedRooms.includes(room)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{room}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Individual Feature Category Lists */}
                        {featureCategories.map((category) => {
                            if (popoverType === category.title) {
                                return (
                                    <List key={category.title} sx={{ padding: 0 }}>
                                        {category.features.map((feature) => (
                                            <ListItem disablePadding key={feature.key} sx={{ p: 0 }}>
                                                <ListItemButton 
                                                    onClick={() => handleFeatureChange(feature.key)} 
                                                    sx={{
                                                        p: '4px 8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: '4px',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={features[feature.key] || false}
                                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                                    />
                                                    <Typography sx={{ fontSize: '13px', m: 0 }}>{feature.label}</Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                );
                            }
                            return null;
                        })}

                        {/* Bulunduğu Kat Seçimi Listesi */}
                        {popoverType === 'floor' && (
                            <List sx={{ padding: 0 }}>
                                {floorOptions.map((floor) => (
                                    <ListItem disablePadding key={floor} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleFloor(floor)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedFloors.includes(floor)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{floor}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Toplam Kat Seçimi Listesi */}
                        {popoverType === 'totalFloor' && (
                            <List sx={{ padding: 0 }}>
                                {totalFloorOptions.map((floor) => (
                                    <ListItem disablePadding key={floor} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleTotalFloor(floor)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedTotalFloors.includes(floor)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{floor}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Bina Yaşı Listesi */}
                        {popoverType === 'age' && (
                            <List sx={{ padding: 0 }}>
                                {ageRanges.map((age) => (
                                    <ListItem disablePadding key={age} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleBuildingAge(age)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedBuildingAges.includes(age)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{age}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Isıtma Türü Listesi */}
                        {popoverType === 'heating' && (
                            <List sx={{ padding: 0 }}>
                                {heatingOptions.map((heating) => (
                                    <ListItem disablePadding key={heating.value} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleHeatingType(heating.value)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedHeatingTypes.includes(heating.value)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{heating.label}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Cephe Yönü Listesi */}
                        {popoverType === 'facade' && (
                            <List sx={{ padding: 0 }}>
                                {facadeOptions.map((facade) => (
                                    <ListItem disablePadding key={facade.value} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleFacadeType(facade.value)} 
                                            sx={{
                                                p: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={selectedFacadeTypes.includes(facade.value)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{facade.label}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                    </Paper>
                </Popover>
            </CardContent>
        </Card>
    );
});
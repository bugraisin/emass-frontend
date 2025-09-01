import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface IndustrialDetailsProps {
    selectedCategory: string;
}

export default function IndustrialDetails({ selectedCategory }: IndustrialDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'totalArea' | 'age' | 'temperature' | 'ceilingHeight' | 'Altyapı & Enerji' | 'Üretim & İmalat' | 'Depolama & Lojistik' | 'Güvenlik & Sistem' | null>(null);
    
    // Form states - multiple choice
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedTemperatureRanges, setSelectedTemperatureRanges] = useState<string[]>([]);
    const [selectedCeilingHeights, setSelectedCeilingHeights] = useState<string[]>([]);
    
    // Min-Max states for area and ceiling height
    const [areaMin, setAreaMin] = useState<string>('');
    const [areaMax, setAreaMax] = useState<string>('');
    const [ceilingHeightMin, setCeilingHeightMin] = useState<string>('');
    const [ceilingHeightMax, setCeilingHeightMax] = useState<string>('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        // Altyapı & Enerji
        threephaseElectricity: false,
        naturalGasLine: false,
        steamLine: false,
        waterSystem: false,
        wasteWaterSystem: false,
        // Üretim & İmalat
        craneSystem: false,
        ventilationSystem: false,
        airConditioning: false,
        wideOpenArea: false,
        machineMountingSuitable: false,
        // Depolama & Lojistik
        loadingRamp: false,
        truckEntrance: false,
        forkliftTraffic: false,
        rackingSystem: false,
        coldStorage: false,
        // Güvenlik & Sistem
        fireExtinguishingSystem: false,
        securityCameras: false,
        alarmSystem: false,
        fencedArea: false,
        security: false,
        // Eski özellikler (uyumluluk için)
        crane: false,
        loadingDock: false,
        truckAccess: false,
        railwayAccess: false,
        fireSystem: false,
        powerSupply: false,
        administrativeOffice: false
    });

    const featureCategories = [
        {
            title: 'Altyapı & Enerji',
            features: [
                { key: 'threephaseElectricity', label: 'Üç Fazlı Elektrik' },
                { key: 'naturalGasLine', label: 'Doğalgaz Hattı' },
                { key: 'steamLine', label: 'Buhar Hattı' },
                { key: 'waterSystem', label: 'Su Sistemi' },
                { key: 'wasteWaterSystem', label: 'Atık Su Sistemi' },
            ]
        },
        {
            title: 'Üretim & İmalat',
            features: [
                { key: 'craneSystem', label: 'Vinç Sistemi' },
                { key: 'ventilationSystem', label: 'Havalandırma Sistemi' },
                { key: 'airConditioning', label: 'Klima Sistemi' },
                { key: 'wideOpenArea', label: 'Geniş Açık Alan' },
                { key: 'machineMountingSuitable', label: 'Makine Montajı Uygun' },
            ]
        },
        {
            title: 'Depolama & Lojistik',
            features: [
                { key: 'loadingRamp', label: 'Yükleme Rampası' },
                { key: 'truckEntrance', label: 'TIR Girişi' },
                { key: 'forkliftTraffic', label: 'Forklift Trafiği' },
                { key: 'rackingSystem', label: 'Raf Sistemi' },
                { key: 'coldStorage', label: 'Soğuk Depolama' },
            ]
        },
        {
            title: 'Güvenlik & Sistem',
            features: [
                { key: 'fireExtinguishingSystem', label: 'Yangın Söndürme Sistemi' },
                { key: 'securityCameras', label: 'Güvenlik Kameraları' },
                { key: 'alarmSystem', label: 'Alarm Sistemi' },
                { key: 'fencedArea', label: 'Çitli/Bariyerli Alan' },
                { key: 'security', label: 'Güvenlik' },
            ]
        }
    ];

    const ageRanges = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const areaRanges = [
        "500 m² - 1.000 m²",
        "1.000 m² - 2.500 m²", 
        "2.500 m² - 5.000 m²",
        "5.000 m² - 10.000 m²",
        "10.000 m² - 20.000 m²",
        "20.000 m² - 50.000 m²",
        "50.000 m² +"
    ];

    const temperatureRanges = [
        "+2°C / +8°C (Buzdolabı)",
        "-18°C / -25°C (Dondurucu)",
        "0°C / +4°C (Soğuk Hava)",
        "-40°C / -18°C (Derin Dondurucu)",
        "Kontrollü Sıcaklık"
    ];

    const ceilingHeightOptions = [
        "3-6 m",
        "6-10 m", 
        "10-15 m",
        "15 m+"
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'totalArea' | 'age' | 'temperature' | 'ceilingHeight' | 'Altyapı & Enerji' | 'Üretim & İmalat' | 'Depolama & Lojistik' | 'Güvenlik & Sistem') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const toggleAreaRange = (range: string) => {
        setSelectedAreaRanges(prev => {
            if (prev.includes(range)) {
                return prev.filter(r => r !== range);
            } else {
                return [...prev, range];
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

    const toggleTemperatureRange = (temp: string) => {
        setSelectedTemperatureRanges(prev => {
            if (prev.includes(temp)) {
                return prev.filter(t => t !== temp);
            } else {
                return [...prev, temp];
            }
        });
    };

    const toggleCeilingHeight = (height: string) => {
        setSelectedCeilingHeights(prev => {
            if (prev.includes(height)) {
                return prev.filter(h => h !== height);
            } else {
                return [...prev, height];
            }
        });
    };

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Endüstriyel Detayları
                </Typography>

                {/* Metrekare Min-Max */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "12px", mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
                        Metrekare
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Min"
                            value={areaMin}
                            onChange={(e) => setAreaMin(e.target.value)}
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
                        
                        <Typography sx={{ fontSize: '13px', color: 'text.secondary', px: 0.5 }}>-</Typography>
                        
                        <TextField
                            placeholder="Max"
                            value={areaMax}
                            onChange={(e) => setAreaMax(e.target.value)}
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

                {/* Tavan Yüksekliği Min-Max */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "12px", mb: 0.5, fontWeight: 500, color: 'text.secondary' }}>
                        Tavan Yüksekliği (m)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            placeholder="Min"
                            value={ceilingHeightMin}
                            onChange={(e) => setCeilingHeightMin(e.target.value)}
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
                        
                        <Typography sx={{ fontSize: '13px', color: 'text.secondary', px: 0.5 }}>-</Typography>
                        
                        <TextField
                            placeholder="Max"
                            value={ceilingHeightMax}
                            onChange={(e) => setCeilingHeightMax(e.target.value)}
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

                {/* Sıcaklık Aralığı - sadece soğuk hava deposu için */}
                {selectedCategory.includes("SOGUK_HAVA_DEPOSU") && (
                    <Box 
                        onClick={(e) => handlePopoverOpen(e, 'temperature')}
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
                            backgroundColor: popoverType === 'temperature' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                            borderColor: popoverType === 'temperature' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                            '&:hover': {
                                backgroundColor: popoverType === 'temperature' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "13px" }}>
                                Sıcaklık Aralığı
                            </Typography>
                            {selectedTemperatureRanges.length > 0 && (
                                <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {selectedTemperatureRanges.join(', ')}
                                </Typography>
                            )}
                        </Box>
                        <ChevronRightIcon sx={{ fontSize: "16px" }} />
                    </Box>
                )}

                {/* Feature Categories */}
                {featureCategories.map((category) => (
                    <Box 
                        key={category.title}
                        onClick={(e) => handlePopoverOpen(e, category.title as 'Altyapı & Enerji' | 'Üretim & İmalat' | 'Depolama & Lojistik' | 'Güvenlik & Sistem')}
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
                    sx={{
                        '& .MuiPopover-paper': {
                            marginLeft: '8px',
                            minWidth: '280px',
                            maxHeight: '400px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        }
                    }}
                >
                    <Paper sx={{ padding: '12px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>
                                {popoverType === 'totalArea' && 'Toplam Alan Aralığı'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'ceilingHeight' && 'Tavan Yüksekliği Seçin'}
                                {popoverType === 'temperature' && 'Sıcaklık Aralığı Seçin'}
                                {popoverType === 'Altyapı & Enerji' && 'Altyapı & Enerji Özellikleri'}
                                {popoverType === 'Üretim & İmalat' && 'Üretim & İmalat Özellikleri'}
                                {popoverType === 'Depolama & Lojistik' && 'Depolama & Lojistik Özellikleri'}
                                {popoverType === 'Güvenlik & Sistem' && 'Güvenlik & Sistem Özellikleri'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Toplam Alan Aralığı Listesi */}
                        {popoverType === 'totalArea' && (
                            <List sx={{ padding: 0 }}>
                                {areaRanges.map((range) => (
                                    <ListItem disablePadding key={range} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleAreaRange(range)} 
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
                                                checked={selectedAreaRanges.includes(range)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{range}</Typography>
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

                        {/* Tavan Yüksekliği Listesi */}
                        {popoverType === 'ceilingHeight' && (
                            <List sx={{ padding: 0 }}>
                                {ceilingHeightOptions.map((height) => (
                                    <ListItem disablePadding key={height} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleCeilingHeight(height)} 
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
                                                checked={selectedCeilingHeights.includes(height)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{height}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Sıcaklık Aralığı Listesi */}
                        {popoverType === 'temperature' && (
                            <List sx={{ padding: 0 }}>
                                {temperatureRanges.map((temp) => (
                                    <ListItem disablePadding key={temp} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleTemperatureRange(temp)} 
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
                                                checked={selectedTemperatureRanges.includes(temp)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{temp}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Feature Categories Lists */}
                        {featureCategories.map((category) => 
                            popoverType === category.title && (
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
                                                    checked={features[feature.key]}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                                />
                                                <Typography sx={{ fontSize: '13px', m: 0 }}>{feature.label}</Typography>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            )
                        )}
                    </Paper>
                </Popover>
            </CardContent>
        </Card>
    );
}
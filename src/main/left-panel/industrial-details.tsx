import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface IndustrialDetailsProps {
    selectedCategory: string;
}

export default function IndustrialDetails({ selectedCategory }: IndustrialDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'totalArea' | 'age' | 'temperature' | 'features' | 'ceilingHeight' | 'powerCapacity' | null>(null);
    
    // Form states - multiple choice
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedTemperatureRanges, setSelectedTemperatureRanges] = useState<string[]>([]);
    const [selectedCeilingHeights, setSelectedCeilingHeights] = useState<string[]>([]);
    const [selectedPowerCapacities, setSelectedPowerCapacities] = useState<string[]>([]);
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        crane: false,
        loadingDock: false,
        truckAccess: false,
        railwayAccess: false,
        fireSystem: false,
        security: false,
        powerSupply: false,
        administrativeOffice: false
    });

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

    const powerCapacityOptions = [
        "50 kW altı",
        "50-200 kW",
        "200-500 kW", 
        "500 kW+"
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'totalArea' | 'age' | 'temperature' | 'features' | 'ceilingHeight' | 'powerCapacity') => {
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

    const togglePowerCapacity = (power: string) => {
        setSelectedPowerCapacities(prev => {
            if (prev.includes(power)) {
                return prev.filter(p => p !== power);
            } else {
                return [...prev, power];
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

                {/* Toplam Alan Aralığı */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'totalArea')}
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
                        backgroundColor: popoverType === 'totalArea' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'totalArea' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'totalArea' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Toplam Alan
                        </Typography>
                        {selectedAreaRanges.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedAreaRanges.join(', ')}
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

                {/* Tavan Yüksekliği */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'ceilingHeight')}
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
                        backgroundColor: popoverType === 'ceilingHeight' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'ceilingHeight' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'ceilingHeight' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Tavan Yüksekliği
                        </Typography>
                        {selectedCeilingHeights.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedCeilingHeights.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Güç Kapasitesi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'powerCapacity')}
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
                        backgroundColor: popoverType === 'powerCapacity' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'powerCapacity' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'powerCapacity' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Güç Kapasitesi
                        </Typography>
                        {selectedPowerCapacities.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedPowerCapacities.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
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

                {/* Özellikler Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'features')}
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
                        backgroundColor: popoverType === 'features' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'features' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'features' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Özellikler
                        </Typography>
                        {Object.values(features).some(f => f) && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {Object.values(features).filter(f => f).length} özellik seçili
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

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
                                {popoverType === 'powerCapacity' && 'Güç Kapasitesi Seçin'}
                                {popoverType === 'temperature' && 'Sıcaklık Aralığı Seçin'}
                                {popoverType === 'features' && 'Özellikler Seçin'}
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

                        {/* Güç Kapasitesi Listesi */}
                        {popoverType === 'powerCapacity' && (
                            <List sx={{ padding: 0 }}>
                                {powerCapacityOptions.map((power) => (
                                    <ListItem disablePadding key={power} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => togglePowerCapacity(power)} 
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
                                                checked={selectedPowerCapacities.includes(power)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{power}</Typography>
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

                        {/* Özellikler Listesi */}
                        {popoverType === 'features' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    { key: 'crane', label: 'Vinç' },
                                    { key: 'loadingDock', label: 'Yükleme Rampası' },
                                    { key: 'truckAccess', label: 'Kamyon Erişimi' },
                                    { key: 'railwayAccess', label: 'Demiryolu Erişimi' },
                                    { key: 'powerSupply', label: 'Güçlü Elektrik' },
                                    { key: 'fireSystem', label: 'Yangın Sistemi' },
                                    { key: 'security', label: '7/24 Güvenlik' },
                                    { key: 'administrativeOffice', label: 'İdari Ofis' }
                                ].map((feature) => (
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
                        )}
                    </Paper>
                </Popover>
            </CardContent>
        </Card>
    );
}
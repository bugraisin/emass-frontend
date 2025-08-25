import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem, Select, FormControl, List, ListItem, ListItemButton, Radio, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface IndustrialDetailsProps {
    selectedCategory: string;
}

export default function IndustrialDetails({ selectedCategory }: IndustrialDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'totalArea' | 'age' | 'temperature' | 'features' | null>(null);
    
    // Form states
    const [totalAreaRange, setTotalAreaRange] = useState<string>('');
    const [coveredArea, setCoveredArea] = useState<string>('');
    const [buildingAge, setBuildingAge] = useState<string>('');
    const [ceilingHeight, setCeilingHeight] = useState<string>('');
    const [powerCapacity, setPowerCapacity] = useState<string>('');
    const [craneCapacity, setCraneCapacity] = useState<string>('');
    const [loadingDockCount, setLoadingDockCount] = useState<string>('');
    const [temperatureRange, setTemperatureRange] = useState<string>('');
    const [productionLineCount, setProductionLineCount] = useState<string>('');
    const [officeArea, setOfficeArea] = useState<string>('');
    const [operatingCost, setOperatingCost] = useState<string>('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        crane: false,
        loadingDock: false,
        truckAccess: false,
        coldStorage: false,
        laboratory: false,
        fireSystem: false,
        security: false
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'totalArea' | 'age' | 'temperature' | 'features') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const selectAreaRange = (range: string) => {
        setTotalAreaRange(range);
        handlePopoverClose();
    };

    const selectAge = (age: string) => {
        setBuildingAge(age);
        handlePopoverClose();
    };

    const selectTemperature = (temp: string) => {
        setTemperatureRange(temp);
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    const getSubtypeSpecificFields = () => {
        // Depo özellikleri
        if (selectedCategory.includes("DEPO") || selectedCategory.includes("SOGUK_HAVA_DEPOSU")) {
            return (
                <>
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
                                {temperatureRange && (
                                    <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                        {temperatureRange}
                                    </Typography>
                                )}
                            </Box>
                            <ChevronRightIcon sx={{ fontSize: "16px" }} />
                        </Box>
                    )}
                </>
            );
        }

        // Fabrika özellikleri
        if (selectedCategory.includes("FABRIKA") || selectedCategory.includes("IMALATHANE") || selectedCategory.includes("URETIM_TESISI")) {
            return (
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                        label="Üretim Hattı Sayısı"
                        variant="outlined"
                        value={productionLineCount}
                        onChange={(e) => setProductionLineCount(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                    <TextField
                        label="Ofis Alanı (m²)"
                        variant="outlined"
                        value={officeArea}
                        onChange={(e) => setOfficeArea(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>
            );
        }

        return null;
    };

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
                        {totalAreaRange && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {totalAreaRange}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Kapalı Alan */}
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Kapalı Alan (m²)"
                        variant="outlined"
                        value={coveredArea ? formatNumber(coveredArea) : ''}
                        onChange={(e) => setCoveredArea(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
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
                        {buildingAge && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {buildingAge}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Tavan Yüksekliği ve Güç */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                        label="Tavan Yüksekliği (m)"
                        variant="outlined"
                        value={ceilingHeight}
                        onChange={(e) => setCeilingHeight(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                    <TextField
                        label="Güç Kapasitesi (kW)"
                        variant="outlined"
                        value={powerCapacity ? formatNumber(powerCapacity) : ''}
                        onChange={(e) => setPowerCapacity(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>

                {/* Vinç Kapasitesi - sadece vinç varsa */}
                {features.crane && (
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Vinç Kapasitesi (ton)"
                            variant="outlined"
                            value={craneCapacity}
                            onChange={(e) => setCraneCapacity(cleanNumber(e.target.value))}
                            size="small"
                            sx={{ 
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                    </Box>
                )}

                {/* Rampa Sayısı - sadece rampa varsa */}
                {features.loadingDock && (
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Rampa Sayısı"
                            variant="outlined"
                            value={loadingDockCount}
                            onChange={(e) => setLoadingDockCount(cleanNumber(e.target.value))}
                            size="small"
                            sx={{ 
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                    </Box>
                )}

                {/* Subtype spesifik alanlar */}
                {getSubtypeSpecificFields()}

                {/* İşletme Maliyeti */}
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Aylık İşletme Maliyeti (₺)"
                        variant="outlined"
                        value={operatingCost ? formatNumber(operatingCost) : ''}
                        onChange={(e) => setOperatingCost(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>

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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600 }}>
                                {popoverType === 'totalArea' && 'Toplam Alan Aralığı'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'temperature' && 'Sıcaklık Aralığı Seçin'}
                                {popoverType === 'features' && 'Özellikler Seçin'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small">
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Toplam Alan Aralığı Listesi */}
                        {popoverType === 'totalArea' && (
                            <List sx={{ padding: 0 }}>
                                {areaRanges.map((range) => (
                                    <ListItem disablePadding key={range} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => selectAreaRange(range)} 
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
                                            <Radio
                                                checked={totalAreaRange === range}
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
                                            onClick={() => selectAge(age)} 
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
                                            <Radio
                                                checked={buildingAge === age}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{age}</Typography>
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
                                            onClick={() => selectTemperature(temp)} 
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
                                            <Radio
                                                checked={temperatureRange === temp}
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
                                    { key: 'coldStorage', label: 'Soğuk Hava Deposu' },
                                    { key: 'laboratory', label: 'Laboratuvar' },
                                    { key: 'fireSystem', label: 'Yangın Sistemi' },
                                    { key: 'security', label: 'Güvenlik' }
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

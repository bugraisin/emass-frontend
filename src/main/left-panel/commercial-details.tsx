import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem, Select, FormControl, List, ListItem, ListItemButton, Radio, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface CommercialDetailsProps {
    selectedCategory: string;
}

export default function CommercialDetails({ selectedCategory }: CommercialDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'area' | 'age' | 'features' | null>(null);
    
    // Form states
    const [netAreaRange, setNetAreaRange] = useState<string>('');
    const [floorNo, setFloorNo] = useState<string>('');
    const [buildingAge, setBuildingAge] = useState<string>('');
    const [streetFrontage, setStreetFrontage] = useState<string>('');
    const [seatingCapacity, setSeatingCapacity] = useState<string>('');
    const [treatmentRoomCount, setTreatmentRoomCount] = useState<string>('');
    const [maintenanceFee, setMaintenanceFee] = useState<string>('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        furnished: false,
        airConditioning: false,
        parking: false,
        showcase: false,
        kitchen: false,
        outdoorSeating: false,
        liquorLicense: false,
        waitingArea: false
    });

    const ageRanges = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const netAreaRanges = [
        "25 m² - 50 m²",
        "50 m² - 100 m²", 
        "100 m² - 150 m²",
        "150 m² - 250 m²",
        "250 m² - 400 m²",
        "400 m² - 600 m²",
        "600 m² +"
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'area' | 'age' | 'features') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const selectAreaRange = (range: string) => {
        setNetAreaRange(range);
        handlePopoverClose();
    };

    const selectAge = (age: string) => {
        setBuildingAge(age);
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    const getSubtypeSpecificFields = () => {
        // Restaurant/Kafe/Bar özellikleri
        if (selectedCategory.includes("RESTAURANT") || selectedCategory.includes("KAFE") || selectedCategory.includes("BAR")) {
            return (
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Oturma Kapasitesi"
                        variant="outlined"
                        value={seatingCapacity}
                        onChange={(e) => setSeatingCapacity(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>
            );
        }

        // Güzellik salonu özellikleri
        if (selectedCategory.includes("GUZELLIK_SALONU") || selectedCategory.includes("BERBER_KUAFOR")) {
            return (
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Tedavi Odası Sayısı"
                        variant="outlined"
                        value={treatmentRoomCount}
                        onChange={(e) => setTreatmentRoomCount(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>
            );
        }

        return null;
    };

    const shouldShowShowcase = () => {
        return selectedCategory.includes("DUKKAN") || 
               selectedCategory.includes("MAGAZA") || 
               selectedCategory.includes("SHOWROOM");
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Ticari Detayları
                </Typography>

                {/* Net Metrekare Aralığı */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'area')}
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
                        backgroundColor: popoverType === 'area' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'area' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'area' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Net Metrekare
                        </Typography>
                        {netAreaRange && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {netAreaRange}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Kat No */}
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Kat No"
                        variant="outlined"
                        value={floorNo}
                        onChange={(e) => setFloorNo(cleanNumber(e.target.value))}
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

                {/* Vitrin cephesi - sadece dükkan/mağaza için */}
                {shouldShowShowcase() && (
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Sokak Cephesi (metre)"
                            variant="outlined"
                            value={streetFrontage}
                            onChange={(e) => setStreetFrontage(cleanNumber(e.target.value))}
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

                {/* Bakım Ücreti */}
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Aylık Bakım Ücreti (₺)"
                        variant="outlined"
                        value={maintenanceFee ? formatNumber(maintenanceFee) : ''}
                        onChange={(e) => setMaintenanceFee(cleanNumber(e.target.value))}
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
                                {popoverType === 'area' && 'Net Metrekare Aralığı'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'features' && 'Özellikler Seçin'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small">
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Net Metrekare Aralığı Listesi */}
                        {popoverType === 'area' && (
                            <List sx={{ padding: 0 }}>
                                {netAreaRanges.map((range) => (
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
                                                checked={netAreaRange === range}
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

                        {/* Özellikler Listesi */}
                        {popoverType === 'features' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    { key: 'furnished', label: 'Eşyalı' },
                                    { key: 'airConditioning', label: 'Klima' },
                                    { key: 'parking', label: 'Otopark' },
                                    ...(shouldShowShowcase() ? [{ key: 'showcase', label: 'Vitrin' }] : []),
                                    ...(selectedCategory.includes("RESTAURANT") || selectedCategory.includes("KAFE") || selectedCategory.includes("BAR") ? [
                                        { key: 'kitchen', label: 'Mutfak' },
                                        { key: 'outdoorSeating', label: 'Dış Mekan Oturma' },
                                        ...(selectedCategory.includes("BAR") ? [{ key: 'liquorLicense', label: 'Alkol Ruhsatı' }] : [])
                                    ] : []),
                                    ...(selectedCategory.includes("GUZELLIK_SALONU") || selectedCategory.includes("BERBER_KUAFOR") ? [
                                        { key: 'waitingArea', label: 'Bekleme Alanı' }
                                    ] : [])
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

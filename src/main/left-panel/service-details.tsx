import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem, Select, FormControl, List, ListItem, ListItemButton, Radio, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface ServiceDetailsProps {
    selectedCategory: string;
}

export default function ServiceDetails({ selectedCategory }: ServiceDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'totalArea' | 'coverType' | 'features' | null>(null);
    
    // Form states
    const [totalAreaRange, setTotalAreaRange] = useState<string>('');
    const [coveredArea, setCoveredArea] = useState<string>('');
    const [vehicleCapacity, setVehicleCapacity] = useState<string>('');
    const [coverType, setCoverType] = useState<string>('');
    const [heightLimit, setHeightLimit] = useState<string>('');
    const [changingRoomCount, setChangingRoomCount] = useState<string>('');
    const [showerCount, setShowerCount] = useState<string>('');
    const [washBayCount, setWashBayCount] = useState<string>('');
    const [liftCount, setLiftCount] = useState<string>('');
    const [liftCapacity, setLiftCapacity] = useState<string>('');
    const [pumpCount, setPumpCount] = useState<string>('');
    const [fuelTypes, setFuelTypes] = useState<string>('');
    const [operatingCost, setOperatingCost] = useState<string>('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        valetService: false,
        equipmentIncluded: false,
        sauna: false,
        automaticSystem: false,
        paintBooth: false,
        convenienceStore: false,
        security: false,
        lighting: false
    });

    const areaRanges = [
        "100 m² - 250 m²",
        "250 m² - 500 m²", 
        "500 m² - 1.000 m²",
        "1.000 m² - 2.500 m²",
        "2.500 m² - 5.000 m²",
        "5.000 m² - 10.000 m²",
        "10.000 m² +"
    ];

    const coverTypeOptions = [
        "KAPALI",
        "ACIK", 
        "YARIMKAPALI"
    ];

    const fuelTypeOptions = [
        "Benzin",
        "Motorin", 
        "LPG",
        "CNG",
        "Elektrik"
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'totalArea' | 'coverType' | 'features') => {
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

    const selectCoverType = (type: string) => {
        setCoverType(type);
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    const getSubtypeSpecificFields = () => {
        // Otopark özellikleri
        if (selectedCategory.includes("OTOPARK")) {
            return (
                <>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <TextField
                            label="Araç Kapasitesi"
                            variant="outlined"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(cleanNumber(e.target.value))}
                            size="small"
                            sx={{ 
                                flex: 1,
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                        <TextField
                            label="Yükseklik Sınırı (cm)"
                            variant="outlined"
                            value={heightLimit}
                            onChange={(e) => setHeightLimit(cleanNumber(e.target.value))}
                            size="small"
                            sx={{ 
                                flex: 1,
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                    </Box>
                    <Box 
                        onClick={(e) => handlePopoverOpen(e, 'coverType')}
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
                            backgroundColor: popoverType === 'coverType' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                            borderColor: popoverType === 'coverType' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                            '&:hover': {
                                backgroundColor: popoverType === 'coverType' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "13px" }}>
                                Kapalılık Durumu
                            </Typography>
                            {coverType && (
                                <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {coverType}
                                </Typography>
                            )}
                        </Box>
                        <ChevronRightIcon sx={{ fontSize: "16px" }} />
                    </Box>
                </>
            );
        }

        // Spor salonu özellikleri
        if (selectedCategory.includes("SPOR_SALONU")) {
            return (
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                        label="Soyunma Odası"
                        variant="outlined"
                        value={changingRoomCount}
                        onChange={(e) => setChangingRoomCount(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                    <TextField
                        label="Duş Sayısı"
                        variant="outlined"
                        value={showerCount}
                        onChange={(e) => setShowerCount(cleanNumber(e.target.value))}
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

        // Yıkama özellikleri
        if (selectedCategory.includes("YIKAMA")) {
            return (
                <Box sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Yıkama Bölmesi Sayısı"
                        variant="outlined"
                        value={washBayCount}
                        onChange={(e) => setWashBayCount(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Box>
            );
        }

        // Oto servis özellikleri
        if (selectedCategory.includes("OTO_SERVIS")) {
            return (
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                        label="Lift Sayısı"
                        variant="outlined"
                        value={liftCount}
                        onChange={(e) => setLiftCount(cleanNumber(e.target.value))}
                        size="small"
                        sx={{ 
                            flex: 1,
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                    <TextField
                        label="Lift Kapasitesi (ton)"
                        variant="outlined"
                        value={liftCapacity}
                        onChange={(e) => setLiftCapacity(cleanNumber(e.target.value))}
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

        // Benzin istasyonu özellikleri
        if (selectedCategory.includes("BENZIN_ISTASYONU")) {
            return (
                <>
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Pompa Sayısı"
                            variant="outlined"
                            value={pumpCount}
                            onChange={(e) => setPumpCount(cleanNumber(e.target.value))}
                            size="small"
                            sx={{ 
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Yakıt Türleri"
                            variant="outlined"
                            value={fuelTypes}
                            onChange={(e) => setFuelTypes(e.target.value)}
                            size="small"
                            placeholder="Örn: Benzin, Motorin, LPG"
                            sx={{ 
                                '& .MuiInputBase-root': { fontSize: '13px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' }
                            }}
                        />
                    </Box>
                </>
            );
        }

        return null;
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Hizmet Detayları
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
                                {popoverType === 'coverType' && 'Kapalılık Durumu'}
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

                        {/* Kapalılık Durumu Listesi */}
                        {popoverType === 'coverType' && (
                            <List sx={{ padding: 0 }}>
                                {coverTypeOptions.map((type) => (
                                    <ListItem disablePadding key={type} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => selectCoverType(type)} 
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
                                                checked={coverType === type}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{type}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Özellikler Listesi */}
                        {popoverType === 'features' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    ...(selectedCategory.includes("OTOPARK") ? [{ key: 'valetService', label: 'Vale Hizmeti' }] : []),
                                    ...(selectedCategory.includes("SPOR_SALONU") ? [
                                        { key: 'equipmentIncluded', label: 'Ekipman Dahil' },
                                        { key: 'sauna', label: 'Sauna' }
                                    ] : []),
                                    ...(selectedCategory.includes("YIKAMA") ? [{ key: 'automaticSystem', label: 'Otomatik Sistem' }] : []),
                                    ...(selectedCategory.includes("OTO_SERVIS") ? [{ key: 'paintBooth', label: 'Boya Kabini' }] : []),
                                    ...(selectedCategory.includes("BENZIN_ISTASYONU") ? [{ key: 'convenienceStore', label: 'Market' }] : []),
                                    { key: 'security', label: 'Güvenlik' },
                                    { key: 'lighting', label: 'Aydınlatma' }
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

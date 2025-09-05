import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface ServiceDetailsProps {
    selectedCategory: string;
}

export default forwardRef<any, ServiceDetailsProps>(function ServiceDetails({ selectedCategory }, ref) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'age' | 'coverType' | 'Temel Altyapı' | 'Hizmet Alanları' | 'Teknik Donanım' | 'Ek Hizmetler' | null>(null);
    
    // Form states - multiple choice
    const [selectedCoverTypes, setSelectedCoverTypes] = useState<string[]>([]);
    
    // Min-max inputs
    const [netAreaMin, setNetAreaMin] = useState('');
    const [netAreaMax, setNetAreaMax] = useState('');
    const [capacityMin, setCapacityMin] = useState('');
    const [capacityMax, setCapacityMax] = useState('');
    const [depositMin, setDepositMin] = useState('');
    const [depositMax, setDepositMax] = useState('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        // Temel Altyapı
        security: false,
        lighting: false,
        cctv: false,
        internet: false,
        // Hizmet Alanları
        reception: false,
        restRoom: false,
        kitchen: false,
        // Teknik Donanım
        washingArea: false,
        maintenanceArea: false,
        airConditioning: false,
        ventilationSystem: false,
        // Ek Hizmetler
        storage: false,
        officeArea: false,
        customerParking: false
    });

        // Service detaylarını döndüren fonksiyon
    const getServiceDetails = () => {
        const serviceData = {
            spaceTypes: selectedCoverTypes,
            netAreaMin: netAreaMin,
            netAreaMax: netAreaMax,
            minCapacity: capacityMin,
            maxCapacity: capacityMax, 
            minDeposit: depositMin,
            maxDeposit: depositMax,
            features: features
        };
        console.log('Service Details verisi alınıyor:', serviceData);
        return serviceData;
    };

    useImperativeHandle(ref, () => ({
        getDetails: getServiceDetails
    }));

    const coverTypeOptions = [
        "Kapalı",
        "Açık", 
        "Yarı Kapalı",
        "Karışık"
    ];

    const featureCategories = [
        {
            title: 'Temel Altyapı',
            features: [
                { key: 'security', label: 'Güvenlik' },
                { key: 'lighting', label: 'Aydınlatma' },
                { key: 'cctv', label: 'Güvenlik Kamerası' },
                { key: 'internet', label: 'İnternet' },
            ]
        },
        {
            title: 'Hizmet Alanları',
            features: [
                { key: 'reception', label: 'Resepsiyon' },
                { key: 'restRoom', label: 'Tuvalet' },
                { key: 'kitchen', label: 'Mutfak' },
            ]
        },
        {
            title: 'Teknik Donanım',
            features: [
                { key: 'washingArea', label: 'Yıkama Sistemi' },
                { key: 'maintenanceArea', label: 'Bakım/Onarım Alanı' },
                { key: 'airConditioning', label: 'Klima Sistemi' },
                { key: 'ventilationSystem', label: 'Havalandırma' },
            ]
        },
        {
            title: 'Ek Hizmetler',
            features: [
                { key: 'storage', label: 'Depolama Alanı' },
                { key: 'officeArea', label: 'Ofis Alanı' },
                { key: 'customerParking', label: 'Müşteri Otoparkı' },
            ]
        }
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'age' | 'coverType' | 'Temel Altyapı' | 'Hizmet Alanları' | 'Teknik Donanım' | 'Ek Hizmetler') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const toggleCoverType = (type: string) => {
        setSelectedCoverTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else {
                return [...prev, type];
            }
        });
    };

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Hizmet Detayları
                </Typography>

                {/* Net Metrekare */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "13px", mb: 1, fontWeight: 500 }}>
                        Net Metrekare (m²)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            placeholder="Min"
                            value={netAreaMin}
                            onChange={(e) => setNetAreaMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                        <Typography sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={netAreaMax}
                            onChange={(e) => setNetAreaMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                    </Box>
                </Box>

                {/* Kapasite */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "13px", mb: 1, fontWeight: 500 }}>
                        Kapasite
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            placeholder="Min"
                            value={capacityMin}
                            onChange={(e) => setCapacityMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                        <Typography sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={capacityMax}
                            onChange={(e) => setCapacityMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                    </Box>
                </Box>

                {/* Depozito */}
                <Box sx={{ marginBottom: '12px' }}>
                    <Typography sx={{ fontSize: "13px", mb: 1, fontWeight: 500 }}>
                        Depozito (₺)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            placeholder="Min"
                            value={depositMin}
                            onChange={(e) => setDepositMin(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                        <Typography sx={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={depositMax}
                            onChange={(e) => setDepositMax(e.target.value)}
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-input': { fontSize: '13px', padding: '6px 8px' },
                                '& .MuiOutlinedInput-root': { borderRadius: '4px' }
                            }}
                        />
                    </Box>
                </Box>

                {/* Kapalılık Durumu */}
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
                        {selectedCoverTypes.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedCoverTypes.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Feature Categories */}
                {featureCategories.map((category) => (
                    <Box 
                        key={category.title}
                        onClick={(e) => handlePopoverOpen(e, category.title as 'Temel Altyapı' | 'Hizmet Alanları' | 'Teknik Donanım' | 'Ek Hizmetler')}
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
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'coverType' && 'Kapalılık Durumu'}
                                {popoverType === 'Temel Altyapı' && 'Temel Altyapı Özellikleri'}
                                {popoverType === 'Hizmet Alanları' && 'Hizmet Alanları Özellikleri'}
                                {popoverType === 'Teknik Donanım' && 'Teknik Donanım Özellikleri'}
                                {popoverType === 'Ek Hizmetler' && 'Ek Hizmetler Özellikleri'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Kapalılık Durumu Listesi */}
                        {popoverType === 'coverType' && (
                            <List sx={{ padding: 0 }}>
                                {coverTypeOptions.map((type) => (
                                    <ListItem disablePadding key={type} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleCoverType(type)} 
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
                                                checked={selectedCoverTypes.includes(type)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{type}</Typography>
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
});
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface CommercialDetailsProps {
    selectedCategory: string;
}

export default forwardRef<any, CommercialDetailsProps>(function CommercialDetails({ selectedCategory }, ref) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'age' | 'floor' | 'heating' | 'Temel Özellikler' | 'Konfor & Sistem' | 'Ticari Özel Alanlar' | 'Müşteri Alanları' | null>(null);
    
    // Form states - multiple choice
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [selectedHeatingTypes, setSelectedHeatingTypes] = useState<string[]>([]);
    
    // Min-max inputs
    const [netAreaMin, setNetAreaMin] = useState('');
    const [netAreaMax, setNetAreaMax] = useState('');
    const [depositMin, setDepositMin] = useState('');
    const [depositMax, setDepositMax] = useState('');
    
    // Boolean features with all features from categories
    const [features, setFeatures] = useState<Record<string, boolean>>({
        // Temel Özellikler
        furnished: false,
        parking: false,
        security: false,
        elevator: false,
        generator: false,
        // Konfor & Sistem
        airConditioning: false,
        internet: false,
        kitchen: false,
        toilet: false,
        // Ticari Özel Alanlar
        showcase: false,
        warehouse: false,
        loadingDock: false,
        cashRegister: false,
        // Müşteri Alanları
        outdoorSeating: false,
        waitingArea: false,
        changingRoom: false
    });

    const getOfficeDetails = () => {
        const officeData = {
            selectedFloors: selectedFloors,
            selectedBuildingAges: selectedBuildingAges,
            heatingTypes: selectedHeatingTypes,
            netAreaMin: netAreaMin,
            netAreaMax: netAreaMax,
            depositMin: depositMin,
            depositMax: depositMax,
            features: features
        };
        console.log('🏢 Office Details verisi alınıyor:', officeData);
        return officeData;
    };

    useImperativeHandle(ref, () => ({
        getDetails: getOfficeDetails
    }));

    const featureCategories = [
        {
            title: 'Temel Özellikler',
            features: [
                { key: 'furnished', label: 'Eşyalı' },
                { key: 'parking', label: 'Otopark' },
                { key: 'security', label: 'Güvenlik' },
                { key: 'elevator', label: 'Asansör' },
                { key: 'generator', label: 'Jeneratör' },
            ]
        },
        {
            title: 'Konfor & Sistem',
            features: [
                { key: 'airConditioning', label: 'Klima' },
                { key: 'internet', label: 'İnternet' },
                { key: 'kitchen', label: 'Mutfak' },
                { key: 'toilet', label: 'Tuvalet' },
            ]
        },
        {
            title: 'Ticari Özel Alanlar',
            features: [
                { key: 'showcase', label: 'Vitrin' },
                { key: 'warehouse', label: 'Depo Alanı' },
                { key: 'loadingDock', label: 'Yükleme Rampası' },
                { key: 'cashRegister', label: 'Kasa Alanı' },
            ]
        },
        {
            title: 'Müşteri Alanları',
            features: [
                { key: 'outdoorSeating', label: 'Dış Mekan Oturma' },
                { key: 'waitingArea', label: 'Bekleme Alanı' },
                { key: 'changingRoom', label: 'Soyunma Odası' },
            ]
        }
    ];

    const ageRanges = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const floorOptions = [
        "-1", "0", "1", "2", "3", "4", "5", 
        "6", "7", "8", "9", "10", "11+"
    ];

    const heatingOptions = [
        { value: "DOGALGAZ", label: "Doğalgaz" },
        { value: "KOMBI", label: "Kombi" },
        { value: "KALORIFER", label: "Kalorifer" },
        { value: "KLIMA", label: "Klima" },
        { value: "SOBALI", label: "Sobali" },
        { value: "YOK", label: "Yok" }
    ];


    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'age' | 'floor' | 'heating' | 'Temel Özellikler' | 'Konfor & Sistem' | 'Ticari Özel Alanlar' | 'Müşteri Alanları') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
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

    const toggleFloor = (floor: string) => {
        setSelectedFloors(prev => {
            if (prev.includes(floor)) {
                return prev.filter(f => f !== floor);
            } else {
                return [...prev, floor];
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

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Ticari Detayları
                </Typography>

                {/* Net Metrekare */}
                <Box sx={{ marginBottom: '10px' }}>
                    <Typography sx={{ fontSize: "13px", marginBottom: "8px", fontWeight: "medium" }}>
                        Net Metrekare
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TextField
                            placeholder="Min"
                            value={netAreaMin}
                            onChange={(e) => setNetAreaMin(e.target.value)}
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    height: '36px',
                                    fontSize: '13px'
                                }
                            }}
                        />
                        <Typography sx={{ fontSize: "13px", color: 'rgba(0, 0, 0, 0.6)' }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={netAreaMax}
                            onChange={(e) => setNetAreaMax(e.target.value)}
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    height: '36px',
                                    fontSize: '13px'
                                }
                            }}
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

                {/* Depozito */}
                <Box sx={{ marginBottom: '10px' }}>
                    <Typography sx={{ fontSize: "13px", marginBottom: "8px", fontWeight: "medium" }}>
                        Depozito
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TextField
                            placeholder="Min"
                            value={depositMin}
                            onChange={(e) => setDepositMin(e.target.value)}
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    height: '36px',
                                    fontSize: '13px'
                                }
                            }}
                        />
                        <Typography sx={{ fontSize: "13px", color: 'rgba(0, 0, 0, 0.6)' }}>-</Typography>
                        <TextField
                            placeholder="Max"
                            value={depositMax}
                            onChange={(e) => setDepositMax(e.target.value)}
                            variant="outlined"
                            size="small"
                            autoComplete="off"
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    height: '36px',
                                    fontSize: '13px'
                                }
                            }}
                        />
                    </Box>
                </Box>

                {/* Özellik Kategorileri */}
                {featureCategories.map((category) => (
                    <Box 
                        key={category.title}
                        onClick={(e) => handlePopoverOpen(e, category.title as 'Temel Özellikler' | 'Konfor & Sistem' | 'Ticari Özel Alanlar' | 'Müşteri Alanları')}
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
                                {popoverType === 'floor' && 'Bulunduğu Kat Seçin'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'heating' && 'Isıtma Türü Seçin'}
                                {popoverType === 'Temel Özellikler' && 'Temel Özellikler'}
                                {popoverType === 'Konfor & Sistem' && 'Konfor & Sistem'}
                                {popoverType === 'Ticari Özel Alanlar' && 'Ticari Özel Alanlar'}
                                {popoverType === 'Müşteri Alanları' && 'Müşteri Alanları'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

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

                        {/* Kategori tabanlı Özellikler Listesi */}
                        {(popoverType === 'Temel Özellikler' || popoverType === 'Konfor & Sistem' || 
                          popoverType === 'Ticari Özel Alanlar' || popoverType === 'Müşteri Alanları') && (
                            <List sx={{ padding: 0 }}>
                                {featureCategories
                                    .find(cat => cat.title === popoverType)
                                    ?.features.map((feature) => (
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
});

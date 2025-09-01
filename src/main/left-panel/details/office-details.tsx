import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Radio, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface OfficeDetailsProps {
    selectedCategory: string;
}

export default function OfficeDetails({ selectedCategory }: OfficeDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'area' | 'floor' | 'age' | 'room' | 'meetingRoom' | 'facade' | 'Temel Özellikler' | 'Ofis Konfor' | 'Çalışma Alanları' | 'Teknik Altyapı' | null>(null);
    
    // Form states
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedRoomCounts, setSelectedRoomCounts] = useState<string[]>([]);
    const [selectedMeetingRoomCounts, setSelectedMeetingRoomCounts] = useState<string[]>([]);
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
        parking: false,
        elevator: false,
        security: false,
        generator: false,
        // Ofis Konfor
        airConditioning: false,
        internet: false,
        kitchen: false,
        fireSystem: false,
        // Çalışma Alanları
        reception: false,
        meetingRoom: false,
        waitingArea: false,
        archive: false,
        library: false,
        // Teknik Altyapı
        serverRoom: false,
        accessControl: false,
        fiberInternet: false,
        soundproof: false
    });

    const featureCategories = [
        {
            title: 'Temel Özellikler',
            features: [
                { key: 'furnished', label: 'Eşyalı' },
                { key: 'parking', label: 'Otopark' },
                { key: 'elevator', label: 'Asansör' },
                { key: 'security', label: 'Güvenlik' },
                { key: 'generator', label: 'Jeneratör' },
            ]
        },
        {
            title: 'Ofis Konfor',
            features: [
                { key: 'airConditioning', label: 'Klima' },
                { key: 'internet', label: 'İnternet' },
                { key: 'kitchen', label: 'Mutfak/Çay Ocağı' },
                { key: 'fireSystem', label: 'Yangın Sistemi' },
            ]
        },
        {
            title: 'Çalışma Alanları',
            features: [
                { key: 'reception', label: 'Resepsiyon Alanı' },
                { key: 'meetingRoom', label: 'Toplantı Odası' },
                { key: 'waitingArea', label: 'Bekleme Salonu' },
                { key: 'archive', label: 'Arşiv Odası' },
                { key: 'library', label: 'Kütüphane/Dosya Odası' },
            ]
        },
        {
            title: 'Teknik Altyapı',
            features: [
                { key: 'serverRoom', label: 'Sunucu Odası' },
                { key: 'accessControl', label: 'Kartlı Giriş Sistemi' },
                { key: 'fiberInternet', label: 'Fiber İnternet Altyapısı' },
                { key: 'soundproof', label: 'Ses Yalıtımı' },
            ]
        }
    ];

    const ageRanges = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31+"
    ];

    const netAreaRanges = [
        "50 m² - 100 m²",
        "100 m² - 200 m²", 
        "200 m² - 300 m²",
        "300 m² - 500 m²",
        "500 m² - 750 m²",
        "750 m² - 1000 m²",
        "1000 m² +"
    ];

    const floorOptions = [
        "Bodrum", "Giriş", "1", "2", "3", "4", "5", 
        "6", "7", "8", "9", "10", "11-15", "16-20", "21+"
    ];

    const roomCountOptions = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"
    ];

    const meetingRoomOptions = [
        "0", "1", "2", "3", "4", "5+"
    ];

    const facadeOptions = [
        "Kuzey", "Güney", "Doğu", "Batı", "Kuzey-Doğu", "Kuzey-Batı", "Güney-Doğu", "Güney-Batı"
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'area' | 'floor' | 'age' | 'room' | 'meetingRoom' | 'facade' | 'Temel Özellikler' | 'Ofis Konfor' | 'Çalışma Alanları' | 'Teknik Altyapı') => {
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

    const toggleFloor = (floor: string) => {
        setSelectedFloors(prev => {
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

    const toggleRoomCount = (count: string) => {
        setSelectedRoomCounts(prev => {
            if (prev.includes(count)) {
                return prev.filter(r => r !== count);
            } else {
                return [...prev, count];
            }
        });
    };

    const toggleMeetingRoomCount = (count: string) => {
        setSelectedMeetingRoomCounts(prev => {
            if (prev.includes(count)) {
                return prev.filter(m => m !== count);
            } else {
                return [...prev, count];
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

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Ofis Detayları
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
                        {selectedAreaRanges.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedAreaRanges.join(', ')}
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

                {/* Oda Sayısı Seçimi */}
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
                            Oda Sayısı
                        </Typography>
                        {selectedRoomCounts.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedRoomCounts.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Toplantı Odası Sayısı Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'meetingRoom')}
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
                        backgroundColor: popoverType === 'meetingRoom' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'meetingRoom' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'meetingRoom' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Toplantı Odası
                        </Typography>
                        {selectedMeetingRoomCounts.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedMeetingRoomCounts.join(', ')}
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
                                {selectedFacadeTypes.join(', ')}
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
                                {popoverType === 'area' && 'Net Metrekare Aralığı'}
                                {popoverType === 'floor' && 'Bulunduğu Kat Seçin'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'room' && 'Oda Sayısı Seçin'}
                                {popoverType === 'meetingRoom' && 'Toplantı Odası Seçin'}
                                {popoverType === 'facade' && 'Cephe Yönü Seçin'}
                                {featureCategories.map(cat => cat.title).includes(popoverType as string) && popoverType}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Net Metrekare Aralığı Listesi */}
                        {popoverType === 'area' && (
                            <List sx={{ padding: 0 }}>
                                {netAreaRanges.map((range) => (
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

                        {/* Oda Sayısı Listesi */}
                        {popoverType === 'room' && (
                            <List sx={{ padding: 0 }}>
                                {roomCountOptions.map((count) => (
                                    <ListItem disablePadding key={count} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleRoomCount(count)} 
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
                                                checked={selectedRoomCounts.includes(count)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{count}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Toplantı Odası Sayısı Listesi */}
                        {popoverType === 'meetingRoom' && (
                            <List sx={{ padding: 0 }}>
                                {meetingRoomOptions.map((count) => (
                                    <ListItem disablePadding key={count} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleMeetingRoomCount(count)} 
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
                                                checked={selectedMeetingRoomCounts.includes(count)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{count}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Cephe Yönü Listesi */}
                        {popoverType === 'facade' && (
                            <List sx={{ padding: 0 }}>
                                {facadeOptions.map((facade) => (
                                    <ListItem disablePadding key={facade} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleFacadeType(facade)} 
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
                                                checked={selectedFacadeTypes.includes(facade)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{facade}</Typography>
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

                    </Paper>
                </Popover>
            </CardContent>
        </Card>
    );
}
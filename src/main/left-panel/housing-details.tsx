import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, TextField, MenuItem, Select, FormControl, List, ListItem, ListItemButton, Radio, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface HousingDetailsProps {
    selectedCategory: string;
}

export default function HousingDetails({ selectedCategory }: HousingDetailsProps) {
    const siteFeeOptions = [
        "Yok", "0-250₺", "251-500₺", "501-750₺", "751-1000₺", "1001-1500₺", "1501₺+"
    ];
    const [selectedSiteFees, setSelectedSiteFees] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'room' | 'age' | 'heating' | 'features' | 'area' | 'floor' | 'totalFloor' | 'siteFee' | null>(null);
    
    // Form states
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [selectedTotalFloors, setSelectedTotalFloors] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedHeatingTypes, setSelectedHeatingTypes] = useState<string[]>([]);
    const [siteName, setSiteName] = useState<string>('');
    const [siteFee, setSiteFee] = useState<string>('');
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        furnished: false,
        balcony: false,
        parking: false
    });

    const roomOptions = [
        "1+0", "1+1", "2+1", "2+2", "3+1", "3+2", 
        "4+1", "4+2", "5+1", "5+2", "6+1", "7+"
    ];

    const netAreaRanges = [
        "50 m² - 75 m²",
        "75 m² - 100 m²", 
        "100 m² - 125 m²",
        "125 m² - 150 m²",
        "150 m² - 200 m²",
        "200 m² - 300 m²",
        "300 m² +"
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'room' | 'age' | 'heating' | 'features' | 'area' | 'floor' | 'totalFloor' | 'siteFee') => {
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

                {/* Site Bilgileri */}
                {/* Aidat Seçimi */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'siteFee')}
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
                        backgroundColor: popoverType === 'siteFee' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'siteFee' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'siteFee' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Aidat
                        </Typography>
                        {selectedSiteFees.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedSiteFees.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>
                                {popoverType === 'room' && 'Oda + Salon Seçin'}
                                {popoverType === 'area' && 'Net Metrekare Aralığı'}
                                {popoverType === 'floor' && 'Bulunduğu Kat Seçin'}
                                {popoverType === 'totalFloor' && 'Toplam Kat Seçin'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'heating' && 'Isıtma Türü Seçin'}
                                {popoverType === 'features' && 'Özellikler Seçin'}
                                {popoverType === 'siteFee' && 'Aidat Seçin'}
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

                        {/* Özellikler Listesi */}
                        {popoverType === 'features' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    { key: 'furnished', label: 'Eşyalı' },
                                    { key: 'balcony', label: 'Balkon' },
                                    { key: 'site', label: 'Site İçerisinde' },
                                    { key: 'parking', label: 'Otopark' }
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

                        {/* Aidat Seçenekleri Listesi */}
                        {popoverType === 'siteFee' && (
                            <List sx={{ padding: 0 }}>
                                {siteFeeOptions.map((fee) => (
                                    <ListItem disablePadding key={fee} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => {
                                                setSelectedSiteFees(prev => prev.includes(fee) ? prev.filter(f => f !== fee) : [...prev, fee]);
                                            }}
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
                                                checked={selectedSiteFees.includes(fee)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{fee}</Typography>
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
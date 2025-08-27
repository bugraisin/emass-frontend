import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface CommercialDetailsProps {
    selectedCategory: string;
}

export default function CommercialDetails({ selectedCategory }: CommercialDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'area' | 'age' | 'features' | 'floor' | 'frontage' | null>(null);
    
    // Form states - multiple choice
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedBuildingAges, setSelectedBuildingAges] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [selectedFrontages, setSelectedFrontages] = useState<string[]>([]);
    
    // Boolean features
    const [features, setFeatures] = useState<Record<string, boolean>>({
        furnished: false,
        airConditioning: false,
        parking: false,
        showcase: false,
        kitchen: false,
        outdoorSeating: false,
        waitingArea: false,
        security: false
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

    const floorOptions = [
        "Bodrum", "Giriş", "1", "2", "3", "4", "5", 
        "6", "7", "8", "9", "10", "11+"
    ];

    const frontageOptions = [
        "5m altı",
        "5-10m",
        "10-15m", 
        "15-20m",
        "20m+"
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'area' | 'age' | 'features' | 'floor' | 'frontage') => {
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

    const toggleFloor = (floor: string) => {
        setSelectedFloors(prev => {
            if (prev.includes(floor)) {
                return prev.filter(f => f !== floor);
            } else {
                return [...prev, floor];
            }
        });
    };

    const toggleFrontage = (frontage: string) => {
        setSelectedFrontages(prev => {
            if (prev.includes(frontage)) {
                return prev.filter(f => f !== frontage);
            } else {
                return [...prev, frontage];
            }
        });
    };

    const open = Boolean(anchorEl);

    const shouldShowFrontage = () => {
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

                {/* Cephe Genişliği - sadece dükkan/mağaza için */}
                {shouldShowFrontage() && (
                    <Box 
                        onClick={(e) => handlePopoverOpen(e, 'frontage')}
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
                            backgroundColor: popoverType === 'frontage' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                            borderColor: popoverType === 'frontage' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                            '&:hover': {
                                backgroundColor: popoverType === 'frontage' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "13px" }}>
                                Cephe Genişliği
                            </Typography>
                            {selectedFrontages.length > 0 && (
                                <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {selectedFrontages.join(', ')}
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
                                {popoverType === 'area' && 'Net Metrekare Aralığı'}
                                {popoverType === 'floor' && 'Bulunduğu Kat Seçin'}
                                {popoverType === 'age' && 'Bina Yaşı Seçin'}
                                {popoverType === 'frontage' && 'Cephe Genişliği Seçin'}
                                {popoverType === 'features' && 'Özellikler Seçin'}
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

                        {/* Cephe Genişliği Listesi */}
                        {popoverType === 'frontage' && (
                            <List sx={{ padding: 0 }}>
                                {frontageOptions.map((frontage) => (
                                    <ListItem disablePadding key={frontage} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleFrontage(frontage)} 
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
                                                checked={selectedFrontages.includes(frontage)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{frontage}</Typography>
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
                                    { key: 'security', label: 'Güvenlik' },
                                    { key: 'showcase', label: 'Vitrin' },
                                    { key: 'kitchen', label: 'Mutfak' },
                                    { key: 'outdoorSeating', label: 'Dış Mekan' },
                                    { key: 'waitingArea', label: 'Bekleme Alanı' }
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
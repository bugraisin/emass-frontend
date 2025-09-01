import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface LandDetailsProps {
    selectedCategory: string;
}

export default function LandDetails({ selectedCategory }: LandDetailsProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'area' | 'zoning' | 'title' | 'infrastructure' | 'Altyapı' | 'Konum & Manzara' | 'Arazi Özellikler' | 'Tarım & Bahçe' | null>(null);
    
    // Form states - multiple choice yapıldı
    const [selectedAreaRanges, setSelectedAreaRanges] = useState<string[]>([]);
    const [selectedZoningTypes, setSelectedZoningTypes] = useState<string[]>([]);
    const [selectedTitleTypes, setSelectedTitleTypes] = useState<string[]>([]);
    
    // Min-Max states for area
    const [areaMin, setAreaMin] = useState<string>('');
    const [areaMax, setAreaMax] = useState<string>('');
    
    // Boolean features
    const [infrastructure, setInfrastructure] = useState<Record<string, boolean>>({
        electricity: false,
        water: false,
        roadAccess: false,
        naturalGas: false,
        sewerage: false,
        internet: false
    });

    // Features organized by categories
    const [features, setFeatures] = useState<Record<string, boolean>>({
        // Altyapı
        electricity: false,
        water: false,
        naturalGas: false,
        sewerage: false,
        roadAccess: false,
        // Konum & Manzara
        cornerLot: false,
        seaView: false,
        cityView: false,
        forestView: false,
        mountainView: false,
        // Arazi Özellikler
        flat: false,
        slope: false,
        fenced: false,
        agricultural: false,
        buildingPermit: false,
        // Tarım & Bahçe
        vineyard: false,
        orchard: false,
        oliveTrees: false,
        greenhouse: false,
        well: false,
    });

    const featureCategories = [
        {
            title: 'Altyapı',
            features: [
                { key: 'electricity', label: 'Elektrik' },
                { key: 'water', label: 'Su' },
                { key: 'naturalGas', label: 'Doğalgaz' },
                { key: 'sewerage', label: 'Kanalizasyon' },
                { key: 'roadAccess', label: 'Yol Erişimi' },
            ]
        },
        {
            title: 'Konum & Manzara',
            features: [
                { key: 'cornerLot', label: 'Köşe Parsel' },
                { key: 'seaView', label: 'Deniz Manzarası' },
                { key: 'cityView', label: 'Şehir Manzarası' },
                { key: 'forestView', label: 'Orman Manzarası' },
                { key: 'mountainView', label: 'Dağ Manzarası' },
            ]
        },
        {
            title: 'Arazi Özellikler',
            features: [
                { key: 'flat', label: 'Düz Arazi' },
                { key: 'slope', label: 'Eğimli Arazi' },
                { key: 'fenced', label: 'Çevrili/Çitli' },
                { key: 'agricultural', label: 'Tarımsal Faaliyet' },
                { key: 'buildingPermit', label: 'Yapı İzni Var' },
            ]
        },
        {
            title: 'Tarım & Bahçe',
            features: [
                { key: 'vineyard', label: 'Bağ/Üzüm' },
                { key: 'orchard', label: 'Meyve Bahçesi' },
                { key: 'oliveTrees', label: 'Zeytin Ağaçları' },
                { key: 'greenhouse', label: 'Sera' },
                { key: 'well', label: 'Su Kuyusu' },
            ]
        }
    ];

    const areaRanges = [
        "0-500 m²",
        "500 m² - 1000 m²",
        "1000 m² - 2000 m²", 
        "2000 m² - 5000 m²",
        "5000 m² - 10.000 m²",
        "10.000 m² - 20.000 m²",
        "20.000 m² - 50.000 m²",
        "50.000 m² +"
    ];

    const zoningOptions = [
        "İmarlı",
        "Tarla",
        "Bahçe",
        "Konut İmarlı",
        "Ticari İmarlı",
        "Sanayi İmarlı",
        "Diğer"
    ];

    const titleDeedOptions = [
        "Kat Mülkiyeti",
        "Kat İrtifakı",
        "Arsa Payı",
        "Müstakil Tapulu",
        "Hisseli Tapulu",
        "Tarla Tapulu"
    ];

    const handleInfrastructureChange = (feature: string) => {
        setInfrastructure(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'area' | 'zoning' | 'title' | 'infrastructure' | 'Altyapı' | 'Konum & Manzara' | 'Arazi Özellikler' | 'Tarım & Bahçe') => {
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

    const toggleZoningType = (zoning: string) => {
        setSelectedZoningTypes(prev => {
            if (prev.includes(zoning)) {
                return prev.filter(z => z !== zoning);
            } else {
                return [...prev, zoning];
            }
        });
    };

    const toggleTitleType = (title: string) => {
        setSelectedTitleTypes(prev => {
            if (prev.includes(title)) {
                return prev.filter(t => t !== title);
            } else {
                return [...prev, title];
            }
        });
    };

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5, fontWeight: 600 }}>
                    Arsa Detayları
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

                {/* İmar Durumu */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'zoning')}
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
                        backgroundColor: popoverType === 'zoning' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'zoning' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'zoning' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            İmar Durumu
                        </Typography>
                        {selectedZoningTypes.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedZoningTypes.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Tapu Durumu */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'title')}
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
                        backgroundColor: popoverType === 'title' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'title' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'title' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Tapu Durumu
                        </Typography>
                        {selectedTitleTypes.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedTitleTypes.join(', ')}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Altyapı Durumu */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'infrastructure')}
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
                        backgroundColor: popoverType === 'infrastructure' && open ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                        borderColor: popoverType === 'infrastructure' && open ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                            backgroundColor: popoverType === 'infrastructure' && open ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Altyapı Durumu
                        </Typography>
                        {Object.values(infrastructure).some(f => f) && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {Object.values(infrastructure).filter(f => f).length} altyapı seçili
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Feature Categories */}
                {featureCategories.map((category) => (
                    <Box 
                        key={category.title}
                        onClick={(e) => handlePopoverOpen(e, category.title as 'Altyapı' | 'Konum & Manzara' | 'Arazi Özellikler' | 'Tarım & Bahçe')}
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
                                {popoverType === 'area' && 'Toplam Alan Aralığı'}
                                {popoverType === 'zoning' && 'İmar Durumu Seçin'}
                                {popoverType === 'title' && 'Tapu Durumu Seçin'}
                                {popoverType === 'infrastructure' && 'Altyapı Durumu Seçin'}
                                {popoverType === 'Altyapı' && 'Altyapı Özellikleri'}
                                {popoverType === 'Konum & Manzara' && 'Konum & Manzara Seçin'}
                                {popoverType === 'Arazi Özellikler' && 'Arazi Özelliklerini Seçin'}
                                {popoverType === 'Tarım & Bahçe' && 'Tarım & Bahçe Özellikleri'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* Alan Aralığı Listesi */}
                        {popoverType === 'area' && (
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

                        {/* İmar Durumu Listesi */}
                        {popoverType === 'zoning' && (
                            <List sx={{ padding: 0 }}>
                                {zoningOptions.map((zoning) => (
                                    <ListItem disablePadding key={zoning} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleZoningType(zoning)} 
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
                                                checked={selectedZoningTypes.includes(zoning)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{zoning}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Tapu Durumu Listesi */}
                        {popoverType === 'title' && (
                            <List sx={{ padding: 0 }}>
                                {titleDeedOptions.map((title) => (
                                    <ListItem disablePadding key={title} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleTitleType(title)} 
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
                                                checked={selectedTitleTypes.includes(title)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{title}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Altyapı Durumu Listesi */}
                        {popoverType === 'infrastructure' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    { key: 'electricity', label: 'Elektrik' },
                                    { key: 'water', label: 'Su' },
                                    { key: 'naturalGas', label: 'Doğalgaz' },
                                    { key: 'sewerage', label: 'Kanalizasyon' },
                                    { key: 'roadAccess', label: 'Yol Erişimi' },
                                    { key: 'internet', label: 'İnternet/Fiber' }
                                ].map((infra) => (
                                    <ListItem disablePadding key={infra.key} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => handleInfrastructureChange(infra.key)} 
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
                                                checked={infrastructure[infra.key]}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{infra.label}</Typography>
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
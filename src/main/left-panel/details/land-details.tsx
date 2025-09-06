import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemButton, Checkbox, Popover, Paper, IconButton, TextField } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface LandDetailsProps {
    selectedCategory: string;
}

export default forwardRef<any, LandDetailsProps>(function LandDetails({ selectedCategory }, ref) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'area' | 'zoning' | 'title' | 'Altyapı' | 'Konum & Manzara' | 'Arazi Özellikler' | 'Tarım & Bahçe' | null>(null);
    
    // Form states - multiple choice yapıldı
    const [selectedZoningTypes, setSelectedZoningTypes] = useState<string[]>([]);
    const [selectedTitleLandDeedStatus, setSelectedTitleDeedStatus] = useState<string[]>([]);
    
    // Min-Max states for area
    const [netAreaMin, setNetAreaMin] = useState<string>('');
    const [netAreaMax, setNetAreaMax] = useState<string>('');

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

    const zoningOptions = [
        {value: "IMARLI", label: "İmarlı"},
        { value: "IMARSIZ", label: "İmarsız" },
        { value: "TARLA", label: "Tarla" },
        { value: "BAHCE", label: "Bahçe" },
        { value: "KONUT_IMARLI", label: "Konut İmarlı" },
        { value: "TICARI_IMARLI", label: "Ticari İmarlı" },
        { value: "SANAYI_IMARLI", label: "Sanayi İmarlı" },
        { value: "DIGER", label: "Diğer" }
    ];

    const titleLandDeedOptions = [
        { value: "ARSA_PAYI", label: "Arsa Payı"},
        { value: "MUSTAKIL_TAPULU", label: "Müstakil Tapulu" },
        { value: "HISSELI_TAPULU", label: "Hisseli Tapulu" },
        { value: "TARLA_TAPULU", label: "Tarla Tapulu" }
    ];

    const handleFeatureChange = (feature: string) => {
        setFeatures(prev => ({
            ...prev,
            [feature]: !prev[feature]
        }));
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'area' | 'zoning' | 'title' | 'Altyapı' | 'Konum & Manzara' | 'Arazi Özellikler' | 'Tarım & Bahçe') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
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

    const toggleTitleLandDeedType = (title: string) => {
        setSelectedTitleDeedStatus(prev => {
            if(prev.includes(title)) {
                return prev.filter(z => z !== title);
            } else {
                return [...prev, title];
            }
        });
    };


    const getLandDetails = () => {
        const landData = {
            netAreaMin: netAreaMin,
            netAreaMax: netAreaMax,
            zoningTypes: selectedZoningTypes,
            titleLandDeedStatus: selectedTitleLandDeedStatus,
            features: features
        };
        console.log('🏢 Office Details verisi alınıyor:', landData);
        return landData;
    };

    // Parent'a getDetails fonksiyonunu expose et
    useImperativeHandle(ref, () => ({
        getDetails: getLandDetails
    }));

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
                        
                        <Typography sx={{ fontSize: '13px', color: 'text.secondary', px: 0.5 }}>-</Typography>
                        
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
                                {selectedZoningTypes.map(type => zoningOptions.find(f => f.value === type)?.label).join(', ')}
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
                        {selectedTitleLandDeedStatus.length > 0 && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedTitleLandDeedStatus.map(type => titleLandDeedOptions.find(f => f.value === type)?.label).join(', ')}
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
                                {popoverType === 'Altyapı' && 'Altyapı Özellikleri'}
                                {popoverType === 'Konum & Manzara' && 'Konum & Manzara Seçin'}
                                {popoverType === 'Arazi Özellikler' && 'Arazi Özelliklerini Seçin'}
                                {popoverType === 'Tarım & Bahçe' && 'Tarım & Bahçe Özellikleri'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small" sx={{ ml: 1 }}>
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* İmar Durumu Listesi */}
                        {popoverType === 'zoning' && (
                            <List sx={{ padding: 0 }}>
                                {zoningOptions.map((zoning) => (
                                    <ListItem disablePadding key={zoning.value} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleZoningType(zoning.value)} 
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
                                                checked={selectedZoningTypes.includes(zoning.value)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{zoning.label}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Tapu Durumu Listesi */}
                        {popoverType === 'title' && (
                            <List sx={{ padding: 0 }}>
                                {titleLandDeedOptions.map((title) => (
                                    <ListItem disablePadding key={title.value} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => toggleTitleLandDeedType(title.value)} 
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
                                                checked={selectedTitleLandDeedStatus.includes(title.value)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{title.label}</Typography>
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
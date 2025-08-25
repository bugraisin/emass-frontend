import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemButton, Radio, Box, IconButton, Popover, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface CategoriesProps {
    onCategoryChange: (category: string) => void;
}

// Backend enum'larına uygun veri yapısı
const PROPERTY_TYPES = {
    KONUT: {
        name: "Konut",
        subtypes: [
            { key: "DAIRE", name: "Daire" },
            { key: "MUSTAKIL_EV", name: "Müstakil Ev" },
            { key: "VILLA", name: "Villa" },
            { key: "REZIDANS", name: "Rezidans" },
            { key: "YAZLIK", name: "Yazlık" }
        ]
    },
    OFIS: {
        name: "Ofis",
        subtypes: [
            { key: "OFIS", name: "Ofis" },
            { key: "BÜRO", name: "Büro" },
            { key: "COWORKING", name: "Coworking" },
            { key: "CALL_CENTER", name: "Call Center" },
            { key: "TOPLANTI_SALONU", name: "Toplantı Salonu" },
            { key: "MUAYENEHANE", name: "Muayenehane" },
            { key: "AVUKATLIK_BÜROSU", name: "Avukatlık Bürosu" },
            { key: "MUHASEBE_OFISI", name: "Muhasebe Ofisi" }
        ]
    },
    ARSA: {
        name: "Arsa",
        subtypes: [
            { key: "KONUT_ARSASI", name: "Konut Arsası" },
            { key: "TICARI_ARSA", name: "Ticari Arsa" },
            { key: "TARLA", name: "Tarla" },
            { key: "BAG_BAHCE", name: "Bağ Bahçe" }
        ]
    },
    ENDUSTRIYEL: {
        name: "Endüstriyel",
        subtypes: [
            { key: "FABRIKA", name: "Fabrika" },
            { key: "ATOLYE", name: "Atölye" },
            { key: "IMALATHANE", name: "İmalathane" },
            { key: "DEPO", name: "Depo" },
            { key: "SOGUK_HAVA_DEPOSU", name: "Soğuk Hava Deposu" },
            { key: "ANTREPO", name: "Antrepo" },
            { key: "LABORATUVAR", name: "Laboratuvar" },
            { key: "URETIM_TESISI", name: "Üretim Tesisi" }
        ]
    },
    HIZMET: {
        name: "Hizmet",
        subtypes: [
            { key: "OTOPARK", name: "Otopark" },
            { key: "SPOR_SALONU", name: "Spor Salonu" },
            { key: "YIKAMA", name: "Yıkama" },
            { key: "OTO_SERVIS", name: "Oto Servis" },
            { key: "BENZIN_ISTASYONU", name: "Benzin İstasyonu" },
            { key: "KARGO_MERKEZI", name: "Kargo Merkezi" },
            { key: "TEMIZLIK_MERKEZI", name: "Temizlik Merkezi" }
        ]
    },
    TICARI: {
        name: "Ticari",
        subtypes: [
            { key: "DUKKAN", name: "Dükkan" },
            { key: "MAGAZA", name: "Mağaza" },
            { key: "SHOWROOM", name: "Showroom" },
            { key: "MARKET", name: "Market" },
            { key: "RESTAURANT", name: "Restaurant" },
            { key: "KAFE", name: "Kafe" },
            { key: "BAR", name: "Bar" },
            { key: "PASTANE", name: "Pastane" },
            { key: "BERBER_KUAFOR", name: "Berber Kuaför" },
            { key: "GuZELLIK_SALONU", name: "Güzellik Salonu" },
            { key: "ECZANE", name: "Eczane" }
        ]
    }
};

export default function Categories({ onCategoryChange }: CategoriesProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'listing' | 'property' | 'subtype' | null>(null);
    
    // Seçimler
    const [selectedListingType, setSelectedListingType] = useState<'SALE' | 'RENT' | ''>('');
    const [selectedPropertyType, setSelectedPropertyType] = useState<keyof typeof PROPERTY_TYPES | ''>('');
    const [selectedSubtype, setSelectedSubtype] = useState<string>('');

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'listing' | 'property' | 'subtype') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const selectListingType = (listingType: 'SALE' | 'RENT') => {
        setSelectedListingType(listingType);
        setSelectedPropertyType('');
        setSelectedSubtype('');
        onCategoryChange(listingType);
        handlePopoverClose();
    };

    const selectPropertyType = (propertyType: keyof typeof PROPERTY_TYPES) => {
        setSelectedPropertyType(propertyType);
        setSelectedSubtype('');
        const category = selectedListingType ? `${selectedListingType}_${propertyType}` : propertyType;
        onCategoryChange(category);
        handlePopoverClose();
    };

    const selectSubtype = (subtype: string) => {
        setSelectedSubtype(subtype);
        const category = `${selectedListingType}_${selectedPropertyType}_${subtype}`;
        onCategoryChange(category);
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1, fontWeight: 600 }}>
                    Kategori
                </Typography>

                {/* İlan Türü (Satılık/Kiralık) */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'listing')}
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
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            İlan Türü
                        </Typography>
                        {selectedListingType && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedListingType === 'SALE' ? 'Satılık' : 'Kiralık'}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Emlak Türü */}
                <Box 
                    onClick={(e) => selectedListingType && handlePopoverOpen(e, 'property')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: selectedListingType ? 'pointer' : 'not-allowed',
                        marginBottom: '6px',
                        minHeight: '36px',
                        opacity: selectedListingType ? 1 : 0.5,
                        '&:hover': {
                            backgroundColor: selectedListingType ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Emlak Türü
                        </Typography>
                        {selectedPropertyType && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {PROPERTY_TYPES[selectedPropertyType].name}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Alt Kategori */}
                <Box 
                    onClick={(e) => selectedPropertyType && handlePopoverOpen(e, 'subtype')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: selectedPropertyType ? 'pointer' : 'not-allowed',
                        minHeight: '36px',
                        opacity: selectedPropertyType ? 1 : 0.5,
                        '&:hover': {
                            backgroundColor: selectedPropertyType ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Alt Kategori
                        </Typography>
                        {selectedSubtype && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {PROPERTY_TYPES[selectedPropertyType]?.subtypes.find(s => s.key === selectedSubtype)?.name}
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
                    <Paper sx={{ padding: '8px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600 }}>
                                {popoverType === 'listing' && 'İlan Türü Seçin'}
                                {popoverType === 'property' && 'Emlak Türü Seçin'}
                                {popoverType === 'subtype' && 'Alt Kategori Seçin'}
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small">
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>

                        {/* İlan Türü Listesi */}
                        {popoverType === 'listing' && (
                            <List sx={{ padding: 0 }}>
                                {[
                                    { key: 'SALE', name: 'Satılık' },
                                    { key: 'RENT', name: 'Kiralık' }
                                ].map((item) => (
                                    <ListItem disablePadding key={item.key} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => selectListingType(item.key as 'SALE' | 'RENT')} 
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
                                                checked={selectedListingType === item.key}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{item.name}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Emlak Türü Listesi */}
                        {popoverType === 'property' && (
                            <List sx={{ padding: 0 }}>
                                {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                                    <ListItem disablePadding key={key} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => selectPropertyType(key as keyof typeof PROPERTY_TYPES)} 
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
                                                checked={selectedPropertyType === key}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{value.name}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Alt Kategori Listesi */}
                        {popoverType === 'subtype' && selectedPropertyType && (
                            <List sx={{ padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {PROPERTY_TYPES[selectedPropertyType].subtypes.map((subtype) => (
                                    <ListItem disablePadding key={subtype.key} sx={{ p: 0 }}>
                                        <ListItemButton 
                                            onClick={() => selectSubtype(subtype.key)} 
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
                                                checked={selectedSubtype === subtype.key}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                            />
                                            <Typography sx={{ fontSize: '13px', m: 0 }}>{subtype.name}</Typography>
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

import { Checkbox, FormControlLabel, Radio, RadioGroup, FormGroup } from "@mui/material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React from "react";
import { Home, Business, CorporateFare, Factory, Landscape, MiscellaneousServices } from "@mui/icons-material";

interface StepOneProps {
    listingType: string;
    setListingType: (listingType: string) => void;
    propertyType: string;
    setPropertyType: (propertyType: string) => void;
    subtype: string;
    setSubtype: (subtype: string) => void;
}

export default function StepOne({ listingType, setListingType, propertyType, setPropertyType, subtype, setSubtype }: StepOneProps) {
    // Tik ikonları kaldırıldı, doğrudan JSX içinde kullanılacak
    
    const subtypeOptions = {
        KONUT: ['DAIRE', 'MUSTAKIL_EV', 'VILLA', 'REZIDANS', 'YAZLIK'],
        TICARI: ['DUKKAN', 'MAGAZA', 'SHOWROOM', 'MARKET', 'RESTAURANT', 'KAFE', 'BAR', 'PASTANE', 'BERBER_KUAFOR', 'GuZELLIK_SALONU', 'ECZANE'],
        OFIS: ['OFIS', 'BÜRO', 'COWORKING', 'CALL_CENTER', 'TOPLANTI_SALONU', 'MUAYENEHANE', 'AVUKATLIK_BÜROSU', 'MUHASEBE_OFISI'],
        ENDUSTRIYEL: ['FABRIKA', 'ATOLYE', 'IMALATHANE', 'DEPO', 'SOGUK_HAVA_DEPOSU', 'ANTREPO', 'LABORATUVAR', 'URETIM_TESISI'],
        ARSA: ['KONUT_ARSASI', 'TICARI_ARSA', 'TARLA', 'BAG_BAHCE'],
        HIZMET: ['OTOPARK', 'SPOR_SALONU', 'YIKAMA', 'OTO_SERVIS', 'BENZIN_ISTASYONU', 'KARGO_MERKEZI', 'TEMIZLIK_MERKEZI']
    };

    const subtypeLabels = {
        DAIRE: 'Daire',
        MUSTAKIL_EV: 'Müstakil Ev', 
        VILLA: 'Villa',
        REZIDANS: 'Rezidans',
        YAZLIK: 'Yazlık',
        DUKKAN: 'Dükkan',
        MAGAZA: 'Mağaza',
        SHOWROOM: 'Showroom',
        MARKET: 'Market',
        RESTAURANT: 'Restaurant',
        KAFE: 'Kafe',
        BAR: 'Bar',
        PASTANE: 'Pastane',
        BERBER_KUAFOR: 'Berber & Kuaför',
        GuZELLIK_SALONU: 'Güzellik Salonu',
        ECZANE: 'Eczane',
        OFIS: 'Ofis',
        BÜRO: 'Büro',
        COWORKING: 'Coworking',
        CALL_CENTER: 'Call Center',
        TOPLANTI_SALONU: 'Toplantı Salonu',
        MUAYENEHANE: 'Muayenehane',
        AVUKATLIK_BÜROSU: 'Avukatlık Bürosu',
        MUHASEBE_OFISI: 'Muhasebe Ofisi',
        FABRIKA: 'Fabrika',
        ATOLYE: 'Atölye',
        IMALATHANE: 'İmalathane',
        DEPO: 'Depo',
        SOGUK_HAVA_DEPOSU: 'Soğuk Hava Deposu',
        ANTREPO: 'Antrepo',
        LABORATUVAR: 'Laboratuvar',
        URETIM_TESISI: 'Üretim Tesisi',
        KONUT_ARSASI: 'Konut Arsası',
        TICARI_ARSA: 'Ticari Arsa',
        TARLA: 'Tarla',
        BAG_BAHCE: 'Bağ & Bahçe',
        OTOPARK: 'Otopark',
        SPOR_SALONU: 'Spor Salonu',
        YIKAMA: 'Yıkama',
        OTO_SERVIS: 'Oto Servis',
        BENZIN_ISTASYONU: 'Benzin İstasyonu',
        KARGO_MERKEZI: 'Kargo Merkezi',
        TEMIZLIK_MERKEZI: 'Temizlik Merkezi'
    };

    const propertyTypeIcons = {
        KONUT: <Home sx={{ fontSize: 16, mr: 1 }} />,
        TICARI: <Business sx={{ fontSize: 16, mr: 1 }} />,
        OFIS: <CorporateFare sx={{ fontSize: 16, mr: 1 }} />,
        ENDUSTRIYEL: <Factory sx={{ fontSize: 16, mr: 1 }} />,
        ARSA: <Landscape sx={{ fontSize: 16, mr: 1 }} />,
        HIZMET: <MiscellaneousServices sx={{ fontSize: 16, mr: 1 }} />
    };

    return (
        <Box sx={{ 
            display: "flex", 
            gap: 2, 
            width: "100%", 
            padding: 2,
            minHeight: "400px",
            alignItems: 'flex-start'
        }}>
            {/* İlan Tipi Panel */}
            <Card sx={{ flex: 1, borderRadius: 2, background: 'white', alignSelf: 'flex-start' }}>
                <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1.5, fontSize: '14px', fontWeight: 500, color: '#222' }}>İlan Tipi</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={listingType === 'SALE'} icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} sx={{ p: 0.5 }} />}
                            label={<Typography sx={{ fontWeight: 400, fontSize: '13px', color: '#222' }}>Satılık</Typography>}
                            sx={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 0.25, px: 1.5, py: 1, m: 0, minHeight: 34 }}
                            onClick={() => setListingType('SALE')}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={listingType === 'RENT'} icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} sx={{ p: 0.5 }} />}
                            label={<Typography sx={{ fontWeight: 400, fontSize: '13px', color: '#222' }}>Kiralık</Typography>}
                            sx={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 0.25, px: 1.5, py: 1, m: 0, minHeight: 34 }}
                            onClick={() => setListingType('RENT')}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Emlak Türü Panel */}
            <Card sx={{ flex: 1, borderRadius: 2, background: 'white', alignSelf: 'flex-start' }}>
                <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1.5, fontSize: '14px', fontWeight: 500, color: '#222' }}>Emlak Türü</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {['KONUT', 'TICARI', 'OFIS', 'ENDUSTRIYEL', 'ARSA', 'HIZMET'].map((type) => (
                            <FormControlLabel
                                key={type}
                                control={<Checkbox checked={propertyType === type} icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} sx={{ p: 0.5 }} />}
                                label={<Typography sx={{ fontWeight: 400, fontSize: '13px', color: '#222' }}>{type === 'KONUT' ? 'Konut' : type === 'TICARI' ? 'Ticari' : type === 'OFIS' ? 'Ofis' : type === 'ENDUSTRIYEL' ? 'Endüstriyel' : type === 'ARSA' ? 'Arsa' : 'Hizmet'}</Typography>}
                                sx={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 0.25, px: 1.5, py: 1, m: 0, minHeight: 34 }}
                                onClick={() => { setPropertyType(type); setSubtype(''); }}
                            />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Alt Kategori Panel */}
            <Card sx={{ flex: 1, borderRadius: 2, background: 'white', alignSelf: 'flex-start' }}>
                <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ mb: 1.5, fontSize: '14px', fontWeight: 500, color: '#222' }}>Detay Seçimi</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {propertyType ? (
                            subtypeOptions[propertyType as keyof typeof subtypeOptions]?.map((sub) => (
                                <FormControlLabel
                                    key={sub}
                                    control={<Checkbox checked={subtype === sub} icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} sx={{ p: 0.5 }} />}
                                    label={<Typography sx={{ fontWeight: 400, fontSize: '13px', color: '#222' }}>{subtypeLabels[sub as keyof typeof subtypeLabels]}</Typography>}
                                    sx={{ background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 0.25, px: 1.2, py: 0.7, m: 0, minHeight: 28 }}
                                    onClick={() => setSubtype(sub)}
                                />
                            ))
                        ) : (
                            <Box sx={{ p: 1.5, textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: 0.5, border: '1px dashed #cbd5e1' }}>
                                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                                    Önce emlak türü seçin
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
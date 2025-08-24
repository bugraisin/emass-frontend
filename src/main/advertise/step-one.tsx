import { Box, Card, CardContent, Typography, Divider, Chip } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
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
        KONUT: <Home sx={{ fontSize: 16, mr: 0.5 }} />,
        TICARI: <Business sx={{ fontSize: 16, mr: 0.5 }} />,
        OFIS: <CorporateFare sx={{ fontSize: 16, mr: 0.5 }} />,
        ENDUSTRIYEL: <Factory sx={{ fontSize: 16, mr: 0.5 }} />,
        ARSA: <Landscape sx={{ fontSize: 16, mr: 0.5 }} />,
        HIZMET: <MiscellaneousServices sx={{ fontSize: 16, mr: 0.5 }} />
    };

    return (
        <Box sx={{ 
            display: "flex", 
            gap: 2, 
            width: "100%", 
            padding: 2,
            minHeight: "280px",
            backgroundColor: 'transparent'
        }}>
            {/* İlan Türü Panel */}
            <Card sx={{ 
                flex: 1,
                background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
                borderRadius: 4,
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #1e293b, #334155, #475569)',
                    opacity: 0.8
                },
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }
            }}>
                <CardContent sx={{ p: 2.5, height: '100%' }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        mb: 2.5 
                    }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2, 
                            textAlign: 'center', 
                            fontWeight: 700,
                            color: '#1e293b',
                            fontSize: '1rem',
                            letterSpacing: '-0.3px'
                        }}>
                            İlan Türü
                        </Typography>
                        <Box sx={{ 
                            width: '50px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #64748b, #475569)',
                            borderRadius: '2px',
                            opacity: 0.7
                        }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box
                            onClick={() => setListingType('SALE')}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                cursor: 'pointer',
                                background: listingType === 'SALE' 
                                    ? 'linear-gradient(135deg, #475569 0%, #334155 100%)' 
                                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                border: `2px solid ${listingType === 'SALE' ? '#475569' : 'transparent'}`,
                                color: listingType === 'SALE' ? 'white' : '#64748b',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: listingType === 'SALE' ? 'scale(1.02)' : 'scale(1)',
                                boxShadow: listingType === 'SALE' 
                                    ? '0 8px 25px rgba(71, 85, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                    : '0 2px 10px rgba(0,0,0,0.04)',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: listingType === 'SALE' 
                                        ? '0 12px 35px rgba(71, 85, 105, 0.3)' 
                                        : '0 6px 20px rgba(0,0,0,0.08)',
                                    borderColor: listingType === 'SALE' ? '#334155' : '#475569',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {listingType === 'SALE' && (
                                    <CheckIcon sx={{ 
                                        fontSize: 16, 
                                        mr: 1.5, 
                                        color: 'white',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                    }} />
                                )}
                                <Typography sx={{ 
                                    fontWeight: 600, 
                                    fontSize: '0.9rem',
                                    letterSpacing: '-0.2px'
                                }}>
                                    Satılık
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box
                            onClick={() => setListingType('RENT')}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                cursor: 'pointer',
                                background: listingType === 'RENT' 
                                    ? 'linear-gradient(135deg, #475569 0%, #334155 100%)' 
                                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                border: `2px solid ${listingType === 'RENT' ? '#475569' : 'transparent'}`,
                                color: listingType === 'RENT' ? 'white' : '#64748b',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: listingType === 'RENT' ? 'scale(1.02)' : 'scale(1)',
                                boxShadow: listingType === 'RENT' 
                                    ? '0 8px 25px rgba(71, 85, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                    : '0 2px 10px rgba(0,0,0,0.04)',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: listingType === 'RENT' 
                                        ? '0 12px 35px rgba(71, 85, 105, 0.3)' 
                                        : '0 6px 20px rgba(0,0,0,0.08)',
                                    borderColor: listingType === 'RENT' ? '#334155' : '#475569',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {listingType === 'RENT' && (
                                    <CheckIcon sx={{ 
                                        fontSize: 16, 
                                        mr: 1.5, 
                                        color: 'white',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                    }} />
                                )}
                                <Typography sx={{ 
                                    fontWeight: 600, 
                                    fontSize: '0.9rem',
                                    letterSpacing: '-0.2px'
                                }}>
                                    Kiralık
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Emlak Türü Panel */}
            <Card sx={{ 
                flex: 1,
                background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
                borderRadius: 4,
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #475569, #334155, #64748b)',
                    opacity: 0.8
                },
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }
            }}>
                <CardContent sx={{ p: 2.5, height: '100%' }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        mb: 2.5 
                    }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2, 
                            textAlign: 'center', 
                            fontWeight: 700,
                            color: '#1f2937',
                            fontSize: '1rem',
                            letterSpacing: '-0.3px'
                        }}>
                            Emlak Türü
                        </Typography>
                        <Box sx={{ 
                            width: '50px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #64748b, #475569)',
                            borderRadius: '2px',
                            opacity: 0.7
                        }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {['KONUT', 'TICARI', 'OFIS', 'ENDUSTRIYEL', 'ARSA', 'HIZMET'].map((type, index) => (
                            <Box
                                key={type}
                                onClick={() => {
                                    setPropertyType(type);
                                    setSubtype('');
                                }}
                                sx={{
                                    p: 1.8,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    background: propertyType === type 
                                        ? 'linear-gradient(135deg, #475569 0%, #334155 100%)' 
                                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                    border: `2px solid ${propertyType === type ? '#475569' : 'transparent'}`,
                                    color: propertyType === type ? 'white' : '#475569',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: propertyType === type ? 'translateX(8px)' : 'translateX(0)',
                                    boxShadow: propertyType === type 
                                        ? '0 6px 20px rgba(71, 85, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                        : '0 2px 8px rgba(0,0,0,0.04)',
                                    animation: `slideInLeft 0.4s ease ${index * 0.1}s both`,
                                    '&:hover': {
                                        transform: propertyType === type ? 'translateX(12px)' : 'translateX(6px)',
                                        boxShadow: propertyType === type 
                                            ? '0 8px 25px rgba(71, 85, 105, 0.3)' 
                                            : '0 4px 15px rgba(0,0,0,0.08)',
                                        borderColor: propertyType === type ? '#334155' : '#475569',
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    {propertyType === type && (
                                        <CheckIcon sx={{ 
                                            fontSize: 16, 
                                            mr: 1.5, 
                                            color: 'white',
                                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                        }} />
                                    )}
                                    <Box sx={{ mr: 1, color: propertyType === type ? 'white' : '#475569' }}>
                                        {propertyTypeIcons[type as keyof typeof propertyTypeIcons]}
                                    </Box>
                                    <Typography sx={{ 
                                        fontWeight: 600, 
                                        fontSize: '0.85rem',
                                        letterSpacing: '-0.2px'
                                    }}>
                                        {type === 'KONUT' ? 'Konut' :
                                         type === 'TICARI' ? 'Ticari' :
                                         type === 'OFIS' ? 'Ofis' :
                                         type === 'ENDUSTRIYEL' ? 'Endüstriyel' :
                                         type === 'ARSA' ? 'Arsa' : 'Hizmet'}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Alt Kategori Panel */}
            <Card sx={{ 
                flex: 1,
                background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
                borderRadius: 4,
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                height: '500px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #475569, #334155, #64748b)',
                    opacity: 0.8
                },
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }
            }}>
                <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        mb: 2.5 
                    }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2, 
                            textAlign: 'center', 
                            fontWeight: 700,
                            color: '#1f2937',
                            fontSize: '1rem',
                            letterSpacing: '-0.3px'
                        }}>
                            Detay Seçimi
                        </Typography>
                        <Box sx={{ 
                            width: '50px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #64748b, #475569)',
                            borderRadius: '2px',
                            opacity: 0.7
                        }} />
                    </Box>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 1, 
                        flex: 1,
                        overflowY: 'auto',
                        pr: 1,
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                            borderRadius: '10px',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                            '&:hover': {
                                background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                            }
                        }
                    }}>
                        {propertyType && subtypeOptions[propertyType as keyof typeof subtypeOptions]?.map((sub, index) => (
                            <Box
                                key={sub}
                                onClick={() => setSubtype(sub)}
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    background: subtype === sub 
                                        ? 'linear-gradient(135deg, #475569 0%, #334155 100%)' 
                                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                    border: `2px solid ${subtype === sub ? '#475569' : 'transparent'}`,
                                    color: subtype === sub ? 'white' : '#475569',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: subtype === sub ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: subtype === sub 
                                        ? '0 6px 20px rgba(71, 85, 105, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                                        : '0 2px 8px rgba(0,0,0,0.04)',
                                    animation: propertyType ? `fadeInUp 0.4s ease ${index * 0.05}s both` : 'none',
                                    '&:hover': {
                                        transform: 'scale(1.04)',
                                        boxShadow: subtype === sub 
                                            ? '0 8px 25px rgba(71, 85, 105, 0.3)' 
                                            : '0 4px 15px rgba(0,0,0,0.08)',
                                        borderColor: subtype === sub ? '#334155' : '#475569',
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    {subtype === sub && (
                                        <CheckIcon sx={{ 
                                            fontSize: 14, 
                                            mr: 1, 
                                            color: 'white',
                                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                                        }} />
                                    )}
                                    <Typography sx={{ 
                                        fontWeight: 600, 
                                        fontSize: '0.85rem',
                                        letterSpacing: '-0.2px'
                                    }}>
                                        {subtypeLabels[sub as keyof typeof subtypeLabels]}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {!propertyType && (
                            <Box sx={{
                                p: 2.5,
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                                borderRadius: 3,
                                border: '2px dashed #64748b',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'radial-gradient(circle, rgba(100,116,139,0.1) 0%, transparent 70%)',
                                    animation: 'pulse 3s ease-in-out infinite'
                                }
                            }}>
                                <Typography variant="body2" sx={{ 
                                    color: '#475569',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    ✨ Önce emlak türü seçin
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Chip
} from '@mui/material';
import {
    Home,
    Business,
    CorporateFare,
    Factory,
    Landscape,
    MiscellaneousServices,
    SquareFoot,
    CalendarToday,
    LocationOn,
    CheckCircle
} from '@mui/icons-material';

interface StepThreeProps {
    listingType: string;
    propertyType: string;
    subtype: string;
    details: any;
    setDetails: (details: any) => void;
}

export default function StepThree({ 
    listingType, 
    propertyType, 
    subtype,
    details,
    setDetails
}: StepThreeProps) {

    const propertyTypeIcons = {
        KONUT: <Home sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />,
        TICARI: <Business sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />,
        OFIS: <CorporateFare sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />,
        ENDUSTRIYEL: <Factory sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />,
        ARSA: <Landscape sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />,
        HIZMET: <MiscellaneousServices sx={{ fontSize: 20, mr: 1, color: '#ed9517' }} />
    };

    const subtypeLabels = {
        // Konut
        DAIRE: 'Daire',
        MUSTAKIL_EV: 'Müstakil Ev', 
        VILLA: 'Villa',
        REZIDANS: 'Rezidans',
        YAZLIK: 'Yazlık',
        // Ticari
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
        // Ofis
        OFIS: 'Ofis',
        BÜRO: 'Büro',
        COWORKING: 'Coworking',
        CALL_CENTER: 'Call Center',
        TOPLANTI_SALONU: 'Toplantı Salonu',
        MUAYENEHANE: 'Muayenehane',
        AVUKATLIK_BÜROSU: 'Avukatlık Bürosu',
        MUHASEBE_OFISI: 'Muhasebe Ofisi',
        // Endüstriyel
        FABRIKA: 'Fabrika',
        ATOLYE: 'Atölye',
        IMALATHANE: 'İmalathane',
        DEPO: 'Depo',
        SOGUK_HAVA_DEPOSU: 'Soğuk Hava Deposu',
        ANTREPO: 'Antrepo',
        LABORATUVAR: 'Laboratuvar',
        URETIM_TESISI: 'Üretim Tesisi',
        // Arsa
        KONUT_ARSASI: 'Konut Arsası',
        TICARI_ARSA: 'Ticari Arsa',
        TARLA: 'Tarla',
        BAG_BAHCE: 'Bağ & Bahçe',
        // Hizmet
        OTOPARK: 'Otopark',
        SPOR_SALONU: 'Spor Salonu',
        YIKAMA: 'Yıkama',
        OTO_SERVIS: 'Oto Servis',
        BENZIN_ISTASYONU: 'Benzin İstasyonu',
        KARGO_MERKEZI: 'Kargo Merkezi',
        TEMIZLIK_MERKEZI: 'Temizlik Merkezi'
    };

    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

    const renderHeaderCard = () => (
        <Card sx={{ 
            background: 'linear-gradient(135deg, #ed9517 0%, #f59e0b 50%, #d97706 100%)',
            borderRadius: 4,
            mb: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
            },
            boxShadow: '0 20px 40px rgba(237, 149, 23, 0.3), 0 8px 16px rgba(0,0,0,0.1)',
            transform: 'perspective(1000px) rotateX(2deg)',
            animation: 'float 6s ease-in-out infinite'
        }}>
            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 2,
                        p: 2,
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        {propertyTypeIcons[propertyType as keyof typeof propertyTypeIcons]}
                        <Typography variant="h5" sx={{ 
                            fontWeight: 700,
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            letterSpacing: '0.5px'
                        }}>
                            {subtypeLabels[subtype as keyof typeof subtypeLabels]} Özellikleri
                        </Typography>
                    </Box>
                    
                    <Chip 
                        label={`${listingType === 'SALE' ? 'Satılık' : 'Kiralık'} İlan`}
                        sx={{ 
                            background: 'rgba(255,255,255,0.9)',
                            color: '#ed9517',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            px: 2,
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                    
                    <Typography variant="body1" sx={{ 
                        mt: 2,
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 500,
                        maxWidth: '600px',
                        lineHeight: 1.6
                    }}>
                        Emlak ilanınızın özelliklerini belirterek daha etkili bir sunum yapın
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    const renderHousingDetails = () => (
        <Card sx={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 4,
            border: 'none',
            position: 'relative',
            overflow: 'visible',
            mb: 3,
            minHeight: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ed9517, #f59e0b, #ed9517)',
                borderRadius: '4px 4px 0 0'
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f1f5f9'
                }}>
                    <Home sx={{ fontSize: 24, mr: 2, color: '#ed9517' }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '1.3rem'
                    }}>
                        Konut Özellikleri
                    </Typography>
                </Box>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            label="Oda Planı"
                            value={details.roomPlan || ''}
                            onChange={(e) => handleDetailChange('roomPlan', e.target.value)}
                            placeholder="2+1, 3+1 vb."
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Net Alan (m²)"
                            value={details.netArea || ''}
                            onChange={(e) => handleDetailChange('netArea', parseInt(e.target.value))}
                            InputProps={{
                                startAdornment: <SquareFoot sx={{ color: '#ed9517', mr: 1 }} />,
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bina Yaşı"
                            value={details.buildingAge || ''}
                            onChange={(e) => handleDetailChange('buildingAge', parseInt(e.target.value))}
                            InputProps={{
                                startAdornment: <CalendarToday sx={{ color: '#ed9517', mr: 1 }} />,
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bulunduğu Kat"
                            value={details.floorNo || ''}
                            onChange={(e) => handleDetailChange('floorNo', parseInt(e.target.value))}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Toplam Kat Sayısı"
                            value={details.totalFloors || ''}
                            onChange={(e) => handleDetailChange('totalFloors', parseInt(e.target.value))}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#ed9517' } }}>Isıtma Tipi</InputLabel>
                            <Select
                                value={details.heatingType || ''}
                                onChange={(e) => handleDetailChange('heatingType', e.target.value)}
                                label="Isıtma Tipi"
                                sx={{
                                    borderRadius: 3,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                }}
                            >
                                <MenuItem value="DOGALGAZ">Doğalgaz</MenuItem>
                                <MenuItem value="ELEKTRIK">Elektrik</MenuItem>
                                <MenuItem value="KOMBI">Kombi</MenuItem>
                                <MenuItem value="KALORIFER">Kalorifer</MenuItem>
                                <MenuItem value="KLIMA">Klima</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
                            Ek Özellikler
                        </Typography>
                        <Grid container spacing={2}>
                            {[
                                { key: 'balcony', label: 'Balkon' },
                                { key: 'elevator', label: 'Asansör' },
                                { key: 'parking', label: 'Otopark' },
                                { key: 'garden', label: 'Bahçe' },
                                { key: 'pool', label: 'Havuz' },
                                { key: 'security', label: 'Güvenlik' }
                            ].map((feature) => (
                                <Grid item xs={6} sm={4} md={3} key={feature.key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details[feature.key] || false}
                                                onChange={(e) => handleDetailChange(feature.key, e.target.checked)}
                                                sx={{
                                                    color: '#d1d5db',
                                                    '&.Mui-checked': { color: '#ed9517' },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {details[feature.key] && <CheckCircle sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />}
                                                <Typography variant="body2" sx={{ color: '#374151' }}>
                                                    {feature.label}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    const renderCommercialDetails = () => (
        <Card sx={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 4,
            border: 'none',
            position: 'relative',
            overflow: 'visible',
            mb: 3,
            minHeight: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ed9517, #f59e0b, #ed9517)',
                borderRadius: '4px 4px 0 0'
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f1f5f9'
                }}>
                    <Business sx={{ fontSize: 24, mr: 2, color: '#ed9517' }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '1.3rem'
                    }}>
                        Ticari Özellikler
                    </Typography>
                </Box>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Alan (m²)"
                            value={details.area || ''}
                            onChange={(e) => handleDetailChange('area', parseInt(e.target.value))}
                            InputProps={{
                                startAdornment: <SquareFoot sx={{ color: '#ed9517', mr: 1 }} />,
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bina Yaşı"
                            value={details.buildingAge || ''}
                            onChange={(e) => handleDetailChange('buildingAge', parseInt(e.target.value))}
                            InputProps={{
                                startAdornment: <CalendarToday sx={{ color: '#ed9517', mr: 1 }} />,
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#ed9517' } }}>Isıtma Tipi</InputLabel>
                            <Select
                                value={details.heatingType || ''}
                                onChange={(e) => handleDetailChange('heatingType', e.target.value)}
                                label="Isıtma Tipi"
                                sx={{
                                    borderRadius: 3,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                }}
                            >
                                <MenuItem value="DOGALGAZ">Doğalgaz</MenuItem>
                                <MenuItem value="ELEKTRIK">Elektrik</MenuItem>
                                <MenuItem value="KLIMA">Klima</MenuItem>
                                <MenuItem value="YOK">Yok</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
                            Ticari Özellikler
                        </Typography>
                        <Grid container spacing={2}>
                            {[
                                { key: 'parkingLot', label: 'Otopark' },
                                { key: 'security', label: 'Güvenlik' },
                                { key: 'airConditioning', label: 'Klima' },
                                { key: 'internet', label: 'İnternet' },
                                { key: 'kitchen', label: 'Mutfak' },
                                { key: 'toilet', label: 'Tuvalet' }
                            ].map((feature) => (
                                <Grid item xs={6} sm={4} md={3} key={feature.key}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={details[feature.key] || false}
                                                onChange={(e) => handleDetailChange(feature.key, e.target.checked)}
                                                sx={{
                                                    color: '#d1d5db',
                                                    '&.Mui-checked': { color: '#ed9517' },
                                                }}
                                            />
                                        }
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {details[feature.key] && <CheckCircle sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />}
                                                <Typography variant="body2" sx={{ color: '#374151' }}>
                                                    {feature.label}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    // Diğer property type'lar için de benzer render fonksiyonları...
    const renderOfficeDetails = () => renderCommercialDetails(); // Ofis için ticari ile aynı alanlar
    const renderIndustrialDetails = () => renderCommercialDetails(); // Endüstriyel için de benzer
    const renderLandDetails = () => (
        <Card sx={{ 
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: 4,
            border: 'none',
            position: 'relative',
            overflow: 'visible',
            mb: 3,
            minHeight: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 1px 8px rgba(0,0,0,0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)',
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ed9517, #f59e0b, #ed9517)',
                borderRadius: '4px 4px 0 0'
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: '2px solid #f1f5f9'
                }}>
                    <Landscape sx={{ fontSize: 24, mr: 2, color: '#ed9517' }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700,
                        color: '#1f2937',
                        fontSize: '1.3rem'
                    }}>
                        Arsa Özellikleri
                    </Typography>
                </Box>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Arsa Alanı (m²)"
                            value={details.landArea || ''}
                            onChange={(e) => handleDetailChange('landArea', parseInt(e.target.value))}
                            InputProps={{
                                startAdornment: <SquareFoot sx={{ color: '#ed9517', mr: 1 }} />,
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': { borderColor: '#ed9517' },
                                    '&.Mui-focused fieldset': { borderColor: '#ed9517' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#ed9517' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#ed9517' } }}>İmar Durumu</InputLabel>
                            <Select
                                value={details.zoningStatus || ''}
                                onChange={(e) => handleDetailChange('zoningStatus', e.target.value)}
                                label="İmar Durumu"
                                sx={{
                                    borderRadius: 3,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ed9517' },
                                }}
                            >
                                <MenuItem value="IMARI">İmarlı</MenuItem>
                                <MenuItem value="IMARSIZ">İmarsız</MenuItem>
                                <MenuItem value="TARLA">Tarla</MenuItem>
                                <MenuItem value="BAHCE">Bahçe</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
    
    const renderServiceDetails = () => renderCommercialDetails(); // Hizmet için ticari ile aynı

    const renderPropertyDetails = () => {
        switch (propertyType) {
            case 'KONUT':
                return renderHousingDetails();
            case 'TICARI':
                return renderCommercialDetails();
            case 'OFIS':
                return renderOfficeDetails();
            case 'ENDUSTRIYEL':
                return renderIndustrialDetails();
            case 'ARSA':
                return renderLandDetails();
            case 'HIZMET':
                return renderServiceDetails();
            default:
                return null;
        }
    };

    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column",
            gap: 3, 
            width: "100%", 
            padding: 3,
            backgroundColor: 'transparent',
            maxHeight: '80vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f5f9',
                borderRadius: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'linear-gradient(180deg, #ed9517 0%, #d97706 100%)',
                borderRadius: '12px',
                '&:hover': {
                    background: 'linear-gradient(180deg, #d97706 0%, #b45309 100%)',
                }
            },
            // Floating animation
            '@keyframes float': {
                '0%, 100%': {
                    transform: 'perspective(1000px) rotateX(2deg) translateY(0px)'
                },
                '50%': {
                    transform: 'perspective(1000px) rotateX(2deg) translateY(-5px)'
                }
            }
        }}>
            {renderHeaderCard()}
            {renderPropertyDetails()}
        </Box>
    );
}

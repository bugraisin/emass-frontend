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
    Divider
} from '@mui/material';
import { SquareFoot, CalendarToday } from '@mui/icons-material';

interface HousingDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function HousingDetails({ details, setDetails }: HousingDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

    const getBooleanValue = (key: string): boolean => {
        return details[key] === true;
    };

    const featureCategories = [
        {
            title: 'Temel Özellikler',
            features: [
                { key: 'furnished', label: 'Eşyalı' },
                { key: 'balcony', label: 'Balkon' },
                { key: 'terrace', label: 'Teras' },
                { key: 'garden', label: 'Bahçe' },
                { key: 'withinSite', label: 'Site İçerisinde' },
            ]
        },
        {
            title: 'Otopark',
            features: [
                { key: 'openPark', label: 'Açık Otopark' },
                { key: 'closedPark', label: 'Kapalı Otopark' },
                { key: 'garagePark', label: 'Garaj' },
            ]
        },
        {
            title: 'Bina & Güvenlik',
            features: [
                { key: 'elevator', label: 'Asansör' },
                { key: 'security', label: 'Güvenlik' },
                { key: 'concierge', label: 'Kapıcı' },
                { key: 'generator', label: 'Jeneratör' },
            ]
        },
        {
            title: 'Konfor & Isıtma',
            features: [
                { key: 'airConditioning', label: 'Klima' },
                { key: 'floorHeating', label: 'Yerden Isıtma' },
                { key: 'fireplace', label: 'Şömine' },
            ]
        },
        {
            title: 'Mutfak & İç Mekan',
            features: [
                { key: 'builtinKitchen', label: 'Ankastre Mutfak' },
                { key: 'separateKitchen', label: 'Ayrı Mutfak' },
                { key: 'americanKitchen', label: 'Amerikan Mutfak' },
                { key: 'laundryRoom', label: 'Çamaşır Odası' },
            ]
        },
        {
            title: 'Site İmkanları',
            features: [
                { key: 'pool', label: 'Havuz' },
                { key: 'gym', label: 'Spor Salonu' },
                { key: 'childrenPlayground', label: 'Çocuk Oyun Alanı' },
                { key: 'sportsArea', label: 'Spor Alanları' },
            ]
        }
    ];

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: 2,
            border: '1px solid rgba(0, 0, 0, 0.12)',
            mb: 3
        }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '16px',
                    mb: 1
                }}>
                    Konut Özellikleri
                </Typography>

                <Grid container spacing={1}>
                    {/* Temel Bilgiler */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Oda Sayısı</InputLabel>
                            <Select
                                value={details.roomCount || ''}
                                onChange={(e) => handleDetailChange('roomCount', e.target.value)}
                                label="Oda Sayısı"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                            overflowY: 'auto'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="1+0">1+0</MenuItem>
                                <MenuItem value="1+1">1+1</MenuItem>
                                <MenuItem value="2+1">2+1</MenuItem>
                                <MenuItem value="2+2">2+2</MenuItem>
                                <MenuItem value="3+1">3+1</MenuItem>
                                <MenuItem value="3+2">3+2</MenuItem>
                                <MenuItem value="4+1">4+1</MenuItem>
                                <MenuItem value="4+2">4+2</MenuItem>
                                <MenuItem value="5+1">5+1</MenuItem>
                                <MenuItem value="5+2">5+2</MenuItem>
                                <MenuItem value="6+1">6+1</MenuItem>
                                <MenuItem value="6+2">6+2</MenuItem>
                                <MenuItem value="7+1">7+1</MenuItem>
                                <MenuItem value="7+2">7+2</MenuItem>
                                <MenuItem value="8+1">8+1</MenuItem>
                                <MenuItem value="8+2">8+2</MenuItem>
                                <MenuItem value="9+1">9+1</MenuItem>
                                <MenuItem value="9+2">9+2</MenuItem>
                                <MenuItem value="10+">10+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Brüt Alan (m²)"
                            value={details.grossArea || ''}
                            onChange={(e) => handleDetailChange('grossArea', parseInt(e.target.value))}
                            InputProps={{
                                autoComplete: 'off',
                                startAdornment: <SquareFoot sx={{ color: '#64748b', mr: 1, fontSize: 18 }} />,
                            }}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
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
                                autoComplete: 'off',
                                startAdornment: <SquareFoot sx={{ color: '#64748b', mr: 1, fontSize: 18 }} />,
                            }}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    {/* Bina Bilgileri */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Bina Yaşı</InputLabel>
                            <Select
                                value={details.buildingAge || ''}
                                onChange={(e) => handleDetailChange('buildingAge', e.target.value)}
                                label="Bina Yaşı"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="0">0 (Yeni)</MenuItem>
                                <MenuItem value="1-5">1-5 arası</MenuItem>
                                <MenuItem value="6-10">6-10 arası</MenuItem>
                                <MenuItem value="11-15">11-15 arası</MenuItem>
                                <MenuItem value="16-20">16-20 arası</MenuItem>
                                <MenuItem value="21-25">21-25 arası</MenuItem>
                                <MenuItem value="26-30">26-30 arası</MenuItem>
                                <MenuItem value="31+">31 üzeri</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bulunduğu Kat"
                            value={details.floorNo || ''}
                            onChange={(e) => handleDetailChange('floorNo', parseInt(e.target.value))}
                            variant="outlined"
                            autoComplete='off'
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
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
                            autoComplete='off'
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    {/* Sistem ve Özellikler */}
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Isıtma Tipi</InputLabel>
                            <Select
                                value={details.heatingType || ''}
                                onChange={(e) => handleDetailChange('heatingType', e.target.value)}
                                label="Isıtma Tipi"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="DOGALGAZ">Doğalgaz (Kombi)</MenuItem>
                                <MenuItem value="MERKEZI">Merkezi Sistem</MenuItem>
                                <MenuItem value="KALORIFER">Kalorifer</MenuItem>
                                <MenuItem value="KLIMA">Klima</MenuItem>
                                <MenuItem value="ELEKTRIKLI">Elektrikli</MenuItem>
                                <MenuItem value="SOBALI">Sobalı</MenuItem>
                                <MenuItem value="YOK">Yok</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Banyo Sayısı"
                            value={details.bathroomCount || ''}
                            onChange={(e) => handleDetailChange('bathroomCount', parseInt(e.target.value))}
                            variant="outlined"
                            autoComplete='off'
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Tapu Durumu</InputLabel>
                            <Select
                                value={details.titleDeedStatus || ''}
                                onChange={(e) => handleDetailChange('titleDeedStatus', e.target.value)}
                                label="Tapu Durumu"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="KAT_MULKIYETLI">Kat Mülkiyetli</MenuItem>
                                <MenuItem value="KAT_IRTIFAKLI">Kat İrtifaklı</MenuItem>
                                <MenuItem value="ARSA_PAYLI">Arsa Paylı</MenuItem>
                                <MenuItem value="MUSTERI_UZERINDE">Müşteri Üzerinde</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Cephe Yönü</InputLabel>
                            <Select
                                value={details.facadeDirection || ''}
                                onChange={(e) => handleDetailChange('facadeDirection', e.target.value)}
                                label="Cephe Yönü"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="KUZEY">Kuzey</MenuItem>
                                <MenuItem value="GUNEY">Güney</MenuItem>
                                <MenuItem value="DOGU">Doğu</MenuItem>
                                <MenuItem value="BATI">Batı</MenuItem>
                                <MenuItem value="KUZEY_DOGU">Kuzey-Doğu</MenuItem>
                                <MenuItem value="KUZEY_BATI">Kuzey-Batı</MenuItem>
                                <MenuItem value="GUNEY_DOGU">Güney-Doğu</MenuItem>
                                <MenuItem value="GUNEY_BATI">Güney-Batı</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            label="Site/Apartman Adı"
                            value={details.siteName || ''}
                            onChange={(e) => handleDetailChange('siteName', e.target.value)}
                            variant="outlined"
                            autoComplete='off'
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Aidat (₺)"
                            value={details.siteFee || ''}
                            onChange={(e) => handleDetailChange('siteFee', parseInt(e.target.value))}
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Depozito (₺)"
                            value={details.deposit || ''}
                            onChange={(e) => handleDetailChange('deposit', parseInt(e.target.value))}
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    '&:hover fieldset': { borderColor: '#1e293b' },
                                    '&.Mui-focused fieldset': { borderColor: '#1e293b' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#1e293b' },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Kullanım Durumu</InputLabel>
                            <Select
                                value={details.usageStatus || ''}
                                onChange={(e) => handleDetailChange('usageStatus', e.target.value)}
                                label="Kullanım Durumu"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="BOS">Boş</MenuItem>
                                <MenuItem value="KIRACI_VAR">Kiracı Var</MenuItem>
                                <MenuItem value="MAL_SAHIBI_OTURUYOR">Mal Sahibi Oturuyor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Ek Özellikler - Boolean Fix */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{
                            mt: 2,
                            fontWeight: 600,
                            color: '#1e293b',
                            fontSize: '14px'
                        }}>
                            Ek Özellikler
                        </Typography>

                        <Grid container spacing={1}>
                            {featureCategories.map((category, categoryIndex) => (
                                <Grid item xs={12} sm={6} md={4} key={categoryIndex}>
                                    <Box sx={{
                                        p: 1,
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 1,
                                        backgroundColor: '#f8fafc',
                                        minHeight: 150,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Typography variant="subtitle2" sx={{
                                            mb: 1.5,
                                            fontWeight: 600,
                                            color: '#334155',
                                            fontSize: '13px'
                                        }}>
                                            {category.title}
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1
                                        }}>
                                            {category.features.map((feature) => (
                                                <FormControlLabel
                                                    key={feature.key}
                                                    control={
                                                        <Checkbox
                                                            checked={getBooleanValue(feature.key)}
                                                            onChange={(e) => handleDetailChange(feature.key, e.target.checked)}
                                                            sx={{
                                                                color: '#94a3b8',
                                                                '&.Mui-checked': { color: '#1e293b' },
                                                                '& .MuiSvgIcon-root': { fontSize: 16 },
                                                                p: 0.25
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2" sx={{
                                                            color: '#475569',
                                                            fontSize: '12px'
                                                        }}>
                                                            {feature.label}
                                                        </Typography>
                                                    }
                                                    sx={{
                                                        margin: 0,
                                                        alignItems: 'center',
                                                        '& .MuiFormControlLabel-label': {
                                                            paddingLeft: '6px'
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
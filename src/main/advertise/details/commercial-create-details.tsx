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
    Checkbox
} from '@mui/material';
import { SquareFoot, CalendarToday } from '@mui/icons-material';

interface CommercialDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function CommercialDetails({ details, setDetails }: CommercialDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

    const featureCategories = [
        {
            title: 'Temel Özellikler',
            features: [
                { key: 'furnished', label: 'Eşyalı' },
                { key: 'parking', label: 'Otopark' },
                { key: 'security', label: 'Güvenlik' },
                { key: 'elevator', label: 'Asansör' },
                { key: 'generator', label: 'Jeneratör' },
            ]
        },
        {
            title: 'Konfor & Sistem',
            features: [
                { key: 'airConditioning', label: 'Klima' },
                { key: 'internet', label: 'İnternet' },
                { key: 'kitchen', label: 'Mutfak' },
                { key: 'toilet', label: 'Tuvalet' },
            ]
        },
        {
            title: 'Ticari Özel Alanlar',
            features: [
                { key: 'showcase', label: 'Vitrin' },
                { key: 'warehouse', label: 'Depo Alanı' },
                { key: 'loadingDock', label: 'Yükleme Rampası' },
                { key: 'cashRegister', label: 'Kasa Alanı' },
            ]
        },
        {
            title: 'Müşteri Alanları',
            features: [
                { key: 'outdoorSeating', label: 'Dış Mekan Oturma' },
                { key: 'waitingArea', label: 'Bekleme Alanı' },
                { key: 'changingRoom', label: 'Soyunma Odası' },
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
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '16px',
                    mb: 3
                }}>
                    Ticari Özellikler
                </Typography>
                
                <Grid container spacing={2}>
                    {/* Temel Bilgiler */}
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

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bina Yaşı"
                            value={details.buildingAge || ''}
                            onChange={(e) => handleDetailChange('buildingAge', parseInt(e.target.value))}
                            InputProps={{
                                autoComplete: 'off',
                                startAdornment: <CalendarToday sx={{ color: '#64748b', mr: 1, fontSize: 18 }} />,
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
                                <MenuItem value="DOGALGAZ">Doğalgaz</MenuItem>
                                <MenuItem value="MERKEZI">Merkezi Sistem</MenuItem>
                                <MenuItem value="SOBALI">Sobalı</MenuItem>
                                <MenuItem value="YOK">Yok</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="WC Sayısı"
                            value={details.wcCount || ''}
                            onChange={(e) => handleDetailChange('wcCount', parseInt(e.target.value))}
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

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Bina Tipi</InputLabel>
                            <Select
                                value={details.buildingType || ''}
                                onChange={(e) => handleDetailChange('buildingType', e.target.value)}
                                label="Bina Tipi"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="APARTMAN">Apartman</MenuItem>
                                <MenuItem value="PLAZA">Plaza/İş Merkezi</MenuItem>
                                <MenuItem value="MUSTAKIL">Müstakil Bina</MenuItem>
                                <MenuItem value="PASAJ">Pasaj</MenuItem>
                                <MenuItem value="AVM">AVM</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Ek Özellikler */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ 
                            mt: 2,
                            mb: 1, 
                            fontWeight: 600, 
                            color: '#1e293b',
                            fontSize: '14px'
                        }}>
                            Ek Özellikler
                        </Typography>

                        <Grid container spacing={3}>
                            {featureCategories.map((category, categoryIndex) => (
                                <Grid item xs={12} sm={6} md={3} key={categoryIndex}>
                                    <Box sx={{ 
                                        p: 2, 
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 1,
                                        backgroundColor: '#f8fafc'
                                    }}>
                                        <Typography variant="subtitle2" sx={{ 
                                            mb: 1.5, 
                                            fontWeight: 600,
                                            color: '#334155',
                                            fontSize: '13px'
                                        }}>
                                            {category.title}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            {category.features.map((feature) => (
                                                <FormControlLabel
                                                    key={feature.key}
                                                    control={
                                                        <Checkbox
                                                            checked={details[feature.key] || false}
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
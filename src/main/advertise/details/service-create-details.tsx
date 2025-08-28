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
import { SquareFoot, People } from '@mui/icons-material';

interface ServiceDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function ServiceDetails({ details, setDetails }: ServiceDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

    const featureCategories = [
        {
            title: 'Temel Altyapı',
            features: [
                { key: 'security', label: 'Güvenlik' },
                { key: 'lighting', label: 'Aydınlatma' },
                { key: 'cctv', label: 'Güvenlik Kamerası' },
                { key: 'internet', label: 'İnternet' },
            ]
        },
        {
            title: 'Hizmet Alanları',
            features: [
                { key: 'reception', label: 'Resepsiyon' },
                { key: 'restRoom', label: 'Tuvalet' },
                { key: 'kitchen', label: 'Mutfak' },
            ]
        },
        {
            title: 'Teknik Donanım',
            features: [
                { key: 'washingArea', label: 'Yıkama Sistemi' },
                { key: 'maintenanceArea', label: 'Bakım/Onarım Alanı' },
                { key: 'airConditioning', label: 'Klima Sistemi' },
                { key: 'ventilationSystem', label: 'Havalandırma' },
            ]
        },
        {
            title: 'Ek Hizmetler',
            features: [ 
                { key: 'storage', label: 'Depolama Alanı' },
                { key: 'officeArea', label: 'Ofis Alanı' },
                { key: 'customerParking', label: 'Müşteri Otoparkı' },
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
                    Hizmet Alanı Özellikleri
                </Typography>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Alan (m²)"
                            value={details.area || ''}
                            onChange={(e) => handleDetailChange('area', parseInt(e.target.value))}
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
                            label="Kapasite/Araç Sayısı"
                            value={details.capacity || ''}
                            onChange={(e) => handleDetailChange('capacity', parseInt(e.target.value))}
                            InputProps={{
                                autoComplete: 'off',
                                startAdornment: <People sx={{ color: '#64748b', mr: 1, fontSize: 18 }} />,
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
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Mekan Tipi</InputLabel>
                            <Select
                                value={details.spaceType || ''}
                                onChange={(e) => handleDetailChange('spaceType', e.target.value)}
                                label="Mekan Tipi"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="KAPALI">Kapalı Mekan</MenuItem>
                                <MenuItem value="ACIK">Açık Alan</MenuItem>
                                <MenuItem value="YARI_KAPALI">Yarı Kapalı</MenuItem>
                                <MenuItem value="KARISIK">Karışık (Kapalı+Açık)</MenuItem>
                            </Select>
                        </FormControl>
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
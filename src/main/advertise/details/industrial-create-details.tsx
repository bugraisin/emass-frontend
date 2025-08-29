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
import { SquareFoot, Height } from '@mui/icons-material';

interface IndustrialDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function IndustrialDetails({ details, setDetails }: IndustrialDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

    const featureCategories = [
        {
            title: 'Altyapı & Enerji',
            features: [
                { key: 'threephaseElectricity', label: 'Üç Fazlı Elektrik' },
                { key: 'naturalGasLine', label: 'Doğalgaz Hattı' },
                { key: 'steamLine', label: 'Buhar Hattı' },
                { key: 'waterSystem', label: 'Su Sistemi' },
                { key: 'wasteWaterSystem', label: 'Atık Su Sistemi' },
            ]
        },
        {
            title: 'Üretim & İmalat',
            features: [
                { key: 'craneSystem', label: 'Vinç Sistemi' },
                { key: 'ventilationSystem', label: 'Havalandırma Sistemi' },
                { key: 'airConditioning', label: 'Klima Sistemi' },
                { key: 'wideOpenArea', label: 'Geniş Açık Alan' },
                { key: 'machineMountingSuitable', label: 'Makine Montajı Uygun' },
            ]
        },
        {
            title: 'Depolama & Lojistik',
            features: [
                { key: 'loadingRamp', label: 'Yükleme Rampası' },
                { key: 'truckEntrance', label: 'TIR Girişi' },
                { key: 'forkliftTraffic', label: 'Forklift Trafiği' },
                { key: 'rackingSystem', label: 'Raf Sistemi' },
                { key: 'coldStorage', label: 'Soğuk Depolama' },
            ]
        },
        {
            title: 'Güvenlik & Sistem',
            features: [
                { key: 'fireExtinguishingSystem', label: 'Yangın Söndürme Sistemi' },
                { key: 'securityCameras', label: 'Güvenlik Kameraları' },
                { key: 'alarmSystem', label: 'Alarm Sistemi' },
                { key: 'fencedArea', label: 'Çitli/Bariyerli Alan' },
                { key: 'security', label: 'Güvenlik' },
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
                    Endüstriyel Özellikler
                </Typography>
                
                <Grid container spacing={1}>
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
                            label="Bölüm Sayısı"
                            value={details.roomCount || ''}
                            onChange={(e) => handleDetailChange('roomCount', parseInt(e.target.value))}
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
                            label="Kat Sayısı"
                            value={details.floorCount || ''}
                            onChange={(e) => handleDetailChange('floorCount', parseInt(e.target.value))}
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
                            label="Tavan Yüksekliği (m)"
                            value={details.ceilingHeight || ''}
                            onChange={(e) => handleDetailChange('ceilingHeight', parseFloat(e.target.value))}
                            InputProps={{
                                autoComplete: 'off',
                                startAdornment: <Height sx={{ color: '#64748b', mr: 1, fontSize: 18 }} />,
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

                    {/* Ek Özellikler */}
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
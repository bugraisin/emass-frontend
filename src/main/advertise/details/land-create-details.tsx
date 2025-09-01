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
import { SquareFoot } from '@mui/icons-material';

interface LandDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function LandDetails({ details, setDetails }: LandDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

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
                    mb: 2
                }}>
                    Arsa Özellikleri
                </Typography>
                
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Arsa Alanı (m²)"
                            value={details.landArea || ''}
                            onChange={(e) => handleDetailChange('landArea', parseInt(e.target.value))}
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
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>İmar Durumu</InputLabel>
                            <Select
                                value={details.zoningStatus || ''}
                                onChange={(e) => handleDetailChange('zoningStatus', e.target.value)}
                                label="İmar Durumu"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="IMARI">İmarlı</MenuItem>
                                <MenuItem value="IMARSIZ">İmarsız</MenuItem>
                                <MenuItem value="TARLA">Tarla</MenuItem>
                                <MenuItem value="BAHCE">Bahçe</MenuItem>
                                <MenuItem value="KONUT_IMARI">Konut İmarlı</MenuItem>
                                <MenuItem value="TICARI_IMARI">Ticari İmarlı</MenuItem>
                                <MenuItem value="SANAYI_IMARI">Sanayi İmarlı</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Ada No"
                            value={details.adaNo || ''}
                            onChange={(e) => handleDetailChange('adaNo', parseInt(e.target.value))}
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
                            label="Parsel No"
                            value={details.parcelNo || ''}
                            onChange={(e) => handleDetailChange('parcelNo', parseInt(e.target.value))}
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
                            type="text"
                            label="Pafta No"
                            value={details.paftaNo || ''}
                            onChange={(e) => handleDetailChange('paftaNo', e.target.value)}
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
                            inputProps={{ step: 0.01 }}
                            label="KAKS (Emsal)"
                            value={details.kaks || ''}
                            onChange={(e) => handleDetailChange('kaks', parseFloat(e.target.value))}
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
                            inputProps={{ step: 0.1 }}
                            label="Gabari (m)"
                            value={details.gabari || ''}
                            onChange={(e) => handleDetailChange('gabari', parseFloat(e.target.value))}
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
                                value={details.tapuStatus || ''}
                                onChange={(e) => handleDetailChange('tapuStatus', e.target.value)}
                                label="Tapu Durumu"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="MUSTAKIL">Müstakil Tapulu</MenuItem>
                                <MenuItem value="HISSELI">Hisseli Tapu</MenuItem>
                                <MenuItem value="ARSA_PAYI">Arsa Payı</MenuItem>
                                <MenuItem value="TAPU_BEKLIYOR">Tapu Bekleniyor</MenuItem>
                            </Select>
                        </FormControl>
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
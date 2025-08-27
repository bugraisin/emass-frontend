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

interface ServiceDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function ServiceDetails({ details, setDetails }: ServiceDetailsProps) {
    const handleDetailChange = (field: string, value: any) => {
        setDetails({ ...details, [field]: value });
    };

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
                    Hizmet Özellikleri
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
                            label="Kapasite"
                            value={details.capacity || ''}
                            onChange={(e) => handleDetailChange('capacity', parseInt(e.target.value))}
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
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Kapalılık Durumu</InputLabel>
                            <Select
                                value={details.coverType || ''}
                                onChange={(e) => handleDetailChange('coverType', e.target.value)}
                                label="Kapalılık Durumu"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="KAPALI">Kapalı</MenuItem>
                                <MenuItem value="ACIK">Açık</MenuItem>
                                <MenuItem value="YARI_KAPALI">Yarı Kapalı</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ 
                            mb: 2, 
                            fontWeight: 600, 
                            color: '#1e293b',
                            fontSize: '14px'
                        }}>
                            Ek Özellikler
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {[
                                { key: 'security', label: 'Güvenlik' },
                                { key: 'lighting', label: 'Aydınlatma' },
                                { key: 'parking', label: 'Otopark' },
                                { key: 'valetService', label: 'Vale/Hizmet Personeli' },
                                { key: 'automaticSystem', label: 'Otomatik Sistem' },
                                { key: 'washingArea', label: 'Yıkama Alanı' },
                                { key: 'maintenanceArea', label: 'Bakım Alanı' },
                                { key: 'restRoom', label: 'Dinlenme/WC' },
                                { key: 'storage', label: 'Depo Alanı' },
                                { key: 'cctv', label: 'Güvenlik Kamerası' },
                                { key: 'reception', label: 'Resepsiyon' },
                                { key: 'waitingArea', label: 'Bekleme Alanı' },
                                { key: 'internetWifi', label: 'İnternet/WiFi' },
                                { key: 'airConditioning', label: 'Klima' },
                                { key: 'soundSystem', label: 'Ses Sistemi' },
                                { key: 'equipment', label: 'Ekipman Dahil' }
                            ].map((feature) => (
                                <FormControlLabel
                                    key={feature.key}
                                    control={
                                        <Checkbox
                                            checked={details[feature.key] || false}
                                            onChange={(e) => handleDetailChange(feature.key, e.target.checked)}
                                            sx={{
                                                color: '#94a3b8',
                                                '&.Mui-checked': { color: '#1e293b' },
                                                '& .MuiSvgIcon-root': { fontSize: 18 },
                                                p: 0.5
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ 
                                            color: '#1e293b',
                                            fontSize: '13px',
                                            ml: 0.5
                                        }}>
                                            {feature.label}
                                        </Typography>
                                    }
                                    sx={{
                                        margin: 0,
                                        alignItems: 'center',
                                        '& .MuiFormControlLabel-label': {
                                            paddingLeft: '4px'
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
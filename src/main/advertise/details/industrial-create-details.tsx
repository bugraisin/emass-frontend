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

interface IndustrialDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function IndustrialDetails({ details, setDetails }: IndustrialDetailsProps) {
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
                    Endüstriyel Özellikler
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
                            label="Tavan Yüksekliği (m)"
                            value={details.ceilingHeight || ''}
                            onChange={(e) => handleDetailChange('ceilingHeight', parseFloat(e.target.value))}
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
                            label="Güç Kapasitesi (kW)"
                            value={details.powerCapacity || ''}
                            onChange={(e) => handleDetailChange('powerCapacity', parseInt(e.target.value))}
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
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel sx={{ '&.Mui-focused': { color: '#1e293b' } }}>Sıcaklık Kontrolü</InputLabel>
                            <Select
                                value={details.temperatureControl || ''}
                                onChange={(e) => handleDetailChange('temperatureControl', e.target.value)}
                                label="Sıcaklık Kontrolü"
                                sx={{
                                    borderRadius: 1,
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1e293b' },
                                }}
                            >
                                <MenuItem value="YOK">Yok</MenuItem>
                                <MenuItem value="KLIMA">Klima</MenuItem>
                                <MenuItem value="SOGUK_HAVA">Soğuk Hava</MenuItem>
                                <MenuItem value="DERIN_DONDURUCU">Derin Dondurucu</MenuItem>
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
                            Endüstriyel Özellikler
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {[
                                { key: 'crane', label: 'Vinç' },
                                { key: 'loadingDock', label: 'Yükleme Rampası' },
                                { key: 'truckAccess', label: 'Kamyon Erişimi' },
                                { key: 'railwayAccess', label: 'Demiryolu Erişimi' },
                                { key: 'powerSupply', label: 'Güçlü Elektrik' },
                                { key: 'threePhaseElectricity', label: 'Üç Faz Elektrik' },
                                { key: 'fireSystem', label: 'Yangın Sistemi' },
                                { key: 'security', label: '7/24 Güvenlik' },
                                { key: 'administrativeOffice', label: 'İdari Ofis' },
                                { key: 'weighbridge', label: 'Kantar' },
                                { key: 'forkliftAccess', label: 'Forklift Erişimi' },
                                { key: 'compressedAir', label: 'Basınçlı Hava' },
                                { key: 'ventilationSystem', label: 'Havalandırma Sistemi' },
                                { key: 'wasteManagement', label: 'Atık Yönetimi' },
                                { key: 'laboratoryArea', label: 'Laboratuvar Alanı' },
                                { key: 'qualityControl', label: 'Kalite Kontrol' },
                                { key: 'cleanRoom', label: 'Temiz Oda' },
                                { key: 'waterTank', label: 'Su Deposu' },
                                { key: 'fuelTank', label: 'Yakıt Deposu' }
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
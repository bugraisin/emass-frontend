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
                                <MenuItem value="ELEKTRIK">Elektrik</MenuItem>
                                <MenuItem value="KLIMA">Klima</MenuItem>
                                <MenuItem value="YOK">Yok</MenuItem>
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
                            Ticari Özellikler
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {[
                                { key: 'furnished', label: 'Eşyalı' },
                                { key: 'parkingLot', label: 'Otopark' },
                                { key: 'security', label: 'Güvenlik' },
                                { key: 'airConditioning', label: 'Klima' },
                                { key: 'internet', label: 'İnternet' },
                                { key: 'kitchen', label: 'Mutfak' },
                                { key: 'toilet', label: 'Tuvalet' },
                                { key: 'elevator', label: 'Asansör' },
                                { key: 'generator', label: 'Jeneratör' },
                                { key: 'showcase', label: 'Vitrin' },
                                { key: 'loadingDock', label: 'Yükleme Rampası' },
                                { key: 'warehouse', label: 'Depo Alanı' },
                                { key: 'outdoorSeating', label: 'Dış Mekan Oturma' },
                                { key: 'waitingArea', label: 'Bekleme Alanı' },
                                { key: 'cashRegister', label: 'Kasa Alanı' },
                                { key: 'changingRoom', label: 'Soyunma Odası' }
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
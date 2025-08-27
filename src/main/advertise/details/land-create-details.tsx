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
                    Arsa Özellikleri
                </Typography>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Arsa Alanı (m²)"
                            value={details.landArea || ''}
                            onChange={(e) => handleDetailChange('landArea', parseInt(e.target.value))}
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

                    <Grid item xs={12} sm={6}>
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
                                { key: 'electricity', label: 'Elektrik' },
                                { key: 'water', label: 'Su' },
                                { key: 'naturalGas', label: 'Doğalgaz' },
                                { key: 'sewerage', label: 'Kanalizasyon' },
                                { key: 'roadAccess', label: 'Yol Erişimi' },
                                { key: 'internet', label: 'İnternet/Fiber' },
                                { key: 'cornerLot', label: 'Köşe Parsel' },
                                { key: 'seaView', label: 'Deniz Manzarası' },
                                { key: 'cityView', label: 'Şehir Manzarası' },
                                { key: 'forestView', label: 'Orman Manzarası' },
                                { key: 'slope', label: 'Eğimli' },
                                { key: 'flat', label: 'Düz' },
                                { key: 'fenced', label: 'Çevrili' },
                                { key: 'vineyard', label: 'Bağ' },
                                { key: 'orchard', label: 'Meyve Bahçesi' },
                                { key: 'greenhouse', label: 'Sera' }
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
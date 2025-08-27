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

interface OfficeDetailsProps {
    details: any;
    setDetails: (details: any) => void;
}

export default function OfficeDetails({ details, setDetails }: OfficeDetailsProps) {
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
                    Ofis Özellikleri
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
                            label="Oda Sayısı"
                            value={details.roomCount || ''}
                            onChange={(e) => handleDetailChange('roomCount', parseInt(e.target.value))}
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
                            label="Toplantı Odası"
                            value={details.meetingRooms || ''}
                            onChange={(e) => handleDetailChange('meetingRooms', parseInt(e.target.value))}
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

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ 
                            mb: 2, 
                            fontWeight: 600, 
                            color: '#1e293b',
                            fontSize: '14px'
                        }}>
                            Ofis Özellikleri
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {[
                                { key: 'furnished', label: 'Eşyalı' },
                                { key: 'airConditioning', label: 'Klima' },
                                { key: 'parking', label: 'Otopark' },
                                { key: 'elevator', label: 'Asansör' },
                                { key: 'generator', label: 'Jeneratör' },
                                { key: 'internetIncluded', label: 'İnternet Dahil' },
                                { key: 'security24', label: '7/24 Güvenlik' },
                                { key: 'kitchen', label: 'Mutfak/Çay Ocağı' },
                                { key: 'reception', label: 'Resepsiyon' },
                                { key: 'waitingArea', label: 'Bekleme Alanı' },
                                { key: 'archive', label: 'Arşiv Odası' },
                                { key: 'serverRoom', label: 'Sunucu Odası' },
                                { key: 'fireSystem', label: 'Yangın Sistemi' },
                                { key: 'accessControl', label: 'Giriş Kontrol Sistemi' }
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
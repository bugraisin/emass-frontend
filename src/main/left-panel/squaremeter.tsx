import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Stack, Slider, Box, Button } from '@mui/material';

export default function SquareMeter() {
    const [minSquareMeter, setMinSquareMeter] = useState<string>('');
    const [maxSquareMeter, setMaxSquareMeter] = useState<string>('');
    const [sliderValue, setSliderValue] = useState<number[]>([0, 300]);

    const formatSquareMeter = (value: number): string => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
        }
        return value.toString();
    };

    const formatNumber = (num: string): string => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const cleanNumber = (value: string): string => {
        return value.replace(/[^0-9]/g, '');
    };

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = cleanNumber(event.target.value);
        setMinSquareMeter(cleaned);
        
        if (cleaned) {
            const numValue = parseInt(cleaned);
            setSliderValue([numValue, sliderValue[1]]);
        } else {
            setSliderValue([0, sliderValue[1]]);
        }
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = cleanNumber(event.target.value);
        setMaxSquareMeter(cleaned);
        
        if (cleaned) {
            const numValue = parseInt(cleaned);
            setSliderValue([sliderValue[0], numValue]);
        } else {
            setSliderValue([sliderValue[0], 300]);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const value = newValue as number[];
        setSliderValue(value);
        
        setMinSquareMeter(value[0] === 0 ? '' : value[0].toString());
        setMaxSquareMeter(value[1] === 300 ? '' : value[1].toString());
    };

    const clearSquareMeters = () => {
        setMinSquareMeter('');
        setMaxSquareMeter('');
        setSliderValue([0, 300]);
    };

    const getDisplayText = () => {
        if (minSquareMeter || maxSquareMeter || sliderValue[1] === 300) {
            const min = minSquareMeter ? formatSquareMeter(parseInt(minSquareMeter)) : '';
            const max = maxSquareMeter ? formatSquareMeter(parseInt(maxSquareMeter)) : (sliderValue[1] === 300 ? 'Sınırsız' : '');
            if (min && max) return `${min}m² - ${max}m²`;
            if (min) return `${min}m²+`;
            if (max === 'Sınırsız') return 'Sınırsız metrekare';
            if (max) return `${max}m²'ye kadar`;
        }
        return '';
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <div>
                    <Typography variant="h6" sx={{ fontSize: '16px', marginBottom: 1 }}>
                        Metrekare
                    </Typography>
                    {getDisplayText() && (
                        <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                            {getDisplayText()}
                        </Typography>
                    )}
                </div>

                <Box sx={{ mb: 2, px: 1 }}>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1 }}>
                        Metrekare Aralığı
                    </Typography>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => {
                            if (value === 0) return '0m²';
                            if (value === 300) return 'Sınırsız';
                            return `${formatSquareMeter(value)}m²`;
                        }}
                        min={0}
                        max={300}
                        step={10}
                        sx={{
                            '& .MuiSlider-thumb': {
                                width: 16,
                                height: 16,
                            },
                            '& .MuiSlider-valueLabel': {
                                fontSize: '10px',
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>
                            0m²
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 'bold' }}>
                            Sınırsız
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Min Metrekare"
                        variant="outlined"
                        value={minSquareMeter ? formatNumber(minSquareMeter) : ''}
                        onChange={handleMinChange}
                        size="small"
                        autoComplete="off"
                        placeholder="0"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Max Metrekare"
                        variant="outlined"
                        value={maxSquareMeter ? formatNumber(maxSquareMeter) : ''}
                        onChange={handleMaxChange}
                        size="small"
                        autoComplete="off"
                        placeholder="Sınırsız"
                        sx={{ 
                            '& .MuiInputBase-root': { fontSize: '13px' },
                            '& .MuiInputLabel-root': { fontSize: '12px' }
                        }}
                    />
                </Stack>

                {(minSquareMeter || maxSquareMeter) && (
                    <Button
                        onClick={clearSquareMeters}
                        size="small"
                        sx={{ 
                            fontSize: '11px',
                            textTransform: 'none',
                            color: 'text.secondary'
                        }}
                    >
                        Metrekare Filtresini Temizle
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

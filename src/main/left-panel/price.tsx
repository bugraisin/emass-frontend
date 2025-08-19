import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Stack, Slider, Box, Button } from '@mui/material';

interface PriceProps {
    selectedCategory: string;
}

export default function Price({ selectedCategory }: PriceProps) {
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    
    const config = useMemo(() => {
        if (selectedCategory.includes("Kiralık")) {
            return {
                max: 50000,
                step: 1000,
                label: "Aylık Kira"
            };
        } else {
            return {
                max: 20000000,
                step: 100000,
                label: "Fiyat"
            };
        }
    }, [selectedCategory]);

    const [sliderValue, setSliderValue] = useState<number[]>([0, config.max]);

    useEffect(() => {
        setSliderValue([0, config.max]);
        setMinPrice('');
        setMaxPrice('');
    }, [config]);

    const formatPrice = (price: number): string => {
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
        } else if (price >= 1000) {
            return `${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 0)}K`;
        }
        return price.toString();
    };

    const formatNumber = (num: string): string => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const cleanNumber = (value: string): string => {
        return value.replace(/[^0-9]/g, '');
    };

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = cleanNumber(event.target.value);
        setMinPrice(cleaned);
        
        if (cleaned) {
            const numValue = parseInt(cleaned);
            setSliderValue([numValue, sliderValue[1]]);
        } else {
            setSliderValue([0, sliderValue[1]]);
        }
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = cleanNumber(event.target.value);
        setMaxPrice(cleaned);
        
        if (cleaned) {
            const numValue = parseInt(cleaned);
            setSliderValue([sliderValue[0], numValue]);
        } else {
            setSliderValue([sliderValue[0], config.max]);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const value = newValue as number[];
        setSliderValue(value);
        
        setMinPrice(value[0] === 0 ? '' : value[0].toString());
        setMaxPrice(value[1] === config.max ? '' : value[1].toString());
    };

    const clearPrices = () => {
        setMinPrice('');
        setMaxPrice('');
        setSliderValue([0, config.max]);
    };

    const getDisplayText = () => {
        if (minPrice || maxPrice || sliderValue[1] === config.max) {
            const min = minPrice ? formatPrice(parseInt(minPrice)) : '';
            const max = maxPrice ? formatPrice(parseInt(maxPrice)) : (sliderValue[1] === config.max ? 'Sınırsız' : '');
            if (min && max) return `${min} - ${max}`;
            if (min) return `${min}+`;
            if (max === 'Sınırsız') return 'Sınırsız fiyat';
            if (max) return `${max}'a kadar`;
        }
        return '';
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <div>
                    <Typography variant="h6" sx={{ fontSize: '16px', marginBottom: 1 }}>
                        {config.label}
                    </Typography>
                    {getDisplayText() && (
                        <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                            {getDisplayText()}
                        </Typography>
                    )}
                </div>

                <Box sx={{ mb: 2, px: 1 }}>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1 }}>
                        {config.label} Aralığı
                    </Typography>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => {
                            if (value === 0) return '₺0';
                            if (value === config.max) return 'Sınırsız';
                            return `₺${formatPrice(value)}`;
                        }}
                        min={0}
                        max={config.max}
                        step={config.step}
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
                            ₺0
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 'bold' }}>
                            Sınırsız
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <TextField
                        fullWidth
                        label="Min Fiyat"
                        variant="outlined"
                        value={minPrice ? formatNumber(minPrice) : ''}
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
                        label="Max Fiyat"
                        variant="outlined"
                        value={maxPrice ? formatNumber(maxPrice) : ''}
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

                {(minPrice || maxPrice) && (
                    <Button
                        onClick={clearPrices}
                        size="small"
                        sx={{ 
                            fontSize: '11px',
                            textTransform: 'none',
                            color: 'text.secondary'
                        }}
                    >
                        Fiyat Filtresini Temizle
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

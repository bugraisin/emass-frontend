import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Slider, Box, Button } from '@mui/material';

interface PriceProps {
    selectedCategory: string;
    onPriceChange: (priceData: any) => void;
}

export default function Price({ selectedCategory, onPriceChange }: PriceProps) {
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

    // Parent'a fiyat değişikliklerini bildir
    useEffect(() => {
        if (onPriceChange) {
            onPriceChange({
                min: minPrice || '',
                max: maxPrice || ''
            });
        }
    }, [minPrice, maxPrice]);

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
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", fontWeight: 600, mb: 2 }}>
                    {config.label}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        placeholder="Min"
                        value={minPrice ? formatNumber(minPrice) : ''}
                        onChange={handleMinChange}
                        size="small"
                        autoComplete="off"
                        sx={{ 
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                fontSize: '13px',
                                height: '32px'
                            }
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', px: 0.5 }}>-</Typography>
                    
                    <TextField
                        placeholder="Max"
                        value={maxPrice ? formatNumber(maxPrice) : ''}
                        onChange={handleMaxChange}
                        size="small"
                        autoComplete="off"
                        sx={{ 
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                fontSize: '13px',
                                height: '32px'
                            }
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

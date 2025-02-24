import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemButton, Box, TextField } from "@mui/material";
import citiesData from "../../data/cities.json";
import districtsData from "../../data/districts.json";
import neighborhoodsData from "../../data/neighborhoods.json";

interface StepTwoProps {
    onLocationSelect: (city: string, district: string, neighborhood: string) => void;
}

export default function StepTwo({ onLocationSelect }: StepTwoProps) {
    const [cities] = useState(citiesData);
    const [districts, setDistricts] = useState<{ ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string; }[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<{ mahalle_id: string; mahalle_adi: string; ilce_id: string; ilce_adi: string; sehir_id: string;  sehir_adi: string}[]>([]);
    
    const [selectedCity, setSelectedCity] = useState<{ sehir_id: string; sehir_adi: string; } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string; } | null>(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<{ mahalle_id: string; mahalle_adi: string; ilce_id: string; ilce_adi: string; sehir_id: string;  sehir_adi: string} | null>(null);

    const [citySearch, setCitySearch] = useState("");
    const [districtSearch, setDistrictSearch] = useState("");
    const [neighborhoodSearch, setNeighborhoodSearch] = useState("");

    useEffect(() => {
        if (selectedCity) {
            setDistricts(districtsData.filter(d => d.sehir_id === selectedCity.sehir_id));
            setSelectedDistrict(null);
            setNeighborhoods([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            //@ts-ignore
            setNeighborhoods(neighborhoodsData.filter(n => n.ilce_id === selectedDistrict.ilce_id));
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedNeighborhood) {
            onLocationSelect(
                selectedCity?.sehir_adi || '',
                selectedDistrict?.ilce_adi || '',
                selectedNeighborhood.mahalle_adi
            );
        }
    }, [selectedNeighborhood]);

    return (
        <Box 
            sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                width: "100vw", 
                padding: 1
            }}
        >
            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column"}}>
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>Şehir Seçin</Typography>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        placeholder="Şehir ara..." 
                        value={citySearch} 
                        onChange={(e) => setCitySearch(e.target.value)}
                        sx={{ 
                            width: "90%",
                            height: "35px",
                            '& .MuiOutlinedInput-root': {
                                height: '35px', 
                            },
                        }}
                    />
                    <Box sx={{ flex: 1, maxHeight: "40vh", overflowY: "auto" }}>
                        <List>
                            {cities
                                .filter(city => city.sehir_adi.toLowerCase().includes(citySearch.toLowerCase()))
                                .map(city => (
                                    <ListItem key={city.sehir_id} disablePadding>
                                        <ListItemButton 
                                            selected={selectedCity?.sehir_id === city.sehir_id} 
                                            onClick={() => setSelectedCity(city)}
                                            sx={{
                                                borderRadius: "8px",
                                                fontSize: "14px",
                                                color: selectedCity?.sehir_id === city.sehir_id ? '#ed9517' : 'black',
                                                fontWeight: selectedCity?.sehir_id === city.sehir_id ? 'bold' : 'normal',
                                            }}
                                        >
                                            {city.sehir_adi}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>İlçe Seçin</Typography>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        placeholder="İlçe ara..." 
                        value={districtSearch} 
                        onChange={(e) => setDistrictSearch(e.target.value)}
                        sx={{ 
                            width: "90%",
                            height: "35px",
                            '& .MuiOutlinedInput-root': {
                                height: '35px', 
                            },
                        }}
                    />
                    <Box sx={{ flex: 1, maxHeight: "40vh", overflowY: "auto" }}>
                        <List>
                            {districts
                                .filter(district => district.ilce_adi.toLowerCase().includes(districtSearch.toLowerCase()))
                                .map(district => (
                                    <ListItem key={district.ilce_id} disablePadding>
                                        <ListItemButton 
                                            selected={selectedDistrict?.ilce_id === district.ilce_id} 
                                            onClick={() => setSelectedDistrict(district)}
                                            sx={{
                                                borderRadius: "8px",
                                                fontSize: "14px",
                                                color: selectedDistrict?.ilce_id === district.ilce_id ?'#ed9517' : 'black',
                                                fontWeight: selectedDistrict?.ilce_id === district.ilce_id ? 'bold' : 'normal',
                                            }}
                                        >
                                            {district.ilce_adi}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" gutterBottom>Mahalle Seçin</Typography>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        placeholder="Mahalle ara..." 
                        value={neighborhoodSearch} 
                        onChange={(e) => setNeighborhoodSearch(e.target.value)}
                        sx={{ 
                            width: "90%",
                            height: "35px",
                            '& .MuiOutlinedInput-root': {
                                height: '35px', 
                            },
                        }}
                    />
                    <Box sx={{ flex: 1, maxHeight: "40vh", overflowY: "auto" }}>
                        <List>
                            {neighborhoods
                                .filter(neighborhood => neighborhood.mahalle_adi.toLowerCase().includes(neighborhoodSearch.toLowerCase()))
                                .map(neighborhood => (
                                    <ListItem key={neighborhood.mahalle_id} disablePadding>
                                        <ListItemButton
                                            selected={selectedNeighborhood?.mahalle_id === neighborhood.mahalle_id} 
                                            onClick={() => setSelectedNeighborhood(neighborhood)} 
                                            sx={{
                                                borderRadius: "8px",
                                                fontSize: "14px",
                                                color: selectedNeighborhood?.mahalle_id === neighborhood.mahalle_id ? '#ed9517' : 'black',
                                                fontWeight: selectedNeighborhood?.mahalle_id === neighborhood.mahalle_id ? 'bold' : 'normal',
                                            }}
                                        >
                                            {neighborhood.mahalle_adi}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
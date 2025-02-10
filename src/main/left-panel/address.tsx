import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import citiesData from '../../data/cities.json';
import districtsData from '../../data/districts.json';

export default function Address() {

    const [expanded, setExpanded] = useState<string | false>(false);
    const [cities, setCities] = useState<{ sehir_id: string; sehir_adi: string }[]>(citiesData);
    const [districts, setDistricts] = useState<{ ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string }[]>(districtsData);
    const [neighborhoods, setNeighborhoods] = useState<{ mahalle_id: string; mahalle_adi: string; ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string }[]>([]);
    
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

    const [searchQueryCity, setSearchQueryCity] = useState<string>("");
    const [searchQueryDistrict, setSearchQueryDistrict] = useState<string>("");
    const [searchQueryNeighborhood, setSearchQueryNeighborhood] = useState<string>("");

    const [filteredDistricts, setFilteredDistricts] = useState<{ ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string }[]>([]);
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<{ mahalle_id: string; mahalle_adi: string; ilce_id: string; ilce_adi: string; sehir_id: string; sehir_adi: string }[]>([]);


    const handleSearchChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryCity(event.target.value);
    };

    const handleSearchChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryDistrict(event.target.value);
    };

    const handleSearchChangeNeighborhood = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryNeighborhood(event.target.value);
    };

    const handleCityToggle = (city: string) => {
        setSelectedCities((prevSelected) =>
            prevSelected.includes(city)
                ? prevSelected.filter((item) => item !== city)
                : [...prevSelected, city]
        );
    };

    const handleDistrictToggle = (district: string) => {
        setSelectedDistricts((prevSelected) =>
            prevSelected.includes(district)
                ? prevSelected.filter((item) => item !== district)
                : [...prevSelected, district]
        );
    };

    const handleNeighborhoodToggle = (neighborhood: string) => {
        setSelectedNeighborhoods((prevSelected) =>
            prevSelected.includes(neighborhood)
                ? prevSelected.filter((item) => item !== neighborhood)
                : [...prevSelected, neighborhood]
        );
    };

    const filteredCities = useMemo(() => {
        return cities.filter(city =>
            city.sehir_adi.toLowerCase().includes(searchQueryCity.toLowerCase())
        );
    }, [cities, searchQueryCity]);

    useEffect(() => {
        if (selectedCities.length > 0) {
            const selectedCityIds = selectedCities.map(city => {
                return cities.find(c => c.sehir_adi === city)?.sehir_id;
            });
            
            if (selectedCityIds) {
                setFilteredDistricts(districts.filter(district =>
                    selectedCityIds.includes(district.sehir_id)
                ));
            }
        } else {
            setFilteredDistricts([]);
        }
    }, [selectedCities, districts]);

    useEffect(() => {
        if (selectedCities.length > 0) {
            const selectedDistrictsId = selectedDistricts.map(district => {
                return districts.find(d => d.ilce_adi === district)?.ilce_id;
            });
            
            if (selectedDistrictsId) {
                setFilteredNeighborhoods(neighborhoods.filter(neighbourhood =>
                    selectedDistrictsId.includes(neighbourhood.ilce_id)
                ));
            }
        }
    }, [selectedDistricts, neighborhoods]);

    const handleAccordionChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? false : panel));
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '14px' }}>
                    Adres
                </Typography>

                <Accordion expanded={expanded === "panel1"} onChange={() => handleAccordionChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '16px' }} />} >
                        <Typography sx={{ fontSize: '14px' }}>İl Seçin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            fullWidth
                            label="İl Arama"
                            variant="outlined"
                            value={searchQueryCity}
                            onChange={handleSearchChangeCity}
                            sx={{
                                mb: 1,
                                '& .MuiInputBase-root': { fontSize: '12px', height: '30px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' },
                            }}
                            size="small"
                        />
                        <List sx={{ maxHeight: 300, overflowY: 'auto', padding: 0 }}>
                            {filteredCities.map((city) => (
                                <ListItem disablePadding key={city.sehir_id} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '0px' }} onClick={() => handleCityToggle(city.sehir_adi)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCities.includes(city.sehir_adi)}
                                                    onChange={() => handleCityToggle(city.sehir_adi)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '10px', margin: 0 }}>{city.sehir_adi}</Typography>}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === "panel2"} onChange={() => handleAccordionChange("panel2")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '16px' }} />} >
                        <Typography sx={{ fontSize: '14px' }}>İlçe Seçin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            fullWidth
                            label="İlçe Arama"
                            variant="outlined"
                            value={searchQueryDistrict}
                            onChange={handleSearchChangeDistrict}
                            sx={{
                                mb: 1,
                                '& .MuiInputBase-root': { fontSize: '12px', height: '30px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' },
                            }}
                            size="small"
                        />
                        <List sx={{ maxHeight: 300, overflowY: 'auto', padding: 0 }}>
                            {filteredDistricts.filter(district =>
                                district.ilce_adi.toLowerCase().includes(searchQueryDistrict.toLowerCase())
                            ).map((district) => (
                                <ListItem disablePadding key={district.ilce_id} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '0px' }} onClick={() => handleDistrictToggle(district.ilce_adi)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedDistricts.includes(district.ilce_adi)}
                                                    onChange={() => handleDistrictToggle(district.ilce_adi)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '10px', margin: 0 }}>{district.ilce_adi}</Typography>}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === "panel3"} onChange={() => handleAccordionChange("panel3")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '16px' }} />} >
                        <Typography sx={{ fontSize: '14px' }}>Mahalle Seçin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            fullWidth
                            label="Mahalle Arama"
                            variant="outlined"
                            value={searchQueryNeighborhood}
                            onChange={handleSearchChangeNeighborhood}
                            sx={{
                                mb: 1,
                                '& .MuiInputBase-root': { fontSize: '12px', height: '30px' },
                                '& .MuiInputLabel-root': { fontSize: '12px' },
                            }}
                            size="small"
                        />
                        <List sx={{ maxHeight: 300, overflowY: 'auto', padding: 0 }}>
                            {filteredNeighborhoods.map((neighborhood, index) => (
                                <ListItem disablePadding key={index} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '0px' }} onClick={() => handleNeighborhoodToggle(neighborhood.mahalle_adi)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedNeighborhoods.includes(neighborhood.mahalle_adi)}
                                                    onChange={() => handleNeighborhoodToggle(neighborhood.mahalle_adi)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '10px', margin: 0 }}>{neighborhood.mahalle_adi}</Typography>}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}

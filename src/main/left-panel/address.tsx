import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Address() {

    const [expanded, setExpanded] = useState<string | false>(false);

    const [cities, setCities] = useState<{ sehir_id: string; sehir_adi: string }[]>([]);
    const [districts, setDistricts] = useState<string[]>(["Çankaya", "Keçiören", "Mamak", "Sincan", "Yenimahalle"]);
    const [neighborhoods, setNeighborhoods] = useState<string[]>(["Bahçelievler", "Kocatepe", "Büyükesat", "Demetevler", "Ostim"]);
    
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

    const [searchQueryCity, setSearchQueryCity] = useState<string>("");
    const [searchQueryDistrict, setSearchQueryDistrict] = useState<string>("");
    const [searchQueryNeighborhood, setSearchQueryNeighborhood] = useState<string>("");

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

    const filteredCities = cities.filter(city =>
        city.sehir_adi.toLowerCase().includes(searchQueryCity.toLowerCase())
    );

    const filteredDistricts = districts.filter(district =>
        district.toLowerCase().includes(searchQueryDistrict.toLowerCase())
    );

    const filteredNeighborhoods = neighborhoods.filter(neighborhood =>
        neighborhood.toLowerCase().includes(searchQueryNeighborhood.toLowerCase())
    );

    const handleAccordionChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? false : panel));
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('./data/cities.json');
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Şehir verileri alınırken bir hata oluştu: ", error);
            }
        };
        fetchCities();
    }, []);

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
                        <List sx={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
                            {filteredCities.map((city) => (
                                <ListItem disablePadding key={city.sehir_id} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '2px 0' }} onClick={() => handleCityToggle(city.sehir_adi)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCities.includes(city.sehir_adi)}
                                                    onChange={() => handleCityToggle(city.sehir_adi)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '12px', margin: 0 }}>{city.sehir_adi}</Typography>}
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
                        <List sx={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
                            {filteredDistricts.map((district, index) => (
                                <ListItem disablePadding key={index} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '2px 0' }} onClick={() => handleDistrictToggle(district)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedDistricts.includes(district)}
                                                    onChange={() => handleDistrictToggle(district)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '12px', margin: 0 }}>{district}</Typography>}
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
                        <List sx={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
                            {filteredNeighborhoods.map((neighborhood, index) => (
                                <ListItem disablePadding key={index} sx={{ padding: '0px' }}>
                                    <ListItemButton sx={{ padding: '2px 0' }} onClick={() => handleNeighborhoodToggle(neighborhood)}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedNeighborhoods.includes(neighborhood)}
                                                    onChange={() => handleNeighborhoodToggle(neighborhood)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, margin: 0 }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '12px', margin: 0 }}>{neighborhood}</Typography>}
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

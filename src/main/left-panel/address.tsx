import React, { useState } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AddressProps {
    expanded: boolean;
    handleAccordionChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function Address({ expanded, handleAccordionChange }: AddressProps) {
    const [cities, setCities] = useState<string[]>(["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya", "Konya", "Trabzon", "Adana", "asdasdsa ", "asdadas"]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCityToggle = (city: string) => {
        setSelectedCities((prevSelected) =>
            prevSelected.includes(city)
                ? prevSelected.filter((item) => item !== city)
                : [...prevSelected, city]
        );
    };

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '14px' }}>
                    Adres
                </Typography>

                <Accordion expanded={expanded} onChange={handleAccordionChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '16px' }} />} >
                        <Typography sx={{ fontSize: '14px' }}>Şehir Seçin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TextField
                        fullWidth
                        label="Şehir Arama"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{
                            mb: 1,
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                                height: '30px', 
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',  
                            },
                        }}
                        size="small"
                    />
                    <List sx={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city, index) => (
                                <ListItem disablePadding key={index} sx={{ padding: '2px 0' }}>
                                    <ListItemButton
                                        sx={{ padding: '4px 0' }}
                                        onClick={() => handleCityToggle(city)}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCities.includes(city)}
                                                    onChange={() => handleCityToggle(city)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '12px' }}>{city}</Typography>}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography sx={{ fontSize: '12px' }}>Yükleniyor...</Typography>
                        )}
                    </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded} onChange={handleAccordionChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '16px' }} />} >
                        <Typography sx={{ fontSize: '14px' }}>İl Seçin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TextField
                        fullWidth
                        label="Şehir Arama"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{
                            mb: 1,
                            '& .MuiInputBase-root': {
                                fontSize: '12px',
                                height: '30px', 
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '12px',  
                            },
                        }}
                        size="small"
                    />
                    <List sx={{ maxHeight: 200, overflowY: 'auto', padding: 0 }}>
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city, index) => (
                                <ListItem disablePadding key={index} sx={{ padding: '2px 0' }}>
                                    <ListItemButton
                                        sx={{ padding: '4px 0' }}
                                        onClick={() => handleCityToggle(city)}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedCities.includes(city)}
                                                    onChange={() => handleCityToggle(city)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                                />
                                            }
                                            label={<Typography sx={{ fontSize: '12px' }}>{city}</Typography>}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography sx={{ fontSize: '12px' }}>Yükleniyor...</Typography>
                        )}
                    </List>
                    </AccordionDetails>
                </Accordion>

                {selectedCities.length > 0 && (
                    <Typography sx={{ mt: 2, fontSize: '12px' }}>
                        Seçilen Şehirler: <strong>{selectedCities.join(", ")}</strong>
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

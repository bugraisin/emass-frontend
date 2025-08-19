import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FeaturesProps {
    selectedCategory: string;
}

export default function Features({ selectedCategory }: FeaturesProps) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const getFeaturesByCategory = () => {
        if (selectedCategory.includes("Daire") || selectedCategory.includes("Rezidans")) {
            return [
                "Asansör", "Balkon", "Ebeveyn Banyosu", "Amerikan Mutfak", 
                "Ankastre Mutfak", "Bulaşık Makinesi", "Klima", "Termosifon",
                "Doğalgaz", "Güvenlik", "Otopark", "Site İçinde"
            ];
        } else if (selectedCategory.includes("Villa") || selectedCategory.includes("Müstakil Ev")) {
            return [
                "Bahçe", "Balkon", "Teras", "Şömine", "Jakuzi", "Sauna",
                "Yüzme Havuzu", "Klima", "Doğalgaz", "Güvenlik", "Otopark",
                "Ebeveyn Banyosu", "Amerikan Mutfak", "Ankastre Mutfak"
            ];
        } else if (selectedCategory.includes("Arsa")) {
            return [
                "İmar Durumu", "Elektrik", "Su", "Doğalgaz", "Asfalt Yol",
                "Deniz Manzarası", "Şehir Manzarası", "Doğa Manzarası"
            ];
        } else if (selectedCategory.includes("Yazlık")) {
            return [
                "Deniz Manzarası", "Bahçe", "Teras", "Balkon", "Yüzme Havuzu",
                "Klima", "Şömine", "Otopark", "Güvenlik", "Site İçinde"
            ];
        }
        
        return [];
    };

    const toggleFeature = (feature: string) => {
        setSelectedFeatures(prev => 
            prev.includes(feature) ? prev.filter(x => x !== feature) : [...prev, feature]
        );
    };

    const handleAccordionChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? false : panel));
    };

    useEffect(() => {
        setSelectedFeatures([]);
    }, [selectedCategory]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".features-container")) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!selectedCategory || getFeaturesByCategory().length === 0) {
        return null;
    }

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }} className="features-container">
            <CardContent>
                <Accordion expanded={expanded === "panel1"} onChange={() => handleAccordionChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}>
                        <div>
                            <Typography sx={{ fontSize: "14px" }}>
                                Ek Özellikler
                            </Typography>
                            {selectedFeatures.length > 0 && (
                                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {selectedFeatures.length} özellik seçili
                                </Typography>
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ padding: 0 }}>
                            {getFeaturesByCategory().map((feature) => (
                                <ListItem disablePadding key={feature} sx={{ p: 0 }}>
                                    <ListItemButton 
                                        onClick={() => toggleFeature(feature)} 
                                        sx={{
                                            p: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Checkbox
                                            checked={selectedFeatures.includes(feature)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFeature(feature);
                                            }}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                                        />
                                        <Typography sx={{ fontSize: '13px', m: 0 }}>{feature}</Typography>
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

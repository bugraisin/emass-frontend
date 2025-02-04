import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Categories() {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedSaleCategory, setSelectedSaleCategory] = useState<string | null>(null);
    const [selectedRentCategory, setSelectedRentCategory] = useState<string | null>(null);

    const handleAccordionChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? false : panel));
    };

    const handleSaleSelect = (item: string) => {
        setSelectedSaleCategory(item);
        setSelectedRentCategory(null);
    };

    const handleRentSelect = (item: string) => {
        setSelectedRentCategory(item);
        setSelectedSaleCategory(null);
    };

    const getListItemStyle = (item: string, selectedCategory: string | null) => ({
        backgroundColor: item === selectedCategory ? "#e0e0e0" : "transparent",
        border: item === selectedCategory ? "1px solid #ed9517" : "transparent",
        borderRadius: "4px",
        fontSize: "14px",
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".accordion-container")) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }} className="accordion-container">
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "14px" }}>
                    Kategori
                </Typography>

                <Accordion expanded={expanded === "panel1"} onChange={() => handleAccordionChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}>
                        <Typography
                            sx={{
                                color: selectedSaleCategory ? "#ed9517" : "inherit",
                                fontWeight: selectedSaleCategory ? "bold" : "normal",
                                fontSize: "14px",
                            }}
                        >
                            {selectedSaleCategory ? `Satılık - ${selectedSaleCategory}` : "Satılık"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ padding: 0 }}>
                            {["Daire", "Arsa", "Müstakil Ev", "Rezidans", "Villa", "Çiftlik Evi", "Yazlık"].map((item) => (
                                <ListItem disablePadding key={item}>
                                    <ListItemButton onClick={() => handleSaleSelect(item)} style={getListItemStyle(item, selectedSaleCategory)}>
                                        {item}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === "panel2"} onChange={() => handleAccordionChange("panel2")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}>
                        <Typography
                            sx={{
                                color: selectedRentCategory ? "#ed9517" : "inherit",
                                fontWeight: selectedRentCategory ? "bold" : "normal",
                                fontSize: "14px",
                            }}
                        >
                            {selectedRentCategory ? `Kiralık - ${selectedRentCategory}` : "Kiralık"}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ padding: 0 }}>
                            {["Daire", "Arsa", "Müstakil Ev", "Rezidans", "Villa", "Çiftlik Evi", "Yazlık"].map((item) => (
                                <ListItem disablePadding key={item}>
                                    <ListItemButton onClick={() => handleRentSelect(item)} style={getListItemStyle(item, selectedRentCategory)}>
                                        {item}
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

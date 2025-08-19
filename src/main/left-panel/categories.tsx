import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, Radio } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CategoriesProps {
    onCategoryChange: (category: string) => void;
}

export default function Categories({ onCategoryChange }: CategoriesProps) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [selectedSaleCategory, setSelectedSaleCategory] = useState<string>('');
    const [selectedRentCategory, setSelectedRentCategory] = useState<string>('');

    const handleAccordionChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? false : panel));
    };

    const toggleSaleCategory = (item: string) => {
        setSelectedRentCategory('');
        const newCategory = selectedSaleCategory === item ? '' : `Satılık ${item}`;
        setSelectedSaleCategory(newCategory === '' ? '' : item);
        onCategoryChange(newCategory);
        if (newCategory !== '') {
            setExpanded(false);
        }
    };

    const toggleRentCategory = (item: string) => {
        setSelectedSaleCategory('');
        const newCategory = selectedRentCategory === item ? '' : `Kiralık ${item}`;
        setSelectedRentCategory(newCategory === '' ? '' : item);
        onCategoryChange(newCategory);
        if (newCategory !== '') {
            setExpanded(false);
        }
    };

    const getSaleDisplayText = () => {
        return selectedSaleCategory || "";
    };

    const getRentDisplayText = () => {
        return selectedRentCategory || "";
    };

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
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px" }}>
                    Kategori
                </Typography>

                <Accordion expanded={expanded === "panel1"} onChange={() => handleAccordionChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}>
                        <div>
                            <Typography sx={{ fontSize: "14px" }}>
                                Satılık
                            </Typography>
                            {selectedSaleCategory && (
                                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {getSaleDisplayText()}
                                </Typography>
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ padding: 0 }}>
                            {["Daire", "Arsa", "Müstakil Ev", "Rezidans", "Villa", "Çiftlik Evi", "Yazlık"].map((item) => (
                                <ListItem disablePadding key={item} sx={{ p: 0 }}>
                                    <ListItemButton 
                                        onClick={() => toggleSaleCategory(item)} 
                                        sx={{
                                            p: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Radio
                                            checked={selectedSaleCategory === item}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSaleCategory(item);
                                            }}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                                        />
                                        <Typography sx={{ fontSize: '13px', m: 0 }}>{item}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === "panel2"} onChange={() => handleAccordionChange("panel2")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}>
                        <div>
                            <Typography sx={{ fontSize: "14px" }}>
                                Kiralık
                            </Typography>
                            {selectedRentCategory && (
                                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                                    {getRentDisplayText()}
                                </Typography>
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ padding: 0 }}>
                            {["Daire", "Arsa", "Müstakil Ev", "Rezidans", "Villa", "Çiftlik Evi", "Yazlık"].map((item) => (
                                <ListItem disablePadding key={item} sx={{ p: 0 }}>
                                    <ListItemButton 
                                        onClick={() => toggleRentCategory(item)} 
                                        sx={{
                                            p: 0,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Radio
                                            checked={selectedRentCategory === item}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleRentCategory(item);
                                            }}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                                        />
                                        <Typography sx={{ fontSize: '13px', m: 0 }}>{item}</Typography>
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

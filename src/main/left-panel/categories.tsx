import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemButton, Radio, Box, IconButton, Popover, Paper } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

interface CategoriesProps {
    onCategoryChange: (category: string) => void;
}

export default function Categories({ onCategoryChange }: CategoriesProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverType, setPopoverType] = useState<'sale' | 'rent' | null>(null);
    const [selectedSaleCategory, setSelectedSaleCategory] = useState<string>('');
    const [selectedRentCategory, setSelectedRentCategory] = useState<string>('');

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'sale' | 'rent') => {
        setAnchorEl(event.currentTarget);
        setPopoverType(type);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverType(null);
    };

    const toggleSaleCategory = (item: string) => {
        setSelectedRentCategory('');
        const newCategory = selectedSaleCategory === item ? '' : `Satılık ${item}`;
        setSelectedSaleCategory(newCategory === '' ? '' : item);
        onCategoryChange(newCategory);
        handlePopoverClose();
    };

    const toggleRentCategory = (item: string) => {
        setSelectedSaleCategory('');
        const newCategory = selectedRentCategory === item ? '' : `Kiralık ${item}`;
        setSelectedRentCategory(newCategory === '' ? '' : item);
        onCategoryChange(newCategory);
        handlePopoverClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1.5 }}>
                    Kategori
                </Typography>

                {/* Satılık Button */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'sale')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginBottom: '6px',
                        minHeight: '36px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Satılık
                        </Typography>
                        {selectedSaleCategory && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedSaleCategory}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Kiralık Button */}
                <Box 
                    onClick={(e) => handlePopoverOpen(e, 'rent')}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 10px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minHeight: '36px',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "13px" }}>
                            Kiralık
                        </Typography>
                        {selectedRentCategory && (
                            <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                                {selectedRentCategory}
                            </Typography>
                        )}
                    </Box>
                    <ChevronRightIcon sx={{ fontSize: "16px" }} />
                </Box>

                {/* Popover Panel */}
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPopover-paper': {
                            marginLeft: '8px',
                            minWidth: '280px',
                            maxHeight: '400px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 0, 0, 0.12)'
                        }
                    }}
                >
                    <Paper sx={{ padding: '12px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600 }}>
                                {popoverType === 'sale' ? 'Satılık' : 'Kiralık'} Kategoriler
                            </Typography>
                            <IconButton onClick={handlePopoverClose} size="small">
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>
                        <List sx={{ padding: 0 }}>
                            {["Daire", "Arsa", "Müstakil Ev", "Rezidans", "Villa", "Çiftlik Evi", "Yazlık"].map((item) => (
                                <ListItem disablePadding key={item} sx={{ p: 0 }}>
                                    <ListItemButton 
                                        onClick={() => popoverType === 'sale' ? toggleSaleCategory(item) : toggleRentCategory(item)} 
                                        sx={{
                                            p: '4px 8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '4px',
                                            '&:hover': {
                                                backgroundColor: 'rgba(237, 149, 23, 0.1)'
                                            }
                                        }}
                                    >
                                        <Radio
                                            checked={popoverType === 'sale' ? selectedSaleCategory === item : selectedRentCategory === item}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                                        />
                                        <Typography sx={{ fontSize: '13px', m: 0 }}>{item}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Popover>
            </CardContent>
        </Card>
    );
}

import React, { useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import Categories from "./left-panel/categories.tsx";
import Address from "./left-panel/address.tsx";
import { Square } from "@mui/icons-material";
import SquareMeter from "./left-panel/squaremeter.tsx";

export default function LeftPanel() {
    const [expandedCategories, setExpandedCategories] = useState<string | false>(false);
    const [expandedAddress, setExpandedAddress] = useState<boolean>(false);

    const handleCategoriesAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedCategories(isExpanded ? panel : false);
        if (isExpanded) setExpandedAddress(false); 
    };

    const handleAddressAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAddress(isExpanded);
        if (isExpanded) setExpandedCategories(false); 
    };

    return (
        <Box sx={{ padding: 1 }}>
            <Categories expanded={expandedCategories} handleAccordionChange={handleCategoriesAccordionChange} />
            <Divider sx={{ my: 1 }} />
            <Address expanded={expandedAddress} handleAccordionChange={handleAddressAccordionChange} />
            <Divider sx={{ my: 1 }} />
            <SquareMeter/>
            
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#ed9517',
                    width: '100%',
                    marginTop: 2,
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' },
                    padding: '10px 20px',
                    borderRadius: 2,
                }}
            >
                Ara
            </Button>
        </Box>
    );
}

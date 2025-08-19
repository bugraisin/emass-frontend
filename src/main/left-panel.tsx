import React, { useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import Categories from "./left-panel/categories.tsx";
import Address from "./left-panel/address.tsx";
import SquareMeter from "./left-panel/squaremeter.tsx";
import Price from "./left-panel/price.tsx";
import Age from "./left-panel/age.tsx";
import RoomCount from "./left-panel/roomcount.tsx";
import Features from "./left-panel/features.tsx";

export default function LeftPanel() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    // Bina yaşının gösterilip gösterilmeyeceğini kontrol et
    const shouldShowAge = () => {
        return selectedCategory && 
               !selectedCategory.includes("Arsa") && 
               selectedCategory !== '';
    };

    // Oda sayısının gösterilip gösterilmeyeceğini kontrol et
    const shouldShowRoomCount = () => {
        return selectedCategory && 
               (selectedCategory.includes("Daire") || 
                selectedCategory.includes("Villa") || 
                selectedCategory.includes("Müstakil Ev") || 
                selectedCategory.includes("Rezidans") ||
                selectedCategory.includes("Yazlık"));
    };

    return (
        <Box sx={{ padding: 1 }}>
            <Categories onCategoryChange={setSelectedCategory} />
            <Divider sx={{ my: 1 }} />
            <Address/>
            <Divider sx={{ my: 1 }} />
            <Price selectedCategory={selectedCategory} />
            <Divider sx={{ my: 1 }} />
            <SquareMeter/>
            
            {shouldShowAge() && (
                <>
                    <Divider sx={{ my: 1 }} />
                    <Age/>
                </>
            )}
            
            {shouldShowRoomCount() && (
                <>
                    <Divider sx={{ my: 1 }} />
                    <RoomCount/>
                </>
            )}
            
            <Divider sx={{ my: 1 }} />
            <Features selectedCategory={selectedCategory} />

            
            <Box
                sx={{
                    position: 'sticky',
                    bottom: 10,
                    width: '91%',
                    padding: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    border: '1px solid #d3d3d3',
                    borderRadius: '4px',
                    marginTop: '10px',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#ed9517',
                        width: '100%',
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: 'orange' },
                        padding: '8px 16px', 
                        borderRadius: 2,
                        left: 0,
                    }}
                >
                    Ara
                </Button>
            </Box>
        </Box>
    );
}

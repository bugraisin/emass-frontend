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
        <Box sx={{ 
            padding: '24px 20px',
            height: '100%',
            position: 'relative'
        }}>
            <Categories onCategoryChange={setSelectedCategory} />
            <Divider sx={{ 
                my: 2.5,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Address/>
            <Divider sx={{ 
                my: 2.5,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Price selectedCategory={selectedCategory} />
            <Divider sx={{ 
                my: 2.5,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <SquareMeter/>
            
            {shouldShowAge() && (
                <>
                    <Divider sx={{ 
                        my: 2.5,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <Age/>
                </>
            )}
            
            {shouldShowRoomCount() && (
                <>
                    <Divider sx={{ 
                        my: 2.5,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <RoomCount/>
                </>
            )}
            
            <Divider sx={{ 
                my: 2.5,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Features selectedCategory={selectedCategory} />

            
            <Box
                sx={{
                    position: 'sticky',
                    bottom: 20,
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '16px',
                    marginTop: '24px',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(135deg, #ed9517 0%, #f59e0b 100%)',
                        width: '100%',
                        color: 'white',
                        fontSize: '15px',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        boxShadow: '0 6px 24px rgba(237, 149, 23, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        '&:hover': { 
                            background: 'linear-gradient(135deg, #d97706 0%, #ed9517 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 30px rgba(237, 149, 23, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        },
                        padding: '14px 24px', 
                        borderRadius: '12px',
                        textTransform: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    🔍 Emlakları Ara
                </Button>
            </Box>
        </Box>
    );
}

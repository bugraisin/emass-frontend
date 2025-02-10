import React, { useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import Categories from "./left-panel/categories.tsx";
import Address from "./left-panel/address.tsx";
import SquareMeter from "./left-panel/squaremeter.tsx";
import Price from "./left-panel/price.tsx";
import Age from "./left-panel/age.tsx";
import RoomCount from "./left-panel/roomcount.tsx";

export default function LeftPanel() {

    return (
        <Box sx={{ padding: 1 }}>
            <Categories/>
            <Divider sx={{ my: 1 }} />
            <Address/>
            <Divider sx={{ my: 1 }} />
            <Price/>
            <Divider sx={{ my: 1 }} />
            <SquareMeter/>
            <Divider sx={{ my: 1 }} />
            <Age/>
            <Divider sx={{ my: 1 }} />
            <RoomCount/>

            
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

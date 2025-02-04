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

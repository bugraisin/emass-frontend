import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Advert() {
    const navigate = useNavigate();
    return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Button variant="contained" onClick={() => navigate("/")}>GERİ DÖN</Button>
        </Box>
    );
}
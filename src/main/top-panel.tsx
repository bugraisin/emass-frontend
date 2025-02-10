import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function TopPanel() {

    return (
        <Box
            height="8%"
            bgcolor="#ed9517"
            display="flex"
            sx={{
                background: 'linear-gradient(45deg, #ed9517, #ff7a00)',
                padding: '4px 4px',
                borderEndEndRadius: '4px',
                borderEndStartRadius: '4px',
                alignItems: 'center',
            }}
        >
            <a href="http://localhost:3000/" style={{ height: '100%', backgroundColor: 'white', marginLeft: '48px', borderRadius: '4px' }}>
                <img src="/logo.png" alt="" style={{ height: '100%', borderRadius: '4px' }} />
            </a>
            
            <Box sx={{ flexGrow: 1, display: 'flex', marginLeft: '64px', alignItems: 'center' }}>
                <TextField
                    label="İlan Başlığı"
                    variant="outlined"
                    sx={{
                        mb: 1,
                        '& .MuiInputBase-root': { fontSize: '16px', height: '50px', width: '500px' },
                        '& .MuiInputLabel-root': { fontSize: '16px' },
                        backgroundColor: 'rgb(255, 255, 255, 1)',
                        alignItems: 'center',
                        borderRadius: '4px',
                    }}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon sx={{ color: '#ed9517' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Box>
            <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#ed9517',
                        width: '100%',
                        color: 'white',
                        fontSize: '15px',
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: 'orange' },
                        marginRight: '48px',
                        padding: '8px 16px', 
                        borderRadius: 2,
                    }}
                >
                    İlan Ver
                </Button>

            </Box>
        </Box>

    );
}

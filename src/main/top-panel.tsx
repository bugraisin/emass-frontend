import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from "react-router-dom";

export default function TopPanel() {
    const navigate = useNavigate();
    const location = useLocation();

    // Eğer kullanıcı sadece "/" rotasında ise tüm öğeler gösterilsin.
    const isHomePage = location.pathname === "/";

    return (
        <Box
            height="8vh"
            width="100%"
            maxWidth="1280px"
            bgcolor="#ed9517"
            display="flex"
            sx={{
                background: '#ed9517',
                padding: '4px 4px',
                alignItems: 'center',
            }}
        >
            <a href="http://localhost:3000/" style={{ height: '100%', backgroundColor: 'white', marginLeft: '48px', borderRadius: '4px' }}>
                <img src="/logo.png" alt="" style={{ height: '100%', borderRadius: '4px' }} />
            </a>
            
            {isHomePage && (
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
            )}
            
            {isHomePage && (
                <>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/giris-yap")}
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            '&:hover': { backgroundColor: 'orange' },
                            marginRight: '16px',
                            padding: '8px 16px',
                            borderRadius: 2,
                        }}
                    >
                        Giriş Yap
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/kayit-ol")}
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            '&:hover': { backgroundColor: 'orange' },
                            marginRight: '16px',
                            padding: '8px 16px',
                            borderRadius: 2,
                        }}
                    >
                        Kayıt ol
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/ilan-ver")}
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            fontSize: '15px',
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: 'orange' },
                            marginRight: '16px',
                            padding: '8px 16px',
                            borderRadius: 2,
                        }}
                    >
                        Ücretsiz İlan Ver
                    </Button>
                </>
            )}
        </Box>
    );
}

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {   
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRegister = async () => {
        const userData = {
            email: email,
            password: password,
            name: name,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', userData);
            navigate('/giris-yap');
        } catch (error) {
            console.error('Kayıt işlemi sırasında bir hata oluştu:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '92vh',
                backgroundColor: '#e8e8e8',
                padding: 2,
                paddingTop: '10vh',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    maxWidth: '380px',
                    padding: 3,
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    maxHeight: '85vh',
                    overflow: 'auto',
                }}    
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 1,
                        color: '#1a1a1a',
                        textAlign: 'center',
                        fontSize: '28px',
                    }}
                >
                    Hesap Oluştur
                </Typography>
                
                <Typography
                    variant="body2"
                    sx={{
                        color: '#666',
                        textAlign: 'center',
                        marginBottom: 3,
                        fontSize: '14px',
                    }}
                >
                    Emlak ilanlarına erişim için ücretsiz hesap oluşturun
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <TextField
                        label="Ad - Soyad"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        size="medium"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: '14px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                    />

                    <TextField  
                        label="E-posta"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        size="medium"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: '14px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                    />

                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Şifre"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        size="medium"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: '14px',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleRegister}
                        fullWidth
                        size="large"
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            '&:hover': { 
                                backgroundColor: '#d68415',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(237, 149, 23, 0.3)',
                            },
                            marginTop: 1,
                            padding: '12px',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Üye Ol
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            marginTop: 2,
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Zaten üye misiniz?{" "}
                        <Typography
                            variant="body2"
                            component="span"
                            onClick={() => navigate('/giris-yap')}
                            sx={{
                                color: '#ed9517',
                                cursor: 'pointer',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            Giriş yap
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
import { Box, Button, IconButton, InputAdornment, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {   
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async () => {
        const loginData = {
            email: email,
            password: password,
        };
    
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            if (stayLoggedIn) {
            }
            navigate('/');
        } catch (error) {
            console.error('Giriş işlemi sırasında bir hata oluştu:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                flexDirection: 'column',
                marginTop: '-5%',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    border: '4px solid #d3d3d3',
                    alignItems: 'center',
                    width: '30%',
                    height: '50%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'column'
                }}    
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        color: '#333',
                    }}
                >
                    Giriş Yap
                </Typography>
                
                <TextField  
                    label="E-posta"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    type={showPassword ? "text" : "password"}
                    label="Şifre"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        width: '100%',
                        marginTop: '5%',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                    control={
                            <Checkbox
                                checked={stayLoggedIn}
                                onChange={(e) => setStayLoggedIn(e.target.checked)}
                                sx={{
                                    color: '#ed9517',
                                    '& .MuiSvgIcon-root': { fontSize: 20 }
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: '14px' }}>Oturumum Açık Kalsın</Typography>
                        }
                        sx={{
                            gap: 0,
                        }}
                    />

                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px', 
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate('/sifremi-unuttum')}
                    >
                        Şifremi Unuttum
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: '#ed9517',
                        color: 'white',
                        '&:hover': { backgroundColor: 'orange' },
                        marginTop: '5%',
                        width: '50%',
                        padding: '8px 16px',
                        borderRadius: 2,
                        alignSelf: 'center',
                        textTransform: 'none',
                    }}
                >
                    Giriş Yap
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    Henüz üye değil misiniz? {" "}
                    <Typography
                        variant="body2"
                        component="span"
                        onClick={() => navigate('/kayit-ol')}
                        sx={{
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        Hesap oluştur
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}

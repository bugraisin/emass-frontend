import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {   
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event) => {
      let value = event.target.value.replace(/\D/g, ''); // Sadece rakamları al
      if (value.length > 3 && value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length > 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 10)}`;
      } else if (value.length > 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }
      setPhone(value);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    border: '4px solid #d3d3d3',
                    alignItems: 'center',
                    width: '30%',
                    height: '70%',
                    marginTop: '-10%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'column'
                }}    
            >
                <TextField
                    label="Ad - Soyad"
                    variant="outlined"
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    label="Cep Telefonu"
                    placeholder="(5XX) XXX XX XX"
                    variant="outlined"
                    value={phone}
                    onChange={handlePhoneChange}
                    inputProps={{ maxLength: 14 }}
                    sx={{
                        width: '100%',
                        marginTop: '5%',
                    }}
                    />

                <TextField  
                    label="E-posta"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        marginTop: '5%',
                    }}
                />

                <TextField
                    type={showPassword ? "text" : "password"}
                    label="Şifre"
                    variant="outlined"
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

                <Button
                    variant="contained"
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
                    Üye Ol
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    Zaten üye misiniz?{" "}
                    <Typography
                        variant="body2"
                        component="span"
                        onClick={() => navigate('/giris-yap')}
                        sx={{
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        Giriş yapın
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
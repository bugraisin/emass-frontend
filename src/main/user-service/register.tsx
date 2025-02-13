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
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event) => {
      let value = event.target.value.replace(/\D/g, '');
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
                alignItems: 'center',
                height: '90vh',
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
                    marginTop: '-20',
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
                        Hesap Oluştur
                    </Typography>
                <TextField
                    label="Ad - Soyad"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />

                <TextField
                    label="Cep Telefonu (İsteğe Bağlı)"
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
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        width: '100%',
                        marginTop: '5%',
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

                <Button
                    variant="contained"
                    onClick={handleRegister}
                    sx={{
                        backgroundColor: '#ed9517',
                        color: 'white',
                        '&:hover': { backgroundColor: 'orange' },
                        marginTop: '10%',
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
                        Giriş yap
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
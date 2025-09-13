import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff, ErrorOutline, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {   
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('E-posta ve şifre alanları zorunludur');
            return;
        }

        const loginData = {
            email: email,
            password: password,
        };

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);

            const userData = {
                id: user.userId,
                email: user.email,
                username: user.username,
                isLoggedIn: true
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } catch (error: any) {
            console.error('Giriş işlemi sırasında bir hata oluştu:', error);
            
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.status === 401) {
                setError('E-posta veya şifre yanlış');
            } else if (error.response?.status === 500) {
                setError('Sunucu hatası. Lütfen daha sonra tekrar deneyin');
            } else {
                setError('Bağlantı hatası. İnternet bağlantınızı kontrol edin');
            }
        } finally {
            setLoading(false);
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
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    marginTop: "8vh",
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    padding: 5,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                }}    
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 2,
                        color: '#1a1a1a',
                        textAlign: 'center',
                        fontSize: '32px',
                    }}
                >
                    Giriş Yap
                </Typography>
                
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        textAlign: 'center',
                        marginBottom: 4,
                        fontSize: '16px',
                    }}
                >
                    Hesabınıza giriş yaparak emlak ilanlarına erişin
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Hata Mesajı */}
                    {error && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                padding: '16px',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: 1,
                            }}
                        >
                            <ErrorOutline sx={{ color: '#dc2626', fontSize: 20 }} />
                            <Typography
                                sx={{
                                    color: '#dc2626',
                                    fontSize: '14px',
                                    flex: 1
                                }}
                            >
                                {error}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setError('')}
                                sx={{ color: '#dc2626' }}
                            >
                                <Close sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    )}

                    <TextField  
                        label="E-posta"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                                fontSize: '16px',
                                height: '56px'
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                            }
                        }}
                    />

                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Şifre"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                                fontSize: '16px',
                                height: '56px'
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '16px',
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        disabled={loading}
                                        sx={{ color: '#666' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            height: '56px',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: 1,
                            textTransform: 'none',
                            '&:hover': { 
                                backgroundColor: '#d68415',
                            },
                            '&:disabled': {
                                backgroundColor: '#e0e0e0',
                                color: '#999'
                            }
                        }}
                    >
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </Button>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            fontSize: '16px',
                            color: '#666',
                            marginTop: 1
                        }}
                    >
                        Henüz hesabınız yok mu?{" "}
                        <Typography
                            variant="body1"
                            component="span"
                            onClick={() => !loading && navigate('/kayit-ol')}
                            sx={{
                                color: '#ed9517',
                                cursor: loading ? 'default' : 'pointer',
                                fontWeight: 600,
                                textDecoration: 'underline'
                            }}
                        >
                            Kayıt ol
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
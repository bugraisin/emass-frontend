import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff, ErrorOutline, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService.ts";

export default function Register() {   
    
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRegister = async () => {
        if (!email || !password || !username) {
            setError('Tüm alanlar zorunludur');
            return;
        }

        setLoading(true);
        setError('');

        try {

            await UserService.performRegister(username, email, password);
            navigate('/giris-yap');

        } catch (error: any) {
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
                    Hesap Oluştur
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
                    Emlak ilanlarına erişim için ücretsiz hesap oluşturun
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
                        label="Ad - Soyad"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        onClick={handleRegister}
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
                        {loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
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
                        Zaten hesabınız var mı?{" "}
                        <Typography
                            variant="body1"
                            component="span"
                            onClick={() => !loading && navigate('/giris-yap')}
                            sx={{
                                color: '#ed9517',
                                cursor: loading ? 'default' : 'pointer',
                                fontWeight: 600,
                                textDecoration: 'underline'
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
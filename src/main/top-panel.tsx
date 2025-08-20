import React, { useState, useEffect } from "react";
import { Box, Button, InputAdornment, TextField, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";

export default function TopPanel() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isHomePage = location.pathname === "/";

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setIsLoggedIn(true);
            setUserName(user.name || 'Kullanıcı');
        }
    }, [location]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName('');
        handleMenuClose();
        navigate('/');
    };

    return (
        <Box
            height="8vh"
            width="100%"
            maxWidth="1280px"
            bgcolor="#ed9517"
            display="flex"
            sx={{
                background: '#ed9517',
                padding: '0 24px',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {/* Logo */}
            <Box sx={{ flexShrink: 0, marginLeft: '40px' }}>
                <a href="http://localhost:3000/" style={{ height: '60px', backgroundColor: 'white', borderRadius: '4px', display: 'block' }}>
                    <img src="/logo.png" alt="" style={{ height: '60px', borderRadius: '4px' }} />
                </a>
            </Box>
            
            {/* Arama Alanı */}
            {isHomePage && (
                <Box sx={{ flexGrow: 1, maxWidth: '600px', mx: 4 }}>
                    <TextField
                        placeholder="Hangi emlakı arıyorsunuz? Örn: Satılık daire, Kiralık villa..."
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': { 
                                fontSize: '15px', 
                                height: '48px',
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                paddingLeft: '16px',
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'white',
                                    boxShadow: '0 0 0 2px rgba(255,255,255,0.3)',
                                }
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiInputBase-input': {
                                padding: '12px 0',
                                '&::placeholder': {
                                    color: '#666',
                                    opacity: 1,
                                }
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        sx={{
                                            backgroundColor: '#ed9517',
                                            color: 'white',
                                            minWidth: '48px',
                                            height: '36px',
                                            borderRadius: '18px',
                                            mr: 1,
                                            '&:hover': { backgroundColor: '#d68415' },
                                        }}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            )}
            
            {/* Kullanıcı Butonları */}
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            {isHomePage && (
                <>
                    {!isLoggedIn ? (
                        <>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/giris-yap")}
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': { 
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderColor: 'white'
                                    },
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                }}
                            >
                                Giriş Yap
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/kayit-ol")}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#ed9517',
                                    '&:hover': { 
                                        backgroundColor: '#f8f9fa',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                    },
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Kayıt Ol
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleMenuOpen}
                            startIcon={<AccountCircleIcon sx={{ fontSize: '20px' }} />}
                            sx={{
                                backgroundColor: 'white',
                                color: '#ed9517',
                                '&:hover': { 
                                    backgroundColor: '#f8f9fa',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                },
                                padding: '10px 24px',
                                borderRadius: '20px',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '14px',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {userName}
                        </Button>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                borderRadius: '12px',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(0, 0, 0, 0.08)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                minWidth: '180px',
                                background: '#ffffff',
                                overflow: 'visible',
                                '& .MuiList-root': {
                                    padding: '4px',
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    margin: '2px 4px',
                                    transition: 'all 0.2s ease-in-out',
                                    position: 'relative',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                                    '&:last-child': {
                                        borderBottom: 'none',
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: '0',
                                        top: '0',
                                        width: '3px',
                                        height: '100%',
                                        backgroundColor: 'transparent',
                                        transition: 'all 0.2s ease',
                                        borderRadius: '0 2px 2px 0',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                        color: '#1976d2',
                                        transform: 'none',
                                        '&::before': {
                                            backgroundColor: '#1976d2',
                                        }
                                    },
                                    '&:nth-of-type(3)': {
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
                                        marginBottom: '6px',
                                        paddingBottom: '6px',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-1px',
                                            left: '-4px',
                                            right: '-4px',
                                            height: '1px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                        }
                                    },
                                    '&[data-logout="true"]': {
                                        color: '#d32f2f',
                                        marginTop: '4px',
                                        borderBottom: 'none',
                                        '&:hover': {
                                            backgroundColor: 'rgba(211, 47, 47, 0.08)',
                                            color: '#d32f2f',
                                            '&::before': {
                                                backgroundColor: '#d32f2f',
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/hesabim'); }}>
                            👤 Hesabım
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/ilan-ver'); }}>
                            📝 İlan Ver
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); navigate('/ilanlarim'); }}>
                            🏠 İlanlarım
                        </MenuItem>
                        <MenuItem onClick={handleLogout} data-logout="true">
                            🚪 Çıkış Yap
                        </MenuItem>
                    </Menu>
                </>
            )}
            </Box>
        </Box>
    );
}

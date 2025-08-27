import React, { useState, useEffect } from "react";
import { Box, Button, InputAdornment, TextField, Menu, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

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
            width="100vw"
            display="flex"
            sx={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                padding: '0 32px',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 16px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, #ed9517 20%, #f59e0b 50%, #ed9517 80%, transparent 100%)',
                    opacity: 0.8
                }
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                maxWidth="1220px"
                sx={{ paddingLeft: '12px' }}
            >
                <Box>
                    <a href="/" style={{
                        display: 'block',
                        padding: 0,
                        height: '40px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}>
                        <img src="/transparant_emass_logo.png" alt="Logo" style={{
                            height: '40px',
                            borderRadius: '8px',
                            display: 'block',
                            filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1))'
                        }} />
                    </a>
                </Box>

                {/* Arama Alanı */}
                {isHomePage && (
                    <Box sx={{
                        flexGrow: 1,
                        maxWidth: '650px',
                        mx: 6,
                        position: 'relative'
                    }}>
                        <TextField
                            placeholder="Hangi emlakı arıyorsunuz? Örn: Satılık daire, Kiralık villa..."
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '15px',
                                    height: '52px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '8px',
                                    paddingLeft: '12px',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&.Mui-focused': {
                                        backgroundColor: 'white',
                                        boxShadow: '0 0 0 3px rgba(237, 149, 23, 0.2), 0 12px 40px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid rgba(237, 149, 23, 0.3)',
                                    }
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '14px 0',
                                    fontWeight: 500,
                                    '&::placeholder': {
                                        color: '#64748b',
                                        opacity: 1,
                                        fontWeight: 400
                                    }
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            sx={{
                                                background: 'linear-gradient(135deg, #ed9517 0%, #f59e0b 100%)',
                                                color: 'white',
                                                minWidth: '52px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #d97706 0%, #ed9517 100%)',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 6px 20px rgba(237, 149, 23, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                                                },
                                            }}
                                        >
                                            <SearchIcon sx={{ fontSize: '20px' }} />
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}

                {/* Kullanıcı Butonları */}
                <Box sx={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    marginRight: '20px'
                }}>
                    {isHomePage && (
                        <>
                            {!isLoggedIn ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/giris-yap")}
                                        sx={{
                                            color: 'white',
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                            },
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            transition: 'all 0.2s ease',
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
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            transition: 'all 0.2s ease',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                boxShadow: 'none',
                                                backgroundColor: '#d97706',
                                            }
                                        }}
                                    >
                                        Kayıt Ol
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleMenuOpen}
                                    startIcon={<AccountCircleIcon sx={{ fontSize: '18px' }} />}
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#1e293b',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: '#f8fafc',
                                        }
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
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        minWidth: '150px',
                                        background: 'white',
                                        overflow: 'visible',
                                    }
                                }}
                            >
                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/hesabim'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        marginBottom: '4px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#1e293b',
                                        '&:hover': {
                                            backgroundColor: 'rgba(237, 149, 23, 0.1)',
                                            color: '#d97706'
                                        },
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: '16px', mr: 1.5 }} />
                                    Hesabım
                                </MenuItem>

                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/ilan-ver'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        marginBottom: '4px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#1e293b',
                                        '&:hover': {
                                            backgroundColor: 'rgba(237, 149, 23, 0.1)',
                                            color: '#d97706'
                                        },
                                    }}
                                >
                                    <AddIcon sx={{ fontSize: '16px', mr: 1.5 }} />
                                    İlan Ver
                                </MenuItem>

                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/ilanlarim'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        marginBottom: '8px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#1e293b',
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(237, 149, 23, 0.1)',
                                            color: '#d97706'
                                        },
                                    }}
                                >
                                    <HomeIcon sx={{ fontSize: '16px', mr: 1.5 }} />
                                    İlanlarım
                                </MenuItem>

                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#dc2626',
                                        '&:hover': {
                                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                            color: '#dc2626'
                                        },
                                    }}
                                >
                                    <LogoutIcon sx={{ fontSize: '16px', mr: 1.5 }} />
                                    Çıkış Yap
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

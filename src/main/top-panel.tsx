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
            <Box sx={{
                borderRadius: '12px',
                padding: '8px',
                background: "white",
            }}>
                <a href="/" style={{
                    display: 'block',
                    padding: 0,
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}>
                    <img src="/newlogo.png" alt="Logo" style={{
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
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': { 
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                                    },
                                    padding: '12px',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    letterSpacing: '0.5px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                Giriş Yap
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/kayit-ol")}
                                sx={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                    color: '#1e293b',
                                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                    '&:hover': { 
                                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                                    },
                                    padding: '12px',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    letterSpacing: '0.5px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(237, 149, 23, 0.1), transparent)',
                                        transition: 'left 0.5s ease'
                                    },
                                    '&:hover::before': {
                                        left: '100%'
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
                            startIcon={<AccountCircleIcon sx={{ fontSize: '22px' }} />}
                            sx={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                color: '#1e293b',
                                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                '&:hover': { 
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                                },
                                padding: '12px 24px',
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '14px',
                                letterSpacing: '0.5px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                                mt: 2,
                                borderRadius: '20px',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 30px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                minWidth: '220px',
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                backdropFilter: 'blur(20px)',
                                overflow: 'visible',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '24px',
                                    width: '16px',
                                    height: '16px',
                                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                    transform: 'rotate(45deg)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderBottom: 'none',
                                    borderRight: 'none',
                                },
                                '& .MuiList-root': {
                                    padding: '8px',
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    margin: '4px 0',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    color: '#1e293b',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: '0',
                                        top: '0',
                                        width: '4px',
                                        height: '100%',
                                        backgroundColor: 'transparent',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '0 6px 6px 0',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(237, 149, 23, 0.08)',
                                        color: '#d97706',
                                        transform: 'translateX(4px)',
                                        boxShadow: '0 4px 16px rgba(237, 149, 23, 0.15)',
                                        '&::before': {
                                            backgroundColor: '#ed9517',
                                        }
                                    },
                                    '&:nth-of-type(3)': {
                                        borderBottom: '1px solid rgba(30, 41, 59, 0.1)',
                                        marginBottom: '8px',
                                        paddingBottom: '14px',
                                    },
                                    '&[data-logout="true"]': {
                                        color: '#dc2626',
                                        marginTop: '8px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(220, 38, 38, 0.08)',
                                            color: '#dc2626',
                                            '&::before': {
                                                backgroundColor: '#dc2626',
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
        </Box>
    );
}

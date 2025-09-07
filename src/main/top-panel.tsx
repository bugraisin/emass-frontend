import React, { useState, useEffect } from "react";
import { Box, Button, InputAdornment, TextField, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const isHomePage = location.pathname === "/";
    const isSearchPage = location.pathname.startsWith("/search");
    const showSearchAndUser = true; // Her sayfada göster

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setIsLoggedIn(true);
            setUserName(user.name || 'Kullanıcı');
        }
    }, []); // location dependency'sini kaldırdık

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        setLogoutDialogOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName('');
        setLogoutDialogOpen(false);
        navigate('/');
    };

    const cancelLogout = () => {
        setLogoutDialogOpen(false);
    };

    return (
        <Box
            height="6vh"
            width="100vw"
            display="flex"
            sx={{
                background: '#334155',
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
                maxWidth="1240px"   
            >
                <Box>
                    <a href="/" style={{
                        display: 'block',
                        padding: 0,
                        height: '30px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}>
                        <img src="/transparant_emass_logo.png" alt="Logo" style={{
                            height: '30px',
                            borderRadius: '8px',
                            display: 'block',
                            filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1))'
                        }} />
                    </a>
                </Box>

                {/* Arama Alanı */}
                {showSearchAndUser && (
                    <Box sx={{
                        flexGrow: 1,
                        maxWidth: '500px',
                        position: 'relative'
                    }}>
                        <TextField
                            placeholder="Hangi emlakı arıyorsunuz?"
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '13px',
                                    height: '28px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '6px',
                                    paddingLeft: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    '&.Mui-focused': {
                                        backgroundColor: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.5)',
                                    }
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '8px 0',
                                    fontWeight: 500,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    '&:focus': {
                                        color: '#1e293b',
                                    },
                                    '&::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.6)',
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
                                                background: isSearchFocused ? '#1e293b' : 'transparent',
                                                color: isSearchFocused ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                                minWidth: '24px',
                                                height: '24px',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    background: isSearchFocused ? '#334155' : 'rgba(255, 255, 255, 0.1)',
                                                },
                                            }}
                                        >
                                            <SearchIcon sx={{ 
                                                fontSize: '18px', 
                                                color: isSearchFocused ? 'white' : 'rgba(255, 255, 255, 0.9)' 
                                            }} />
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
                    marginRight: '20px'
                }}>
                    {showSearchAndUser && (
                        <>
                            {!isLoggedIn ? (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '8px'
                                }}>
                                    <Typography
                                        onClick={() => navigate("/giris-yap")}
                                        sx={{
                                            cursor: "pointer",
                                            color: "rgba(255, 255, 255, 0.9)",
                                            fontSize: "13px",
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                            height: "28px",
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Giriş Yap
                                    </Typography>
                                    <Typography
                                        onClick={() => navigate("/kayit-ol")}
                                        sx={{
                                            cursor: "pointer",
                                            color: "rgba(255, 255, 255, 0.9)",
                                            fontSize: "13px",
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                            height: "28px",
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Kayıt Ol
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography
                                    onClick={handleMenuOpen}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontSize: "13px",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        height: "28px",
                                        fontWeight: 500,
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: "16px" }} />
                                    {userName}
                                </Typography>
                            )}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                disableAutoFocusItem={true}
                                transitionDuration={0}
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
                                        mt: 0.5,
                                        borderRadius: '4px',
                                        border: 'none',
                                        minWidth: '120px',
                                        background: 'white',
                                        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.15)',
                                        '& .MuiList-root': {
                                            padding: '4px',
                                        },
                                        transition: 'none !important',
                                        transform: 'none !important',
                                        '& *': {
                                            transition: 'none !important',
                                        }
                                    }
                                }}
                                MenuListProps={{
                                    sx: {
                                        padding: 0,
                                        '& .MuiMenuItem-root': {
                                            transition: 'none !important',
                                        }
                                    }
                                }}
                            >
                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/hesabim'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                        color: '#374151',
                                        minHeight: 'auto',
                                        transition: 'none !important',
                                        '&:hover': {
                                            backgroundColor: '#f9fafb',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: '14px', mr: 1 }} />
                                    Hesabım
                                </MenuItem>

                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/ilan-ver'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                        color: '#374151',
                                        minHeight: 'auto',
                                        transition: 'none !important',
                                        '&:hover': {
                                            backgroundColor: '#f9fafb',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    <AddIcon sx={{ fontSize: '14px', mr: 1 }} />
                                    İlan Ver
                                </MenuItem>

                                <MenuItem
                                    onClick={() => { handleMenuClose(); navigate('/ilanlarim'); }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                        color: '#374151',
                                        minHeight: 'auto',
                                        borderBottom: '1px solid #f3f4f6',
                                        transition: 'none !important',
                                        '&:hover': {
                                            backgroundColor: '#f9fafb',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    <HomeIcon sx={{ fontSize: '14px', mr: 1 }} />
                                    İlanlarım
                                </MenuItem>

                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 12px',
                                        fontSize: '12px',
                                        color: '#dc2626',
                                        minHeight: 'auto',
                                        transition: 'none !important',
                                        '&:hover': {
                                            backgroundColor: '#fef2f2',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    <LogoutIcon sx={{ fontSize: '14px', mr: 1 }} />
                                    Çıkış
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Box>
            
            <Dialog
                open={logoutDialogOpen}
                onClose={cancelLogout}
                PaperProps={{
                    sx: {
                        borderRadius: '8px',
                        padding: '4px',
                        minWidth: '300px'
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 600 }}>
                    Çıkış Yap
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', color: '#666' }}>
                        Hesabınızdan çıkış yapmak istediğinizden emin misiniz?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 1 }}>
                    <Typography
                        onClick={cancelLogout}
                        sx={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#666',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        İptal
                    </Typography>
                    <Typography
                        onClick={confirmLogout}
                        sx={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#dc2626',
                            fontWeight: 600,
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Çıkış Yap
                    </Typography>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
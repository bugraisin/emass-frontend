import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    IconButton, 
    Avatar, 
    Badge, 
    Button,
    Skeleton,
    Menu,
    MenuItem,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SortIcon from '@mui/icons-material/Sort';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MessageDetails from './message-details';

interface Message {
    id: string;
    senderName: string;
    senderAvatar?: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    listingTitle: string;
    listingId: string;
    listingImage?: string;
    isRead: boolean;
}

export default function UserMessages() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
    const [sortBy, setSortBy] = useState<'date' | 'unread' | 'name'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        const loadMessages = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1200));
                
                // Mock data - gerçek uygulamada API'den gelecek
                const mockMessages: Message[] = [
                    {
                        id: '1',
                        senderName: 'Mehmet Yılmaz',
                        lastMessage: 'Evin müsait olduğu tarihleri öğrenebilir miyim?',
                        timestamp: '2024-01-15T10:30:00Z',
                        unreadCount: 2,
                        listingTitle: '3+1 Kiralık Daire - Kadıköy',
                        listingId: 'listing-123',
                        listingImage: 'https://via.placeholder.com/60x60',
                        isRead: false
                    },
                    {
                        id: '2',
                        senderName: 'Ayşe Demir',
                        lastMessage: 'Fiyat konusunda pazarlık yapabilir miyiz?',
                        timestamp: '2024-01-14T15:45:00Z',
                        unreadCount: 0,
                        listingTitle: '2+1 Satılık Daire - Beşiktaş',
                        listingId: 'listing-456',
                        listingImage: 'https://via.placeholder.com/60x60',
                        isRead: true
                    },
                    {
                        id: '3',
                        senderName: 'Can Özkan',
                        lastMessage: 'Bu daire hala mevcut mu?',
                        timestamp: '2024-01-13T09:20:00Z',
                        unreadCount: 1,
                        listingTitle: 'Lüks Villa - Bodrum',
                        listingId: 'listing-789',
                        listingImage: 'https://via.placeholder.com/60x60',
                        isRead: false
                    },
                    {
                        id: '4',
                        senderName: 'Zeynep Kaya',
                        lastMessage: 'Görüşme için uygun olduğunuz saatleri belirtir misiniz?',
                        timestamp: '2024-01-12T14:10:00Z',
                        unreadCount: 0,
                        listingTitle: 'Ofis - Levent',
                        listingId: 'listing-101',
                        isRead: true
                    },
                    {
                        id: '5',
                        senderName: 'Ali Korkmaz',
                        lastMessage: 'Teşekkürler, bilgi için.',
                        timestamp: '2024-01-11T16:35:00Z',
                        unreadCount: 3,
                        listingTitle: 'Stüdyo Daire - Şişli',
                        listingId: 'listing-202',
                        isRead: false
                    }
                ];
                
                setMessages(mockMessages);
            } catch (error) {
                console.error('Mesajlar yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, []);

    const sortedMessages = React.useMemo(() => {
        return [...messages].sort((a, b) => {
            if (sortBy === 'date') {
                const dateA = new Date(a.timestamp).getTime();
                const dateB = new Date(b.timestamp).getTime();
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            } else if (sortBy === 'unread') {
                return sortOrder === 'desc' ? b.unreadCount - a.unreadCount : a.unreadCount - b.unreadCount;
            } else if (sortBy === 'name') {
                return sortOrder === 'desc' 
                    ? b.senderName.localeCompare(a.senderName, 'tr')
                    : a.senderName.localeCompare(b.senderName, 'tr');
            }
            return 0;
        });
    }, [messages, sortBy, sortOrder]);

    const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
        setSortAnchorEl(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortAnchorEl(null);
    };

    const handleSortSelect = (type: 'date' | 'unread' | 'name', order: 'asc' | 'desc') => {
        setSortBy(type);
        setSortOrder(order);
        setSortAnchorEl(null);
    };

    const getSortText = () => {
        if (sortBy === 'date') {
            return sortOrder === 'desc' ? 'Tarihe Göre ↓' : 'Tarihe Göre ↑';
        } else if (sortBy === 'unread') {
            return sortOrder === 'desc' ? 'Okunmamışa Göre ↓' : 'Okunmamışa Göre ↑';
        } else {
            return sortOrder === 'desc' ? 'İsme Göre ↓' : 'İsme Göre ↑';
        }
    };

    const handleMessageClick = (message: Message) => {
        navigate(`/mesaj/${message.id}`);
    };

    const handleMarkAsRead = (e: React.MouseEvent, messageId: string) => {
        e.stopPropagation();
        setMessages(prev => prev.map(msg => 
            msg.id === messageId 
                ? { ...msg, isRead: true, unreadCount: 0 }
                : msg
        ));
    };

    const handleDeleteMessage = (e: React.MouseEvent, messageId: string) => {
        e.stopPropagation();
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'Az önce';
        } else if (diffInHours < 24) {
            return `${diffInHours} saat önce`;
        } else if (diffInHours < 48) {
            return 'Dün';
        } else {
            return date.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    };

    const totalUnreadCount = messages.reduce((sum, msg) => sum + msg.unreadCount, 0);

    const SkeletonLoadingCards = () => (
        <Box sx={{ minHeight: '100vh', padding: '12px' }}>
            <Box sx={{ maxWidth: '900px', borderRadius: "8px", backgroundColor: 'rgba(30, 41, 59, 0.1)', margin: '0 auto', padding: "12px" }}>
                {/* Header Skeleton */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 1,
                    p: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={120} height={24} />
                    </Box>
                    <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: '6px' }} />
                </Box>

                {/* Cards Skeleton */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} sx={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            overflow: 'hidden'
                        }}>
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Skeleton variant="text" width="60%" height={18} />
                                            <Skeleton variant="text" width="20%" height={14} />
                                        </Box>
                                        <Skeleton variant="text" width="80%" height={14} />
                                        <Skeleton variant="text" width="50%" height={14} />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );

    if (loading) {
        return <SkeletonLoadingCards />;
    }

    if (messages.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px' }}>
                <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Box sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        padding: '24px'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <IconButton onClick={() => navigate('/')} sx={{ color: '#64748b' }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                Mesajlarım
                            </Typography>
                        </Box>
                        
                        <Box display="flex" justifyContent="center" alignItems="center" height="50vh" flexDirection="column">
                            <MessageIcon sx={{ fontSize: 64, color: '#94a3b8', mb: 2 }} />
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                                Henüz mesaj yok
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                İlanlarınıza gelen mesajlar burada görünecek
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', padding: '12px' }}>
            <Box sx={{ maxWidth: '900px', borderRadius: "8px", backgroundColor: 'rgba(30, 41, 59, 0.1)', margin: '0 auto', padding: "12px" }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    p: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={() => navigate('/')} sx={{ color: '#64748b' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 500, color: '#1e293b' }}>
                            Mesajlarım ({messages.length})
                        </Typography>
                        {totalUnreadCount > 0 && (
                            <Chip 
                                label={`${totalUnreadCount} okunmamış`}
                                size="small"
                                sx={{
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    fontSize: '10px',
                                    height: '20px'
                                }}
                            />
                        )}
                    </Box>

                    <Button
                        onClick={handleSortClick}
                        startIcon={<SortIcon />}
                        sx={{
                            color: '#64748b',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#f8fafc',
                                borderColor: '#cbd5e1'
                            }
                        }}
                    >
                        {getSortText()}
                    </Button>
                </Box>

                {/* Messages */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {sortedMessages.map((message) => (
                        <Card
                            key={message.id}
                            onClick={() => handleMessageClick(message)}
                            sx={{
                                cursor: 'pointer',
                                background: message.isRead ? '#fff' : '#f8fafc',
                                borderRadius: '6px',
                                border: message.isRead ? '1px solid #e5e7eb' : '1px solid #cbd5e1',
                                borderLeft: message.unreadCount > 0 ? '3px solid #ed9517' : '1px solid #e5e7eb',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                position: 'relative',
                                "&:hover": {
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* Avatar */}
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#ed9517',
                                                fontSize: '14px',
                                                fontWeight: 600
                                            }}
                                        >
                                            {message.senderName.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                        {message.unreadCount > 0 && (
                                            <Badge
                                                badgeContent={message.unreadCount}
                                                color="error"
                                                sx={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    right: -5,
                                                    '& .MuiBadge-badge': {
                                                        fontSize: '9px',
                                                        height: '16px',
                                                        minWidth: '16px',
                                                        backgroundColor: '#dc2626'
                                                    }
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        {/* First Row: Name, Time and Actions */}
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            mb: 0.5
                                        }}>
                                            <Typography 
                                                variant="subtitle2" 
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#1e293b',
                                                    fontSize: '13px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '60%'
                                                }}
                                            >
                                                {message.senderName}
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <AccessTimeIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: '#94a3b8', 
                                                            fontSize: '10px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        {formatTimestamp(message.timestamp)}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    {!message.isRead && (
                                                        <IconButton
                                                            onClick={(e) => handleMarkAsRead(e, message.id)}
                                                            sx={{
                                                                width: 20,
                                                                height: 20,
                                                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                                color: '#22c55e',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                                                }
                                                            }}
                                                        >
                                                            <MarkEmailReadIcon sx={{ fontSize: 12 }} />
                                                        </IconButton>
                                                    )}
                                                    
                                                    <IconButton
                                                        onClick={(e) => handleDeleteMessage(e, message.id)}
                                                        sx={{
                                                            width: 20,
                                                            height: 20,
                                                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                                            color: '#dc2626',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                                                            }
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: 12 }} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Second Row: Message */}
                                        <Typography 
                                            variant="body2" 
                                            sx={{
                                                color: '#64748b',
                                                fontSize: '12px',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                mb: 0.5
                                            }}
                                        >
                                            {message.lastMessage}
                                        </Typography>

                                        {/* Third Row: Listing */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {message.listingImage && (
                                                <Box
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: '4px',
                                                        overflow: 'hidden',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    <img 
                                                        src={message.listingImage}
                                                        alt={message.listingTitle}
                                                        style={{ 
                                                            width: '100%', 
                                                            height: '100%', 
                                                            objectFit: 'cover' 
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                            
                                            <Typography 
                                                variant="caption" 
                                                sx={{
                                                    color: '#94a3b8',
                                                    fontSize: '10px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontStyle: 'italic'
                                                }}
                                            >
                                                İlan: {message.listingTitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Sort Menu */}
                <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={handleSortClose}
                    PaperProps={{
                        sx: {
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            mt: 1
                        }
                    }}
                >
                    <MenuItem onClick={() => handleSortSelect('date', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                        Tarihe Göre (Yeniden Eskiye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('date', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                        Tarihe Göre (Eskiden Yeniye)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('unread', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                        Okunmamışa Göre (Çok-Az)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('unread', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                        Okunmamışa Göre (Az-Çok)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('name', 'asc')} sx={{ fontSize: '14px', py: 1 }}>
                        İsme Göre (A-Z)
                    </MenuItem>
                    <MenuItem onClick={() => handleSortSelect('name', 'desc')} sx={{ fontSize: '14px', py: 1 }}>
                        İsme Göre (Z-A)
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
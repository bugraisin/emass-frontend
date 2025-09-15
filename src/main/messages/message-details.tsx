import React, { useState, useEffect, useRef } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    IconButton, 
    Avatar, 
    TextField,
    Button,
    Skeleton,
    Chip,
    CardMedia,
    Menu,
    MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ReportIcon from '@mui/icons-material/Report';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface MessageItem {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
    attachments?: {
        type: 'image' | 'file';
        url: string;
        name: string;
    }[];
}

interface MessageThread {
    id: string;
    otherUser: {
        id: string;
        name: string;
        avatar?: string;
    };
    listing: {
        id: string;
        title: string;
        price: string;
        image?: string;
        district: string;
        neighborhood: string;
    };
    messages: MessageItem[];
    isBlocked: boolean;
}

export default function MessageDetails() {
    const navigate = useNavigate();
    const { messageId } = useParams<{ messageId: string }>();
    const [messageThread, setMessageThread] = useState<MessageThread | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')?.userId || 'current-user';

    useEffect(() => {
        const loadMessageThread = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // Mock data - gerçek uygulamada API'den gelecek
                const mockThread: MessageThread = {
                    id: messageId || '1',
                    otherUser: {
                        id: 'user-123',
                        name: 'Mehmet Yılmaz',
                    },
                    listing: {
                        id: 'listing-123',
                        title: '3+1 Kiralık Daire - Kadıköy Merkez',
                        price: '25000',
                        image: 'https://via.placeholder.com/80x60',
                        district: 'Kadıköy',
                        neighborhood: 'Merkez'
                    },
                    isBlocked: false,
                    messages: [
                        {
                            id: 'msg-1',
                            senderId: 'user-123',
                            senderName: 'Mehmet Yılmaz',
                            content: 'Merhaba, ilanınızdaki daire hakkında bilgi alabilir miyim?',
                            timestamp: '2024-01-15T09:30:00Z',
                            isOwn: false
                        },
                        {
                            id: 'msg-2',
                            senderId: currentUserId,
                            senderName: 'Ben',
                            content: 'Merhaba, tabii ki. Hangi konularda bilgi almak istiyorsunuz?',
                            timestamp: '2024-01-15T09:45:00Z',
                            isOwn: true
                        },
                        {
                            id: 'msg-3',
                            senderId: 'user-123',
                            senderName: 'Mehmet Yılmaz',
                            content: 'Evin müsait olduğu tarihleri ve kira şartlarını öğrenebilir miyim? Ayrıca yakınında market, okul gibi yerler var mı?',
                            timestamp: '2024-01-15T10:15:00Z',
                            isOwn: false
                        },
                        {
                            id: 'msg-4',
                            senderId: currentUserId,
                            senderName: 'Ben',
                            content: 'Ev şu anda boş ve hemen kiraya verilebilir. Depozit 1 aylık kira, aidat 500 TL. Yakınında CarrefourSA, İlkokul ve lise mevcut. İsterseniz yarın gösterebilirim.',
                            timestamp: '2024-01-15T10:30:00Z',
                            isOwn: true
                        },
                        {
                            id: 'msg-5',
                            senderId: 'user-123',
                            senderName: 'Mehmet Yılmaz',
                            content: 'Çok teşekkürler. Yarın saat 14:00 uygun mu?',
                            timestamp: '2024-01-15T10:35:00Z',
                            isOwn: false
                        }
                    ]
                };
                
                setMessageThread(mockThread);
            } catch (error) {
                console.error('Mesaj detayları yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMessageThread();
    }, [messageId, currentUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messageThread?.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || sending || !messageThread) return;
        
        setSending(true);
        try {
            const newMsg: MessageItem = {
                id: `msg-${Date.now()}`,
                senderId: currentUserId,
                senderName: 'Ben',
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
                isOwn: true
            };

            setMessageThread(prev => prev ? {
                ...prev,
                messages: [...prev.messages, newMsg]
            } : null);
            
            setNewMessage('');
            
            // API call simulation
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Mesaj gönderilirken hata:', error);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleListingClick = () => {
        if (messageThread?.listing) {
            navigate(`/ilan/${messageThread.listing.id}`);
        }
    };

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatMessageDate = (timestamp: string) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Bugün';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Dün';
        } else {
            return date.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
    };

    const groupMessagesByDate = (messages: MessageItem[]) => {
        const groups: { [key: string]: MessageItem[] } = {};
        
        messages.forEach(message => {
            const dateKey = new Date(message.timestamp).toDateString();
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(message);
        });
        
        return groups;
    };

    const SkeletonLoading = () => (
        <Box sx={{ minHeight: '100vh', padding: '12px' }}>
            <Box sx={{ maxWidth: '900px', borderRadius: "8px", backgroundColor: 'rgba(30, 41, 59, 0.1)', margin: '0 auto', padding: "12px" }}>
                <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: '8px', mb: 1 }} />
                <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: '8px', mb: 1 }} />
                <Box sx={{ height: '600px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                            <Skeleton variant="rectangular" width="60%" height={40} sx={{ borderRadius: '8px' }} />
                        </Box>
                    ))}
                </Box>
                <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: '8px', mt: 1 }} />
            </Box>
        </Box>
    );

    if (loading) {
        return <SkeletonLoading />;
    }

    if (!messageThread) {
        return (
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px' }}>
                <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Typography variant="h6" color="error">
                        Mesaj bulunamadı
                    </Typography>
                </Box>
            </Box>
        );
    }

    const messageGroups = groupMessagesByDate(messageThread.messages);

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
                        <IconButton onClick={() => navigate('/mesajlarim')} sx={{ color: '#64748b' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#ed9517',
                                fontSize: '12px',
                                fontWeight: 600
                            }}
                        >
                            {messageThread.otherUser.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>
                                {messageThread.otherUser.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '11px' }}>
                                {messageThread.isBlocked ? 'Engellenmiş' : 'Aktif'}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton onClick={handleMenuOpen} sx={{ color: '#64748b' }}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                {/* Listing Info */}
                <Card 
                    onClick={handleListingClick}
                    sx={{
                        mb: 1,
                        cursor: 'pointer',
                        background: '#fff',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        '&:hover': {
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }
                    }}
                >
                    <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {messageThread.listing.image && (
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        width: 60, 
                                        height: 45, 
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        flexShrink: 0
                                    }}
                                    image={messageThread.listing.image}
                                    alt={messageThread.listing.title}
                                />
                            )}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        fontSize: '13px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        mb: 0.5
                                    }}
                                >
                                    {messageThread.listing.title}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: '#64748b', 
                                            fontSize: '11px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '60%'
                                        }}
                                    >
                                        {messageThread.listing.district}, {messageThread.listing.neighborhood}
                                    </Typography>
                                    <Typography 
                                        variant="subtitle2" 
                                        sx={{
                                            color: '#ed9517',
                                            fontWeight: 700,
                                            fontSize: '12px'
                                        }}
                                    >
                                        {parseInt(messageThread.listing.price).toLocaleString('tr-TR')} ₺
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Messages Container */}
                <Card sx={{
                    background: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Messages */}
                    <Box sx={{ 
                        flex: 1, 
                        p: 2, 
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        {Object.entries(messageGroups).map(([dateKey, messages]) => (
                            <React.Fragment key={dateKey}>
                                {/* Date Separator */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    my: 1 
                                }}>
                                    <Chip 
                                        label={formatMessageDate(messages[0].timestamp)}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(100, 116, 139, 0.1)',
                                            color: '#64748b',
                                            fontSize: '10px',
                                            height: '20px'
                                        }}
                                    />
                                </Box>

                                {/* Messages for this date */}
                                {messages.map((message, index) => (
                                    <Box
                                        key={message.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                                            mb: 0.5
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: '70%',
                                                minWidth: '20%'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: message.isOwn ? '#ed9517' : '#f1f5f9',
                                                    color: message.isOwn ? 'white' : '#1e293b',
                                                    borderRadius: '12px',
                                                    px: 2,
                                                    py: 1.5,
                                                    borderBottomRightRadius: message.isOwn ? '4px' : '12px',
                                                    borderBottomLeftRadius: message.isOwn ? '12px' : '4px',
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '13px', lineHeight: 1.4 }}>
                                                    {message.content}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
                                                mt: 0.5,
                                                alignItems: 'center',
                                                gap: 0.5
                                            }}>
                                                <AccessTimeIcon sx={{ fontSize: 10, color: '#94a3b8' }} />
                                                <Typography sx={{ 
                                                    fontSize: '10px', 
                                                    color: '#94a3b8'
                                                }}>
                                                    {formatMessageTime(message.timestamp)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </React.Fragment>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Message Input */}
                    {!messageThread.isBlocked && (
                        <Box sx={{ 
                            p: 2, 
                            borderTop: '1px solid #e5e7eb',
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end'
                        }}>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={3}
                                placeholder="Mesajınızı yazın..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={sending}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        backgroundColor: '#f8fafc',
                                        fontSize: '13px',
                                        '& fieldset': {
                                            border: '1px solid #e2e8f0',
                                        },
                                        '&:hover fieldset': {
                                            border: '1px solid #cbd5e1',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: '1px solid #ed9517',
                                        }
                                    },
                                    '& .MuiInputBase-input': {
                                        py: 1.5
                                    }
                                }}
                            />
                            <IconButton
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim() || sending}
                                sx={{
                                    backgroundColor: '#ed9517',
                                    color: 'white',
                                    width: 40,
                                    height: 40,
                                    '&:hover': {
                                        backgroundColor: '#d97706'
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#e5e7eb',
                                        color: '#9ca3af'
                                    }
                                }}
                            >
                                <SendIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    )}

                    {messageThread.isBlocked && (
                        <Box sx={{ 
                            p: 2, 
                            borderTop: '1px solid #e5e7eb',
                            backgroundColor: '#fef2f2',
                            textAlign: 'center'
                        }}>
                            <Typography sx={{ fontSize: '12px', color: '#dc2626' }}>
                                Bu kullanıcı engellenmiş. Mesaj gönderemezsiniz.
                            </Typography>
                        </Box>
                    )}
                </Card>

                {/* Options Menu */}
                <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            mt: 1
                        }
                    }}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ fontSize: '14px', py: 1, color: '#dc2626' }}>
                        <BlockIcon sx={{ fontSize: 16, mr: 1 }} />
                        Kullanıcıyı Engelle
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ fontSize: '14px', py: 1, color: '#dc2626' }}>
                        <ReportIcon sx={{ fontSize: 16, mr: 1 }} />
                        Şikayet Et
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ fontSize: '14px', py: 1, color: '#dc2626' }}>
                        <DeleteIcon sx={{ fontSize: 16, mr: 1 }} />
                        Konuşmayı Sil
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
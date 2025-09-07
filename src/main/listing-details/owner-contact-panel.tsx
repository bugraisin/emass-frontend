import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Button, 
  Divider,
  TextField,
  IconButton
} from '@mui/material';
import { 
  Phone, 
  Email, 
  Star,
  WhatsApp,
  Send
} from '@mui/icons-material';

interface OwnerContactPanelProps {
  listingId: string;
}

export default function OwnerContactPanel({ listingId }: OwnerContactPanelProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data - sonra backend'den gelecek
  const ownerData = {
    name: "Mehmet Yılmaz",
    phone: "+90 532 123 45 67",
    email: "mehmet.yilmaz@email.com",
    rating: 4.8,
    reviewCount: 23
  };

  const handlePhoneCall = () => {
    window.open(`tel:${ownerData.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const whatsappMessage = message || `Merhaba, ${listingId} numaralı ilanınız hakkında bilgi almak istiyorum.`;
    const whatsappUrl = `https://wa.me/${ownerData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `${listingId} numaralı ilan hakkında`;
    const body = message || `Merhaba ${ownerData.name},\n\n${listingId} numaralı ilanınız hakkında bilgi almak istiyorum.\n\nTeşekkürler.`;
    window.open(`mailto:${ownerData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Mesaj gönderiliyor:', message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Card 
      >
        <CardContent sx={{ p: 1, background: 'rgba(148, 163, 184, 0.1)', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Ana Butonlar */}
            <Box sx={{ 
                display: 'flex', 
                marginBottom: '8px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.7)',
            }}>
            <Button
              onClick={() => setShowMessage(false)}
              sx={{
                flex: 1,
                fontSize: '9px', 
                fontWeight: 600,
                color: !showMessage ? '#ed9517' : '#64748b',
                backgroundColor: !showMessage ? 'rgba(237, 149, 23, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '8px 2px',
                minWidth: 0,
                textTransform: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                '&:hover': {
                  backgroundColor: !showMessage ? 'rgba(237, 149, 23, 0.15)' : 'rgba(100, 116, 139, 0.1)',
                }
              }}
            >
              <Phone sx={{ fontSize: 14 }} />
              <Box sx={{ fontSize: '9px', lineHeight: 1, textAlign: 'center' }}>
                İletişim Bilgileri
              </Box>
            </Button>
            <Button
              onClick={() => setShowMessage(true)}
              sx={{
                flex: 1,
                fontSize: '9px', 
                fontWeight: 600,
                color: showMessage ? '#ed9517' : '#64748b',
                backgroundColor: showMessage ? 'rgba(237, 149, 23, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '8px 2px',
                minWidth: 0,
                textTransform: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                '&:hover': {
                  backgroundColor: showMessage ? 'rgba(237, 149, 23, 0.15)' : 'rgba(100, 116, 139, 0.1)',
                }
              }}
            >
              <Send sx={{ fontSize: 14 }} />
              <Box sx={{ fontSize: '9px', lineHeight: 1, textAlign: 'center' }}>
                Mesaj Gönder
              </Box>
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* İletişim Bilgileri */}
          {!showMessage && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Profil */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    mr: 2,
                    bgcolor: '#1976d2',
                    fontSize: '16px'
                  }}
                >
                  {ownerData.name.charAt(0)}
                </Avatar>
                
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '14px',
                      color: '#1e293b',
                      mb: 0.5
                    }}
                  >
                    {ownerData.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ fontSize: 12, color: '#fbbf24', mr: 0.5 }} />
                    <Typography variant="caption" sx={{ fontSize: '12px', color: '#64748b' }}>
                      {ownerData.rating} ({ownerData.reviewCount})
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* İletişim Butonları */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Phone sx={{ fontSize: 16 }} />}
                  onClick={handlePhoneCall}
                  sx={{
                    fontSize: '13px',
                    textTransform: 'none',
                    py: 1,
                    justifyContent: 'flex-start'
                  }}
                >
                  {ownerData.phone}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<WhatsApp sx={{ fontSize: 16, color: '#25d366' }} />}
                  onClick={handleWhatsApp}
                  sx={{
                    fontSize: '13px',
                    textTransform: 'none',
                    py: 1,
                    justifyContent: 'flex-start'
                  }}
                >
                  WhatsApp Mesaj
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Email sx={{ fontSize: 16 }} />}
                  onClick={handleEmail}
                  sx={{
                    fontSize: '13px',
                    textTransform: 'none',
                    py: 1,
                    justifyContent: 'flex-start'
                  }}
                >
                  E-posta Gönder
                </Button>
              </Box>
            </Box>
          )}

          {/* Mesaj Gönderme */}
          {showMessage && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontSize: '14px', fontWeight: 600, mb: 1 }}>
                {ownerData.name}'a mesaj gönderin
              </Typography>
              
              <TextField
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Merhaba, ilan hakkında bilgi almak istiyorum..."
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    fontSize: '13px'
                  }
                }}
              />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Send sx={{ fontSize: 16 }} />}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  sx={{
                    flex: 1,
                    fontSize: '13px',
                    textTransform: 'none',
                    py: 1
                  }}
                >
                  Gönder
                </Button>
                
                <IconButton
                  onClick={handleWhatsApp}
                  sx={{
                    color: '#25d366',
                    border: '1px solid #25d366',
                    borderRadius: 1
                  }}
                >
                  <WhatsApp sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>

              <Typography variant="caption" sx={{ 
                fontSize: '11px', 
                color: '#64748b',
                textAlign: 'center',
                mt: 2
              }}>
                Mesajınız doğrudan emlak sahibine iletilecektir
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
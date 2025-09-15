import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, TextField, IconButton, Avatar, Switch, FormControlLabel, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    totalListings: number;
    profileViews: number;
    memberSince: string;
}

export default function UserAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [activeSection, setActiveSection] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        id: '1',
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        email: 'ahmet.yilmaz@email.com',
        phone: '+90 555 123 45 67',
        emailVerified: true,
        phoneVerified: false,
        totalListings: 12,
        profileViews: 156,
        memberSince: '2024-01-15'
    });

    const [formData, setFormData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        profilePublic: true,
        showContactInfo: false
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSettingChange = (setting: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [setting]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserData(prev => ({
            ...prev,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
        }));
        setEditMode(false);
        setLoading(false);
    };

    const sections = [
        { id: 'profile', label: 'Kişisel Bilgiler', icon: EditIcon },
        { id: 'security', label: 'Güvenlik', icon: SecurityIcon },
        { id: 'notifications', label: 'Bildirimler', icon: NotificationsIcon },
        { id: 'privacy', label: 'Gizlilik', icon: LanguageIcon },
        { id: 'stats', label: 'İstatistikler', icon: VisibilityIcon }
    ];

    const renderProfileSection = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Profile Header */}
            <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                sx={{ 
                                    width: 50, 
                                    height: 50,
                                    backgroundColor: '#ed9517',
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}
                            >
                                {userData.firstName[0]}{userData.lastName[0]}
                            </Avatar>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: -2,
                                    right: -2,
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    width: 20,
                                    height: 20,
                                    '&:hover': { backgroundColor: '#f8fafc' }
                                }}
                            >
                                <PhotoCameraIcon sx={{ fontSize: 10 }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                {userData.firstName} {userData.lastName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '12px' }}>
                                Üye: {new Date(userData.memberSince).toLocaleDateString('tr-TR')}
                            </Typography>
                        </Box>

                        <Button
                            onClick={() => setEditMode(!editMode)}
                            startIcon={<EditIcon />}
                            size="small"
                            sx={{
                                color: '#64748b',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                textTransform: 'none',
                                fontSize: '11px',
                                py: 0.5,
                                px: 1.5,
                                '&:hover': { backgroundColor: '#f8fafc' }
                            }}
                        >
                            {editMode ? 'İptal' : 'Düzenle'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Personal Information Form */}
            <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                        Kişisel Bilgiler
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
                        <TextField
                            label="Ad"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                        <TextField
                            label="Soyad"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                        <TextField
                            label="E-posta"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                        <TextField
                            label="Telefon"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!editMode}
                            size="small"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                        />
                    </Box>

                    {editMode && (
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => setEditMode(false)}
                                size="small"
                                sx={{
                                    color: '#64748b',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    fontSize: '11px'
                                }}
                            >
                                İptal
                            </Button>
                            <Button
                                onClick={handleSave}
                                startIcon={<SaveIcon />}
                                disabled={loading}
                                size="small"
                                sx={{
                                    backgroundColor: '#ed9517',
                                    color: 'white',
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    fontSize: '11px',
                                    '&:hover': { backgroundColor: '#d97706' }
                                }}
                            >
                                {loading ? 'Kaydediliyor...' : 'Kaydet'}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );

    const renderSecuritySection = () => (
        <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Şifre Değiştir
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: '300px' }}>
                    <TextField
                        label="Mevcut Şifre"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                    {showPassword ? <VisibilityOffIcon sx={{ fontSize: 16 }} /> : <VisibilityIcon sx={{ fontSize: 16 }} />}
                                </IconButton>
                            )
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                    />
                    <TextField
                        label="Yeni Şifre"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                    />
                    <TextField
                        label="Yeni Şifre Tekrar"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                    />

                    <Button
                        startIcon={<SecurityIcon sx={{ fontSize: 14 }} />}
                        size="small"
                        sx={{
                            backgroundColor: '#ed9517',
                            color: 'white',
                            borderRadius: '4px',
                            textTransform: 'none',
                            fontSize: '11px',
                            mt: 1,
                            '&:hover': { backgroundColor: '#d97706' }
                        }}
                    >
                        Şifreyi Güncelle
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    const renderNotificationsSection = () => (
        <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Bildirim Tercihleri
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={settings.emailNotifications}
                                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                sx={{ 
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#ed9517' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ed9517' }
                                }}
                            />
                        }
                        label="E-posta bildirimleri"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={settings.smsNotifications}
                                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                                sx={{ 
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#ed9517' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ed9517' }
                                }}
                            />
                        }
                        label="SMS bildirimleri"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={settings.marketingEmails}
                                onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                                sx={{ 
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#ed9517' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ed9517' }
                                }}
                            />
                        }
                        label="Pazarlama e-postaları"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                    />
                </Box>
            </CardContent>
        </Card>
    );

    const renderPrivacySection = () => (
        <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Gizlilik Ayarları
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={settings.profilePublic}
                                onChange={(e) => handleSettingChange('profilePublic', e.target.checked)}
                                sx={{ 
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#ed9517' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ed9517' }
                                }}
                            />
                        }
                        label="Profilim herkese açık"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={settings.showContactInfo}
                                onChange={(e) => handleSettingChange('showContactInfo', e.target.checked)}
                                sx={{ 
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#ed9517' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#ed9517' }
                                }}
                            />
                        }
                        label="İletişim bilgilerimi göster"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#dc2626', mb: 1 }}>
                        Hesabı Sil
                    </Typography>
                    <Button
                        startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                        size="small"
                        sx={{
                            color: '#dc2626',
                            border: '1px solid #dc2626',
                            borderRadius: '4px',
                            textTransform: 'none',
                            fontSize: '11px',
                            '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.1)' }
                        }}
                    >
                        Hesabımı Sil
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    const renderStatsSection = () => (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1.5 }}>
            <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#ed9517', mb: 0.5 }}>
                        {userData.totalListings}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '11px' }}>
                        Toplam İlan
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#3b82f6', mb: 0.5 }}>
                        {userData.profileViews}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '11px' }}>
                        Profil Görüntülenme
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#22c55e', mb: 0.5 }}>
                        24
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '11px' }}>
                        Bu Ay Görüntülenme
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'security':
                return renderSecuritySection();
            case 'notifications':
                return renderNotificationsSection();
            case 'privacy':
                return renderPrivacySection();
            case 'stats':
                return renderStatsSection();
            default:
                return renderProfileSection();
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', padding: '6px', backgroundColor: '#f8fafc' }}>
            <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: "6px" }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1.5,
                    p: 1.5,
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={() => navigate('/')} sx={{ color: '#64748b' }} size="small">
                            <ArrowBackIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '18px' }}>
                            Hesabım
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 1.5 }}>
                    {/* Sidebar */}
                    <Card sx={{ border: '1px solid #e5e7eb', borderRadius: '6px', height: 'fit-content' }}>
                        <CardContent sx={{ p: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {sections.map((section) => {
                                    const IconComponent = section.icon;
                                    return (
                                        <Button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            startIcon={<IconComponent sx={{ fontSize: 14 }} />}
                                            size="small"
                                            sx={{
                                                justifyContent: 'flex-start',
                                                color: activeSection === section.id ? '#ed9517' : '#64748b',
                                                backgroundColor: activeSection === section.id ? 'rgba(237, 149, 23, 0.1)' : 'transparent',
                                                borderRadius: '4px',
                                                textTransform: 'none',
                                                fontSize: '11px',
                                                py: 0.75,
                                                px: 1,
                                                minHeight: '28px',
                                                '&:hover': {
                                                    backgroundColor: activeSection === section.id ? 'rgba(237, 149, 23, 0.1)' : '#f8fafc'
                                                }
                                            }}
                                        >
                                            {section.label}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Main Content - Fixed Height Container */}
                    <Box sx={{ minHeight: '350px', height: 'fit-content', overflow: 'hidden' }}>
                        {renderContent()}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
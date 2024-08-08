import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Card, CardMedia, IconButton, Alert } from "@mui/material";
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AdvertData {
  title: string;
  description: string;
  rooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  floors: number;
  floorNumber: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  postalCode: string;
  heatingType: string;
  airConditioning: boolean;
  balcony: boolean;
  parking: boolean;
  furnished: boolean;
  salePrice: number;
  rentalPrice: number;
  emlakTuru: string;
  kategori: string;
  ilanTuru: string;
  fileNames: string[];
}


export const IlanDetaylarıComponent = () => {
  // State Değişkenleri
  const navigate = useNavigate();
  
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState<number | string>('');
  const [bathrooms, setBathrooms] = useState<number | string>('');
  const [area, setArea] = useState<number | string>('');
  const [yearBuilt, setYearBuilt] = useState<number | string>('');
  const [floors, setFloors] = useState<number | string>('');
  const [floorNumber, setFloorNumber] = useState<number | string>('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [heatingType, setHeatingType] = useState('');
  const [airConditioning, setAirConditioning] = useState('');
  const [balcony, setBalcony] = useState('');
  const [parking, setParking] = useState('');
  const [furnished, setFurnished] = useState('');
  const [salePrice, setSalePrice] = useState<number | string>('');
  const [rentalPrice, setRentalPrice] = useState<number | string>('');
  const [emlakTuru, setEmlakTuru] = useState('');
  const [kategori, setKategori] = useState('');
  const [ilanTuru, setIlanTuru] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  
  const getAltKategoriOptions = () => {
    switch (ilanTuru) {
      case 'Konut':
        return ['Daire', 'Müstakil Ev', 'Villa', 'Rezidans', 'Yazlık', 'Yalı', 'Köşk & Konak'];
      case 'İş Yeri':
        return [
          'Akaryakıt İstasyonu', 'Apartman Dairesi', 'Atölye', 
          'Büfe', 'Büro & Ofis', 'Cafe & Bar', 'Depo', 
          'Çiftlik', 'Düğün Salonu', 'Dükkan', 'Garaj', 
          'Komple Bina', 'Otopark', 'Pastane & Fırın', 
          'Plaza', 'Restoran & Lokanta', 'Yurt'
        ];
      case 'Arsa':
        return ['Tarla', 'Bağ', 'Bahçe'];
      case 'Bina':
        return ['Apartman', 'Site', 'Plaza'];
      default:
        return [];
    }
  };

  // Dosya Değişikliği
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }
  };

  // Dosya Silme
  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Form Verilerini Gönderme
  const handleSubmit = async () => {
    try {
      const advertData: AdvertData = {
        title,
        description,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        yearBuilt: Number(yearBuilt),
        floors: Number(floors),
        floorNumber: Number(floorNumber),
        city,
        district,
        neighborhood,
        address,
        postalCode,
        heatingType,
        airConditioning: airConditioning === 'Var',
        balcony: balcony === 'Var',
        parking: parking === 'Var',
        furnished: furnished === 'Evet',
        salePrice: Number(salePrice),
        rentalPrice: Number(rentalPrice),
        emlakTuru,
        kategori,
        ilanTuru,
        fileNames: [] // Dosya yükleme işlemi yoksa boş bırakabilirsiniz
      };

      const userId = '123';

      const response = await axios.post(`http://localhost:8080/api/adverts/${userId}`, advertData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setAlertSeverity('success');
      setAlertMessage('İlan başarıyla gönderildi!');
      setAlertOpen(true);
      navigate('/');
      console.log('API Yanıtı:', response.data);
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Bir hata oluştu, lütfen tekrar deneyin.');
      setAlertOpen(true);
      console.error('API Hatası:', error);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={{ width: "80%", margin: 'auto', padding: 2 }}>
      {/* İlan Başlığı ve Açıklaması */}
      <Typography variant="h6" gutterBottom>İlan Başlığı ve Açıklaması</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="İlan Başlığı"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="İlan Açıklaması"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>Kategori Seçimi</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>İlan Türü</InputLabel>
            <Select
              value={ilanTuru}
              onChange={(e) => setIlanTuru(e.target.value) }
              label="İlan Türü"
            >
              <MenuItem value="Konut">Konut</MenuItem>
              <MenuItem value="İş Yeri">İş Yeri</MenuItem>
              <MenuItem value="Arsa">Arsa</MenuItem>
              <MenuItem value="Bina">Bina</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              label="Kategori"
              disabled={!ilanTuru} // Kategori seçimi sadece emlak türü seçildiyse aktif
            >
              {getAltKategoriOptions().map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
       {/* Fiyat Bilgileri */}
       <Typography variant="h6" gutterBottom>Fiyat Bilgileri</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="emlak-turu-label">Emlak Türü</InputLabel>
            <Select
              labelId="emlak-turu-label"
              label="Emlak Türü"
              value={emlakTuru}
              onChange={(e) => {
                setEmlakTuru(e.target.value);
                if (e.target.value === 'Satılık') {
                  setRentalPrice('');
                } else if (e.target.value === 'Kiralık') {
                  setSalePrice('');
                }
              }}
            >
              <MenuItem value="Satılık">Satılık</MenuItem>
              <MenuItem value="Kiralık">Kiralık</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {emlakTuru === 'Satılık' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Satış Fiyatı (TL)"
              type="number"
              variant="outlined"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </Grid>
        )}
        {emlakTuru === 'Kiralık' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kira Fiyatı (TL)"
              type="number"
              variant="outlined"
              value={rentalPrice}
              onChange={(e) => setRentalPrice(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
      <Divider sx={{ my: 3 }} />
      {/* Fiziksel Özellikler */}
      <Typography variant="h6" gutterBottom>Fiziksel Özellikler</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Oda Sayısı"
            variant="outlined"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Banyo Sayısı"
            variant="outlined"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Metrekare"
            variant="outlined"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Yapım Yılı"
            variant="outlined"
            value={yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Kat Sayısı"
            variant="outlined"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bulunduğu Kat"
            variant="outlined"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      {/* Konum Bilgileri */}
      <Typography variant="h6" gutterBottom>Konum Bilgileri</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Şehir"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="İlçe"
            variant="outlined"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mahalle/Semt"
            variant="outlined"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Posta Kodu"
            variant="outlined"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Adres"
            variant="outlined"
            multiline
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      {/* Diğer Özellikler */}
      <Typography variant="h6" gutterBottom>Diğer Özellikler</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Isıtma Tipi</InputLabel>
            <Select
              value={heatingType}
              onChange={(e) => setHeatingType(e.target.value)}
              label="Isıtma Tipi"
            >
              <MenuItem value="Doğalgaz">Doğalgaz</MenuItem>
              <MenuItem value="Kömür">Kömür</MenuItem>
              <MenuItem value="Soba">Soba</MenuItem>
              <MenuItem value="Elektrik">Elektrik</MenuItem>
              <MenuItem value="Yok">Yok</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Klima</InputLabel>
            <Select
              value={airConditioning}
              onChange={(e) => setAirConditioning(e.target.value)}
              label="Klima"
            >
              <MenuItem value="Var">Var</MenuItem>
              <MenuItem value="Yok">Yok</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Balkon/Teras</InputLabel>
            <Select
              value={balcony}
              onChange={(e) => setBalcony(e.target.value)}
              label="Balkon/Teras"
            >
              <MenuItem value="Var">Var</MenuItem>
              <MenuItem value="Yok">Yok</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Otopark</InputLabel>
            <Select
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              label="Otopark"
            >
              <MenuItem value="Var">Var</MenuItem>
              <MenuItem value="Yok">Yok</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Eşyalı</InputLabel>
            <Select
              value={furnished}
              onChange={(e) => setFurnished(e.target.value)}
              label="Eşyalı"
            >
              <MenuItem value="Evet">Evet</MenuItem>
              <MenuItem value="Hayır">Hayır</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      {/* Dosyalar */}
      <Typography variant="h6" gutterBottom>Görseller</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <input
            type="file"
            id="file-input"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span" sx={{ textTransform: "none"}}>
              Fotoğraf Yükle
            </Button>
          </label>
        </Box>
        <Grid container spacing={2}>
          {files.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={URL.createObjectURL(file)}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ my: 3 }} />
       {/* Formu Gönderme Butonu */}
       <Box>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ textTransform: 'none' }}>
            İlanı Gönder
          </Button>

          {/* Alert Bileşeni */}
          {alertOpen && (
            <Alert
              variant='filled'
              severity={alertSeverity}
              onClose={handleAlertClose}
              sx={{ marginTop: 2 }}
            >
              {alertMessage}
            </Alert>
          )}
        </Box>
    </Box>
  );
};

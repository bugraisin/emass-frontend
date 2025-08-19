import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Divider, TextField, Grid, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface StepFourProps {
    category: string;
    type: string;
    onDetailsSubmit: (details: {
        title: string;
        description: string;
        squareMeters: number;
        price: number;
        roomCount: number;
        buildingAge: number;
        photos: File[];
    }) => void;
}

export default function StepFour({ category, type, onDetailsSubmit }: StepFourProps) {
    const [photos, setPhotos] = useState<File[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [squareMeters, setSquareMeters] = useState(0);
    const [price, setPrice] = useState(0);
    const [roomCount, setRoomCount] = useState(0);
    const [buildingAge, setBuildingAge] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            setPhotos((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setPhotos((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onDetailsSubmit({
            title,
            description,
            squareMeters,
            price,
            roomCount,
            buildingAge,
            photos,
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Detaylı Bilgi
            </Typography>

            {category === "Konut" && (
                <Grid container spacing={2}>
                    {/* Kart 1: Başlık */}
                    <Grid item xs={12} sm={16}>
                        <Card sx={{ padding: 1, boxShadow: 3 }}>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="İlan Başlığı"
                                    variant="outlined"
                                    placeholder="İlan başlığı giriniz"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    {/* Kart 2: Açıklama */}
                    <Grid item xs={12} sm={16}>
                        <Card sx={{ padding: 1, boxShadow: 3 }}>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="İlan Açıklaması"
                                    variant="outlined"
                                    placeholder="İlan açıklaması giriniz"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Kart 3: Metrekare */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle1" align="center" sx={{ my: 1 }}>Metrekare</Typography>
                                <TextField
                                    fullWidth
                                    label="Metrekare"
                                    variant="outlined"
                                    type="number"
                                    placeholder="Metrekare giriniz"
                                    value={squareMeters}
                                    onChange={(e) => setSquareMeters(Number(e.target.value))}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Kart 4: Fiyat */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle1" align="center" sx={{ my: 1 }}>Fiyat</Typography>
                                <TextField
                                    fullWidth
                                    label="Fiyat"
                                    variant="outlined"
                                    type="number"
                                    placeholder="Fiyat giriniz"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Kart 5: Oda Sayısı */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle1" align="center" sx={{ my: 1 }}>Oda Sayısı</Typography>
                                <TextField
                                    fullWidth
                                    label="Oda Sayısı"
                                    variant="outlined"
                                    type="number"
                                    placeholder="Oda sayısı giriniz"
                                    value={roomCount}
                                    onChange={(e) => setRoomCount(Number(e.target.value))}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Kart 6: Bina Yaşı */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle1" align="center" sx={{ my: 1 }}>Bina Yaşı</Typography>
                                <TextField
                                    fullWidth
                                    label="Bina Yaşı"
                                    variant="outlined"
                                    type="number"
                                    placeholder="Bina yaşı giriniz"
                                    value={buildingAge}
                                    onChange={(e) => setBuildingAge(Number(e.target.value))}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            {/* Fotoğraf Ekleme Kısmı */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Fotoğraf Ekle
                </Typography>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Fotoğraf Yükle
                    </Button>
                </label>

                {/* Yüklenen Fotoğrafların Listesi */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", mt: 2 }}>
                    {photos.map((file, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Box sx={{ position: "relative", display: "inline-block", width: 200, height: 200 }}>
                                <img
                                    src={URL.createObjectURL(file)} 
                                    alt={`uploaded-${index}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        border: "1px solid black"
                                    }}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleRemoveFile(index)}
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}
                </Box>
            </Box>

            {/* Bilgileri Kaydet Butonu */}
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Bilgileri Kaydet
            </Button>
        </Box>
    );
}
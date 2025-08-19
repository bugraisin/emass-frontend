import { Box, Button, Stepper, Step, StepLabel, Typography, Card, CardMedia, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StepFour from "./step-four.tsx";

export default function Advert() {
    const steps = ['İlan Türü', 'Konum Bilgisi', 'Haritada Seç', 'Detaylı Bilgi', 'Gözden Geçir'];
    const [activeStep, setActiveStep] = useState<number>(0);

    // Tüm adımlardan gelen bilgileri saklamak için state
    const [advertData, setAdvertData] = useState({
        category: '', // Konut, İşyeri, Arsa, Bina
        type: '', // Daire, Villa, Ofis, Depo vb.
        sellType: '', // Satılık, Kiralık
        location: {
            city: '', // Şehir
            district: '', // İlçe
            neighborhood: '', // Mahalle
        },
        coordinates: {
            lat: 0, // Enlem
            lng: 0, // Boylam
        },
        details: {
            title: '', // İlan Başlığı
            description: '', // İlan Açıklaması
            squareMeters: 0, // Metrekare
            price: 0, // Fiyat
            roomCount: 0, // Oda Sayısı
            buildingAge: 0, // Bina Yaşı
            photos: [] as File[], // Fotoğraflar
        },
    });
    
    // StepOne'dan gelen bilgileri güncelle
    const handleStepOneData = (category: string, type: string, sellType: string) => {
        setAdvertData((prev) => ({
            ...prev,
            category,
            type,
            sellType,
        }));
    };

    // StepTwo'dan gelen bilgileri güncelle
    const handleStepTwoData = (city: string, district: string, neighborhood: string) => {
        setAdvertData((prev) => ({
            ...prev,
            location: {
                city,
                district,
                neighborhood,
            },
        }));
    };

    // StepThree'dan gelen bilgileri güncelle
    const handleStepThreeData = (lat: number, lng: number) => {
        setAdvertData((prev) => ({
            ...prev,
            coordinates: {
                lat,
                lng,
            },
        }));
    };

    // StepFour'dan gelen bilgileri güncelle
    const handleStepFourData = (details: {
        title: string;
        description: string;
        squareMeters: number;
        price: number;
        roomCount: number;
        buildingAge: number;
        photos: File[];
    }) => {
        setAdvertData((prev) => ({
            ...prev,
            details,
        }));
    };

    const handleNextStep = () => {
        if (activeStep === 0 && advertData.category && advertData.sellType) {
            setActiveStep(1);
        } else if (activeStep === 1 && advertData.location.city && advertData.location.district && advertData.location.neighborhood) {
            setActiveStep(2);
        } else if (activeStep === 2 && advertData.coordinates.lat && advertData.coordinates.lng) {
            setActiveStep(3);
        } else if (activeStep === 3 && advertData.details.title && advertData.details.description) {
            setActiveStep(4);
        } else if (activeStep === 4) {
            console.log("Tüm adımlar tamamlandı. İlan bilgileri:", advertData);
        }
    };

    const handleBackStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    function isNextButtonDisabled() {
        if (activeStep === 0) {
            return !(advertData.category && advertData.sellType);
        } else if (activeStep === 1) {
            return !(advertData.location.city && advertData.location.district && advertData.location.neighborhood);
        } else if (activeStep === 2) {
            return !(advertData.coordinates.lat && advertData.coordinates.lng);
        } else if (activeStep === 3) {
            return !(advertData.details.title && advertData.details.description);
        } else if (activeStep === 4) {
            return false;
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    border: '4px solid #d3d3d3',
                    alignItems: 'center',
                    width: '1080px',
                    marginTop: '1%',
                    marginBottom: '1%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}    
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 2 }}>
                    <Stepper activeStep={activeStep} sx={{ width: '80%' }}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel 
                                    sx={{
                                        color: activeStep === index ? '#FF5722' : '#6c757d', 
                                        fontWeight: activeStep === index ? 'bold' : 'normal',
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
                    {activeStep === 0 && (
                        <StepOne
                            category={advertData.category}
                            setCategory={(category) => handleStepOneData(category, advertData.type, advertData.sellType)}
                            type={advertData.type}
                            setType={(type) => handleStepOneData(advertData.category, type, advertData.sellType)}
                            sellType={advertData.sellType}
                            setSellType={(sellType) => handleStepOneData(advertData.category, advertData.type, sellType)}
                        />
                    )}
                    {activeStep === 1 && (
                        <StepTwo
                            onLocationSelect={(city, district, neighborhood) => handleStepTwoData(city, district, neighborhood)}
                        />
                    )}
                    {activeStep === 2 && ( 

                        <StepThree
                            onCoordinatesSelect={(lat, lng) => handleStepThreeData(lat, lng)}
                            il={advertData.location.city}
                            ilce={advertData.location.district}
                            mahalle={advertData.location.neighborhood}
                        />
                    )}
                    {activeStep === 3 && ( 
                        <StepFour
                            category={advertData.category}
                            type={advertData.type}
                            onDetailsSubmit={(details) => handleStepFourData(details)}
                        />
                    )}
                    {activeStep === 4 && ( 
                        <Box sx={{ margin: "auto", width: "100%", padding: 2, boxShadow: 3, borderRadius: 2, bgcolor: "white", display: "flex" }}>
                        {/* Sol Kısım - Fotoğraf ve Açıklama */}
                            <Box sx={{ flex: 1, marginRight: 2 }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        alt="İlan Fotoğrafı"
                                    />
                                </Card>
                                <Typography variant="h6" sx={{ mt: 2 }}>Açıklama</Typography>
                                <Typography variant="body1">{advertData.details.description}</Typography>
                            </Box>
                        
                        {/* Sağ Kısım - Bilgiler */}
                            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                <Typography variant="h5" fontWeight="bold">{advertData.details.title}</Typography>
                                <Typography variant="h6" color="green">{advertData.details.price} TL</Typography>
                                <Typography variant="body2" color="textSecondary">{advertData.category} - {advertData.type} - {advertData.sellType}</Typography>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                <Grid container spacing={2}>
                                    <Grid item xs={24}>
                                        <Typography variant="body1"><b>İl:</b> {advertData.location.city}</Typography>
                                        <Typography variant="body1"><b>İlçe:</b> {advertData.location.district}</Typography>
                                        <Typography variant="body1"><b>Mahalle:</b> {advertData.location.neighborhood}</Typography>
                                        <Typography variant="body1"><b>Metrekare:</b> {advertData.details.squareMeters} m²</Typography>
                                        <Typography variant="body1"><b>Oda Sayısı:</b> {advertData.details.roomCount}</Typography>
                                        <Typography variant="body1"><b>Bina Yaşı:</b> {advertData.details.buildingAge}</Typography>
                                        <Typography variant="body1"><b>Fotoğraflar:</b> {advertData.details.photos.length} adet</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleBackStep}
                        disabled={activeStep === 0}
                        sx={{
                            textTransform: 'none',
                            padding: '10px 20px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: activeStep === 0 ? '#d3d3d3' : '#ed9517',
                            color: activeStep === 0 ? '#9e9e9e' : 'white',
                            borderRadius: '12px',
                            border: `1px solid ${activeStep === 0 ? '#d3d3d3' : '#ed9517'}`, 
                            '&:hover': {
                                backgroundColor: activeStep === 0 ? '#d3d3d3' : '#d87f0f', 
                                borderColor: activeStep === 0 ? '#d3d3d3' : '#d87f0f',
                            }
                        }}
                        startIcon={<ArrowBack />}
                    >
                        Geri
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNextStep}
                        disabled={isNextButtonDisabled()}
                        sx={{
                            textTransform: 'none',
                            padding: '10px 20px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#ed9517', 
                            color: 'white',
                            borderRadius: '12px', 
                            '&:hover': {
                                backgroundColor: '#d87f0f',
                            }
                        }}
                        endIcon={<ArrowForward />}
                    >
                        {activeStep === 4 ? "Tamamla" : "Sonraki"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
import { Box, Button, Stepper, Step, StepLabel, Typography, Card, CardMedia, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Advert() {
    const steps = ['İlan Türü', 'Temel Bilgiler', 'Özellikler'];
    const [activeStep, setActiveStep] = useState<number>(0);

    // Backend uyumlu state'ler - StepOne
    const [listingType, setListingType] = useState<string>("");
    const [propertyType, setPropertyType] = useState<string>("");
    const [subtype, setSubtype] = useState<string>("");

    // Backend uyumlu state'ler - StepTwo
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [addressText, setAddressText] = useState<string>("");
    
    // Dinamik detaylar state'i
    const [details, setDetails] = useState<any>({});

    const handleNextStep = () => {
        if (activeStep === 0 && listingType && propertyType && subtype) {
            console.log("İlan türü bilgileri:", {
                listingType,
                propertyType,
                subtype
            });
            setActiveStep(1);
        } else if (activeStep === 1 && title && description && price && city && district) {
            console.log("Temel bilgiler:", {
                title,
                description,
                price,
                city,
                district,
                neighborhood,
                addressText
            });
            setActiveStep(2);
        } else if (activeStep === 2) {
            // İlan detaylarını kaydet
            const listingData = {
                // Temel bilgiler
                title,
                description,
                listingType,
                propertyType,
                price: parseFloat(price),
                city,
                district,
                neighborhood,
                addressText,
                
                // Tip bazlı detaylar
                [propertyType.toLowerCase() + 'Details']: {
                    subtype,
                    ...details
                }
            };
            
            console.log("Tüm ilan verileri:", listingData);
            // Burada API çağrısı yapılabilir
        }
    };

    const handleBackStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    function isNextButtonDisabled() {
        if (activeStep === 0) {
            return !(listingType && propertyType && subtype);
        } else if (activeStep === 1) {
            // StepTwo için minimum gerekli alanları kontrol et
            return !(title && description && price && city && district);
        } else if (activeStep === 2) {
            // StepThree için gerekli alan kontrolü yapılabilir
            return false;
        }
        return false;
    }

    // Step değiştiğinde detay state'ini temizle
    useEffect(() => {
        if (activeStep === 2 && Object.keys(details).length === 0) {
            // İlk kez step 3'e gelindiğinde subtype'ı detaylara ekle
            setDetails({ subtype });
        }
    }, [activeStep, subtype, details]);

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
                    border: '2px solid #d3d3d3',
                    alignItems: 'center',
                    width: '1200px',
                    height: "auto",
                    marginTop: '1%',
                    marginBottom: '1%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}    
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 3 }}>
                    <Stepper activeStep={activeStep} sx={{ 
                        width: '90%',
                        '& .MuiStepConnector-line': {
                            borderTopWidth: 3,
                            borderColor: '#e2e8f0'
                        },
                        '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                            borderColor: '#475569'
                        },
                        '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                            borderColor: '#1e293b'
                        }
                    }}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel 
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            color: activeStep === index ? '#1e293b' : '#64748b',
                                            fontWeight: activeStep === index ? 700 : 500,
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease'
                                        },
                                        '& .MuiStepIcon-root': {
                                            color: activeStep >= index ? '#475569' : '#cbd5e1',
                                            fontSize: '2rem',
                                            transition: 'all 0.3s ease',
                                            '&.Mui-active': {
                                                color: '#1e293b',
                                                transform: 'scale(1.1)'
                                            },
                                            '&.Mui-completed': {
                                                color: '#1e293b',
                                            }
                                        }
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2, flex: 1 }}>
                    {activeStep === 0 && (
                        <StepOne
                            listingType={listingType}
                            setListingType={setListingType}
                            propertyType={propertyType}
                            setPropertyType={setPropertyType}
                            subtype={subtype}
                            setSubtype={setSubtype}
                        />
                    )}
                    
                    {activeStep === 1 && (
                        <StepTwo
                            listingType={listingType}
                            propertyType={propertyType}
                            subtype={subtype}
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            price={price}
                            setPrice={setPrice}
                            city={city}
                            setCity={setCity}
                            district={district}
                            setDistrict={setDistrict}
                            neighborhood={neighborhood}
                            setNeighborhood={setNeighborhood}
                        />
                    )}
                    
                    {activeStep === 2 && (
                        <StepThree
                            listingType={listingType}
                            propertyType={propertyType}
                            subtype={subtype}
                            details={details}
                            setDetails={setDetails}
                        />
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
                            backgroundColor: activeStep === 0 ? '#f1f5f9' : '#64748b',
                            color: activeStep === 0 ? '#9ca3af' : 'white',
                            borderRadius: '12px',
                            border: `1px solid ${activeStep === 0 ? '#e5e7eb' : '#64748b'}`, 
                            '&:hover': {
                                backgroundColor: activeStep === 0 ? '#f1f5f9' : '#475569', 
                                borderColor: activeStep === 0 ? '#e5e7eb' : '#475569',
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
                            backgroundColor: isNextButtonDisabled() ? '#e5e7eb' : '#475569', 
                            color: 'white',
                            borderRadius: '12px', 
                            '&:hover': {
                                backgroundColor: isNextButtonDisabled() ? '#e5e7eb' : '#334155',
                            },
                            '&:disabled': {
                                backgroundColor: '#e5e7eb',
                                color: '#9ca3af'
                            }
                        }}
                        endIcon={<ArrowForward />}
                    >
                        {activeStep === 0 ? "İleri" : activeStep === 1 ? "İleri" : "Tamamla"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
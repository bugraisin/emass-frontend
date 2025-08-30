import { Box, Button, Stepper, Step, StepLabel, Typography, Snackbar, Alert, Backdrop, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import StepFour from "./step-four.tsx";
import StepFive from "./step-five.tsx";
import StepSix from "./step-six.tsx";
import { ArrowBack, ArrowForward, CheckCircle, Close } from "@mui/icons-material";

interface Photo {
    id: string;
    file: File;
    url: string;
    isMain: boolean;
}

export default function Advert() {
    const steps = ['İlan Türü', 'Temel Bilgiler', 'Özellikler', 'Fotoğraflar', 'Konum', 'Önizleme'];
    const [activeStep, setActiveStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
    
    // Konum state'leri - StepFive
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    
    // Property type'a göre ayrı detay state'leri
    const [housingDetails, setHousingDetails] = useState<any>({});
    const [commercialDetails, setCommercialDetails] = useState<any>({});
    const [officeDetails, setOfficeDetails] = useState<any>({});
    const [industrialDetails, setIndustrialDetails] = useState<any>({});
    const [landDetails, setLandDetails] = useState<any>({});
    const [serviceDetails, setServiceDetails] = useState<any>({});
    
    // Fotoğraflar state'i
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Aktif property type'a göre doğru detay state'ini döndüren helper fonksiyon
    const getCurrentDetails = () => {
        switch (propertyType) {
            case 'KONUT':
                return housingDetails;
            case 'TICARI':
                return commercialDetails;
            case 'OFIS':
                return officeDetails;
            case 'ENDUSTRIYEL':
                return industrialDetails;
            case 'ARSA':
                return landDetails;
            case 'HIZMET':
                return serviceDetails;
            default:
                return {};
        }
    };

    // Aktif property type'a göre doğru setter fonksiyonunu döndüren helper fonksiyon
    const getCurrentDetailsSetter = () => {
        switch (propertyType) {
            case 'KONUT':
                return setHousingDetails;
            case 'TICARI':
                return setCommercialDetails;
            case 'OFIS':
                return setOfficeDetails;
            case 'ENDUSTRIYEL':
                return setIndustrialDetails;
            case 'ARSA':
                return setLandDetails;
            case 'HIZMET':
                return setServiceDetails;
            default:
                return () => {};
        }
    };

    // Formu resetlemek için yardımcı fonksiyon
    const resetForm = () => {
        setActiveStep(0);
        setListingType("");
        setPropertyType("");
        setSubtype("");
        setTitle("");
        setDescription("");
        setPrice("");
        setCity("");
        setDistrict("");
        setNeighborhood("");
        setAddressText("");
        setLatitude(null);
        setLongitude(null);
        setHousingDetails({});
        setCommercialDetails({});
        setOfficeDetails({});
        setIndustrialDetails({});
        setLandDetails({});
        setServiceDetails({});
        setPhotos([]);
    };

    const handleNextStep = async () => {
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
            console.log(`${propertyType} detayları:`, getCurrentDetails());
            setActiveStep(3);
        } else if (activeStep === 3 && photos.length >= 1) {
            console.log("Fotoğraf bilgileri:", {
                photoCount: photos.length,
                mainPhoto: photos.find(p => p.isMain)
            });
            setActiveStep(4);
        } else if (activeStep === 4 && latitude && longitude) {
            console.log("Konum bilgileri:", {
                latitude,
                longitude,
                addressText
            });
            setActiveStep(5);
        } else if (activeStep === 5) {
            // Son adım - İlanı kaydet
            const listingData = {
                ownerId: 1, // Bu değeri gerçek kullanıcı ID'si ile değiştirin
                title,
                description,
                listingType,
                propertyType,
                price: parseFloat(price),
                city,
                district,
                neighborhood,
                addressText,
                latitude,
                longitude,
                
                // Property type'a göre doğru detaylar
                ...(propertyType === 'KONUT' && { 
                    housingDetails: { 
                        subtype, 
                        ...housingDetails 
                    } 
                }),
                ...(propertyType === 'TICARI' && { 
                    commercialDetails: { 
                        subtype, 
                        ...commercialDetails 
                    } 
                }),
                ...(propertyType === 'OFIS' && { 
                    officeDetails: { 
                        subtype, 
                        ...officeDetails 
                    } 
                }),
                ...(propertyType === 'ENDUSTRIYEL' && { 
                    industrialDetails: { 
                        subtype, 
                        ...industrialDetails 
                    } 
                }),
                ...(propertyType === 'ARSA' && { 
                    landDetails: { 
                        subtype, 
                        ...landDetails 
                    } 
                }),
                ...(propertyType === 'HIZMET' && { 
                    serviceDetails: { 
                        subtype, 
                        ...serviceDetails 
                    } 
                })
            };
            
            try {
                console.log("API'ye gönderilen veri:", listingData);
                
                setIsLoading(true);
                
                const response = await fetch('http://localhost:8080/api/listings/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(listingData)
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log("İlan başarıyla oluşturuldu:", result);
                    
                    setShowSuccess(true);
                    
                } else {
                    const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen hata' }));
                    console.error("API Hatası:", errorData);
                    setErrorMessage("İlan oluşturulurken hata oluştu: " + (errorData.message || 'Bilinmeyen hata'));
                    setShowError(true);
                }
            } catch (error) {
                console.error("Network Hatası:", error);
                setErrorMessage("Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.");
                setShowError(true);
            } finally {
                setIsLoading(false);
            }
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
            return !(title && description && price && city && district);
        } else if (activeStep === 2) {
            return false;
        } else if (activeStep === 3) {
            return photos.length < 1;
        } else if (activeStep === 4) {
            return !(latitude && longitude);
        } else if (activeStep === 5) {
            return false; // Önizleme adımında her zaman yayınlayabilir
        }
        return false;
    }

    // Property type değiştiğinde ilgili detay state'ini subtype ile başlat
    useEffect(() => {
        if (propertyType && subtype) {
            const currentDetails = getCurrentDetails();
            const currentSetter = getCurrentDetailsSetter();
            
            if (Object.keys(currentDetails).length === 0) {
                // Boolean değerleri false ile başlat
                const initialDetails = { 
                    subtype,
                    // Boolean değerler için false varsayılan değerleri
                    furnished: false,
                    balcony: false,
                    terrace: false,
                    garden: false,
                    withinSite: false,
                    openPark: false,
                    closedPark: false,
                    garagePark: false,
                    elevator: false,
                    security: false,
                    concierge: false,
                    generator: false,
                    airConditioning: false,
                    floorHeating: false,
                    fireplace: false,
                    builtinKitchen: false,
                    separateKitchen: false,
                    americanKitchen: false,
                    laundryRoom: false,
                    pool: false,
                    gym: false,
                    childrenPlayground: false,
                    sportsArea: false
                };
                currentSetter(initialDetails);
            }
        }
    }, [propertyType, subtype]);

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
                    padding: '1%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}    
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 1 }}>
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
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        },
                                        '& .MuiStepIcon-root': {
                                            color: activeStep >= index ? '#475569' : '#cbd5e1',
                                            fontSize: '1.8rem',
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flex: 1, minHeight: '500px' }}>
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
                            details={getCurrentDetails()}
                            setDetails={getCurrentDetailsSetter()}
                        />
                    )}
                    
                    {activeStep === 3 && (
                        <StepFour
                            photos={photos}
                            setPhotos={setPhotos}
                        />
                    )}
                    
                    {activeStep === 4 && (
                        <StepFive
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                            addressText={addressText}
                            setAddressText={setAddressText}
                        />
                    )}
                    
                    {activeStep === 5 && (
                        <StepSix
                            listingType={listingType}
                            propertyType={propertyType}
                            subtype={subtype}
                            title={title}
                            description={description}
                            price={price}
                            city={city}
                            district={district}
                            neighborhood={neighborhood}
                            addressText={addressText}
                            details={getCurrentDetails()}
                            photos={photos}
                            latitude={latitude}
                            longitude={longitude}
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        variant="outlined"
                        onClick={handleBackStep}
                        disabled={activeStep === 0 || isLoading}
                        sx={{
                            textTransform: 'none',
                            padding: '5px 10px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: (activeStep === 0 || isLoading) ? '#f1f5f9' : '#64748b',
                            color: (activeStep === 0 || isLoading) ? '#9ca3af' : 'white',
                            borderRadius: '8px',
                            border: `1px solid ${(activeStep === 0 || isLoading) ? '#e5e7eb' : '#64748b'}`, 
                            '&:hover': {
                                backgroundColor: (activeStep === 0 || isLoading) ? '#f1f5f9' : '#475569', 
                                borderColor: (activeStep === 0 || isLoading) ? '#e5e7eb' : '#475569',
                            }
                        }}
                        startIcon={<ArrowBack />}
                    >
                        Geri
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNextStep}
                        disabled={isNextButtonDisabled() || isLoading}
                        sx={{
                            textTransform: 'none',
                            padding: '5px 10px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: (isNextButtonDisabled() || isLoading) ? '#e5e7eb' : (activeStep === 5 ? '#059669' : '#475569'), 
                            color: 'white',
                            borderRadius: '8px', 
                            '&:hover': {
                                backgroundColor: (isNextButtonDisabled() || isLoading) ? '#e5e7eb' : (activeStep === 5 ? '#047857' : '#334155'),
                            },
                            '&:disabled': {
                                backgroundColor: '#e5e7eb',
                                color: '#9ca3af'
                            }
                        }}
                        endIcon={isLoading ? null : <ArrowForward />}
                    >
                        {isLoading ? "Gönderiliyor..." : 
                         activeStep === 0 ? "İleri" : 
                         activeStep === 1 ? "İleri" : 
                         activeStep === 2 ? "İleri" : 
                         activeStep === 3 ? "İleri" : 
                         activeStep === 4 ? "İleri" :
                         "Tamamla"}
                    </Button>
                </Box>
            </Box>

            {/* Başarı Pop-up Backdrop */}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}
                open={showSuccess}
            >
                <Fade in={showSuccess}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '40px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            position: 'relative',
                            minWidth: '350px',
                            maxWidth: '500px',
                        }}
                    >

                        {/* Başarı İkonu */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: '#dcfce7',
                                marginBottom: '20px',
                                animation: 'pulse 2s ease-in-out infinite',
                                '@keyframes pulse': {
                                    '0%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
                                    },
                                    '70%': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)',
                                    },
                                    '100%': {
                                        transform: 'scale(1)',
                                        boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
                                    },
                                }
                            }}
                        >
                            <CheckCircle
                                sx={{
                                    fontSize: '45px',
                                    color: '#059669',
                                }}
                            />
                        </Box>

                        {/* Başarı Mesajı */}
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '10px',
                                textAlign: 'center',
                                mb: 2
                            }}
                        >
                            İlan Başarıyla Oluşturuldu!
                        </Typography>

                        {/* Alt Butonlar */}
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Button
                                variant="contained"
                                onClick={() => window.location.href = '/'}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#059669',
                                    '&:hover': {
                                        backgroundColor: '#047857',
                                    }
                                }}
                            >
                                Ana Sayfaya Git
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Backdrop>

            {/* Hata Snackbar */}
            <Snackbar
                open={showError}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowError(false)}
                    severity="error"
                    sx={{
                        width: '100%',
                        fontSize: '0.95rem',
                        '& .MuiAlert-icon': {
                            fontSize: '1.2rem'
                        }
                    }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
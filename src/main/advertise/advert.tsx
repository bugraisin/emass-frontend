import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import StepFour from "./step-four.tsx";
import StepFive from "./step-five.tsx";
import StepSix from "./step-six.tsx";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface Photo {
    id: string;
    file: File;
    url: string;
    isMain: boolean;
}

export default function Advert() {
    const steps = ['İlan Türü', 'Temel Bilgiler', 'Özellikler', 'Fotoğraflar', 'Konum', 'Önizleme'];
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
                
                // Konum bilgileri
                location: {
                    latitude,
                    longitude,
                    address: addressText
                },
                
                // Property type'a göre doğru detaylar
                ...(propertyType === 'KONUT' && { housingDetails: { subtype, ...housingDetails } }),
                ...(propertyType === 'TICARI' && { commercialDetails: { subtype, ...commercialDetails } }),
                ...(propertyType === 'OFIS' && { officeDetails: { subtype, ...officeDetails } }),
                ...(propertyType === 'ENDUSTRIYEL' && { industrialDetails: { subtype, ...industrialDetails } }),
                ...(propertyType === 'ARSA' && { landDetails: { subtype, ...landDetails } }),
                ...(propertyType === 'HIZMET' && { serviceDetails: { subtype, ...serviceDetails } }),
                
                // Fotoğraflar
                photos: photos.map((photo, index) => ({
                    file: photo.file,
                    isMain: photo.isMain,
                    order: index
                }))
            };
            
            console.log("Tüm ilan verileri:", listingData);
            // Burada API çağrısı yapılabilir
            alert("İlan başarıyla oluşturuldu!");
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
                currentSetter({ subtype });
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
                        disabled={activeStep === 0}
                        sx={{
                            textTransform: 'none',
                            padding: '5px 10px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: activeStep === 0 ? '#f1f5f9' : '#64748b',
                            color: activeStep === 0 ? '#9ca3af' : 'white',
                            borderRadius: '8px',
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
                            padding: '5px 10px',
                            alignSelf: 'center',
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: isNextButtonDisabled() ? '#e5e7eb' : (activeStep === 5 ? '#059669' : '#475569'), 
                            color: 'white',
                            borderRadius: '8px', 
                            '&:hover': {
                                backgroundColor: isNextButtonDisabled() ? '#e5e7eb' : (activeStep === 5 ? '#047857' : '#334155'),
                            },
                            '&:disabled': {
                                backgroundColor: '#e5e7eb',
                                color: '#9ca3af'
                            }
                        }}
                        endIcon={<ArrowForward />}
                    >
                        {activeStep === 0 ? "İleri" : 
                         activeStep === 1 ? "İleri" : 
                         activeStep === 2 ? "İleri" : 
                         activeStep === 3 ? "İleri" : 
                         activeStep === 4 ? "İleri" :
                         "Tamamla"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
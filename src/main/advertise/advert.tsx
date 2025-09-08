import { Box, Button, Stepper, Step, StepLabel, Typography, Snackbar, Alert, Backdrop, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import StepFour from "./step-four.tsx";
import StepFive from "./step-five.tsx";
import { ArrowBack, ArrowForward, CheckCircle, Close } from "@mui/icons-material";
import StepSixOffice from "./step-six/step-six-office.tsx";
import StepSixHouse from "./step-six/step-six-house.tsx";
import { 
  HousingDetails, 
  OfficeDetails, 
  CommercialDetails,
  IndustrialDetails,
  LandDetails,
  ServiceDetails 
} from './details/propert-details.ts';
import StepSixCommercial from "./step-six/step-six-commercial.tsx";
import StepSixIndustrial from "./step-six/step-six-industrial.tsx";
import StepSixLand from "./step-six/step-six-land.tsx";
import StepSixService from "./step-six/step-six-service.tsx";

interface Photo {
    id: string;
    file: File;
    url: string;
    isMain: boolean;
}
const StepSixComponents = {
KONUT: StepSixHouse,
OFIS: StepSixOffice,
TICARI: StepSixCommercial,
ENDUSTRIYEL: StepSixIndustrial,
ARSA: StepSixLand,
HIZMET: StepSixService,
} as const;

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
    
    // Konum state'leri - StepFive
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    // Property type'a göre ayrı detay state'leri
    const [housingDetails, setHousingDetails] = useState<HousingDetails | {}>({});
    const [commercialDetails, setCommercialDetails] = useState<CommercialDetails| {}>({});
    const [officeDetails, setOfficeDetails] = useState<OfficeDetails | {}>({});
    const [industrialDetails, setIndustrialDetails] = useState<IndustrialDetails| {}>({});
    const [landDetails, setLandDetails] = useState<LandDetails| {}>({});
    const [serviceDetails, setServiceDetails] = useState<ServiceDetails| {}>({});
    
    // Fotoğraflar state'i
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Fotoğraf validasyon fonksiyonu
    const validatePhotos = (photosToValidate: Photo[]): Photo[] => {
        return photosToValidate.filter(photo => {
            return photo.file.size > 0 && 
                photo.file.size <= 5 * 1024 * 1024 && 
                photo.file.type.startsWith('image/');
        });
    };

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
                neighborhood
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
                longitude
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
                
                // 1. İlanı oluştur
                const listingResponse = await fetch('http://localhost:8080/api/listings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(listingData)
                });
                
                if (!listingResponse.ok) {
                    const errorData = await listingResponse.json().catch(() => ({ message: 'Bilinmeyen hata' }));
                    console.error("İlan oluşturma hatası:", errorData);
                    setErrorMessage("İlan oluşturulurken hata oluştu: " + (errorData.message || 'Bilinmeyen hata'));
                    setShowError(true);
                    return;
                }
                
                const listingResult = await listingResponse.json();
                console.log("İlan başarıyla oluşturuldu:", listingResult);
                
                // 2. Fotoğrafları gönder (eğer varsa)
                if (photos.length > 0) {
                    try {
                        // Fotoğrafları validate et
                        const validPhotos = await validatePhotos(photos);
                        
                        if (validPhotos.length === 0) {
                            setErrorMessage("İlan oluşturuldu ancak yüklenen fotoğraflar geçersiz. Lütfen JPG, PNG veya WebP formatında, 5MB'dan küçük geçerli resim dosyaları seçin.");
                            setShowError(true);
                            return;
                        }
                        
                        if (validPhotos.length < photos.length) {
                            console.warn(`${photos.length - validPhotos.length} fotoğraf geçersiz olduğu için atlandı.`);
                        }
                        
                        const formData = new FormData();
                        validPhotos.forEach(photo => {
                            formData.append('photos', photo.file);
                        });
                        
                        const photoResponse = await fetch(`http://localhost:8080/api/listings/${listingResult.id}/photos`, {
                            method: 'POST',
                            body: formData
                        });
                        
                        if (!photoResponse.ok) {
                            const photoErrorData = await photoResponse.text().catch(() => 'Bilinmeyen hata');
                            console.warn("Fotoğraf yükleme hatası:", photoErrorData);
                            setErrorMessage("İlan oluşturuldu ancak fotoğraflar yüklenirken hata oluştu. Lütfen fotoğraflarınızı kontrol edin.");
                            setShowError(true);
                        } else {
                            console.log("Fotoğraflar başarıyla yüklendi");
                        }
                    } catch (photoError) {
                        console.error("Fotoğraf işleme hatası:", photoError);
                        setErrorMessage("İlan oluşturuldu ancak fotoğraf işlenirken hata oluştu.");
                        setShowError(true);
                    }
                }
                
                setShowSuccess(true);
                
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
    // Helper function to get initial boolean properties
    const getInitialBooleans = (propertyType: string): Record<string, boolean> => {
    const booleanMap: Record<string, string[]> = {
        'KONUT': [
        'furnished', 'balcony', 'terrace', 'garden', 'withinSite',
        'openPark', 'closedPark', 'garagePark', 'elevator', 'security',
        'concierge', 'generator', 'airConditioning', 'floorHeating',
        'fireplace', 'builtinKitchen', 'separateKitchen', 'americanKitchen',
        'laundryRoom', 'pool', 'gym', 'childrenPlayground', 'sportsArea'
        ],
        'OFIS': [
        'furnished', 'parking', 'elevator', 'security', 'generator',
        'airConditioning', 'internet', 'kitchen', 'fireSystem',
        'reception', 'waitingArea', 'archive', 'library',
        'serverRoom', 'accessControl', 'fiberInternet', 'soundproof'
        ],
        'TICARI': [
        'furnished', 'parking', 'elevator', 'security', 'generator',
        'airConditioning', 'internet', 'kitchen', 'toilet',
        'showcase', 'warehouse', 'loadingDock', 'cashRegister',
        'outdoorSeating', 'waitingArea', 'changingRoom'
        ],
        'ENDUSTRIYEL': [
        'parking', 'security', 'generator', 'compressedAir', 'steamLine',
        'railwayAccess', 'dockAccess', 'officeArea', 'changeRoom',
        'threephaseElectricity', 'naturalGasLine', 'waterSystem', 'wasteWaterSystem',
        'craneSystem', 'ventilationSystem', 'airConditioning', 'wideOpenArea',
        'machineMountingSuitable', 'loadingRamp', 'truckEntrance', 'forkliftTraffic',
        'rackingSystem', 'coldStorage', 'fireExtinguishingSystem', 'securityCameras',
        'alarmSystem', 'fencedArea'
        ],
        'ARSA': [
        'electricity', 'water', 'naturalGas', 'roadAccess', 'seaView',
        'forestView', 'cityView', 'southFacing', 'sewerage', 'cornerLot',
        'mountainView', 'flat', 'slope', 'fenced', 'agricultural',
        'buildingPermit', 'vineyard', 'orchard', 'oliveTrees', 'greenhouse', 'well'
        ],
        'HIZMET': [
        'furnished', 'parking', 'elevator', 'security', 'generator',
        'airConditioning', 'kitchen', 'restroom', 'disabledAccess',
        'lighting', 'cctv', 'internet', 'reception', 'restRoom',
        'washingArea', 'maintenanceArea', 'ventilationSystem',
        'storage', 'officeArea', 'customerParking'
        ]
    };

    // Component mapping objesi (component dosyalarının başında tanımla

    const booleans: Record<string, boolean> = {};
    const keys = booleanMap[propertyType] || [];
    keys.forEach(key => booleans[key] = false);
    return booleans;
    };

        // Ortak props objesi
    const stepSixProps = {
        listingType,
        propertyType,
        subtype,
        title,
        description,
        price,
        city,
        district,
        neighborhood,
        details: getCurrentDetails(),
        photos,
        latitude,
        longitude,
    };

    // useEffect kısmı
    useEffect(() => {
        if (propertyType && subtype) {
            const currentDetails = getCurrentDetails();
            const currentSetter = getCurrentDetailsSetter();
            
            if (Object.keys(currentDetails).length === 0) {
                const initialDetails = {
                    subtype,
                    ...getInitialBooleans(propertyType)
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
                    border: '1px solid #d3d3d3',
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
                        />
                    )}
                    
                    {activeStep === 5 && (() => {
                    const StepComponent = StepSixComponents[propertyType as keyof typeof StepSixComponents];
                    return StepComponent ? <StepComponent {...stepSixProps} /> : null;
                    })()}
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
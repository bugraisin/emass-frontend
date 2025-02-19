import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import StepOne from "./step-one.tsx";
import StepTwo from "./step-two.tsx";
import StepThree from "./step-three.tsx";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StepFour from "./step-four.tsx";

export default function Advert() {
    const steps = ['İlan Türü', 'Konum Bilgisi', 'Haritada Seç', 'Detaylı Bilgi', 'Gözden Geçir'];
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [sellType, setSellType] = useState<string>('');
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleNextStep = () => {
        if (activeStep === 0 && category && sellType) {
            setActiveStep(1);
        } else if (activeStep === 1 && type) {
            setActiveStep(2);
        } else if (activeStep === 2) {
            setActiveStep(3);
        } else if (activeStep === 3) {
            setActiveStep(4);
        } else if (activeStep === 4) {
            console.log("All steps completed");
        }
    };

    const handleBackStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    function isNextButtonDisabled() {
        if (activeStep === 0) {
            if (category === 'Arsa' || category === 'Bina') {
                return !(category && sellType);
            }
            return !(category && sellType && type);
        } else if (activeStep === 1) {
            return !type;
        } else if (activeStep === 2) {
            return false;
        } else if (activeStep === 3) {
            return false;
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
                            category={category}
                            setCategory={setCategory}
                            type={type}
                            setType={setType}
                            sellType={sellType}
                            setSellType={setSellType}
                        />
                    )}
                    {activeStep === 1 && (
                        <StepTwo/>
                    )}
                    {activeStep === 2 && ( 
                        <StepThree/>
                    )}
                    {activeStep === 3 && ( 
                        <StepFour/>
                    )}
                    {activeStep === 4 && ( 
                        <StepFour/>
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

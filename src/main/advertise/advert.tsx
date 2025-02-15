import { Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, InputLabel, Select, MenuItem, Stepper, Step, StepLabel } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Advert() {
    const navigate = useNavigate();
    const steps = ['Category', 'Price', 'Locatiofn'];

    const isStepFailed = (step: number) => {
        return step === 1;
      };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '91vh',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    border: '4px solid #d3d3d3',
                    alignItems: 'center',
                    width: '90%',
                    height: '90%',
                    padding: '2%',
                    display: 'flex',
                    flexDirection: 'column'
                }}    
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                    İlan Ver
                </Typography>
                <Stepper activeStep={1}>
                    {steps.map((label, index) => {
                    const labelProps: {
                        optional?: React.ReactNode;
                        error?: boolean;
                    } = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                        <Typography variant="caption" color="error">
                            Alert message
                        </Typography>
                        );
                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
            </Box>
        </Box>
    );
}

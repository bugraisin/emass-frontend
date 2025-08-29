import React from 'react';
import { Box } from '@mui/material';
import HousingDetails from './details/house-create-details.tsx';
import CommercialDetails from './details/commercial-create-details.tsx';
import OfficeDetails from './details/office-create-details.tsx';
import IndustrialDetails from './details/industrial-create-details.tsx';
import LandDetails from './details/land-create-details.tsx';
import ServiceDetails from './details/service-create-details.tsx';

interface StepThreeProps {
    listingType: string;
    propertyType: string;
    subtype: string;
    details: any;
    setDetails: (details: any) => void;
}

export default function StepThree({ 
    listingType, 
    propertyType, 
    subtype,
    details,
    setDetails
}: StepThreeProps) {

    const renderPropertyDetails = () => {
        switch (propertyType) {
            case 'KONUT':
                return <HousingDetails details={details} setDetails={setDetails} />;
            case 'TICARI':
                return <CommercialDetails details={details} setDetails={setDetails} />;
            case 'OFIS':
                return <OfficeDetails details={details} setDetails={setDetails} />;
            case 'ENDUSTRIYEL':
                return <IndustrialDetails details={details} setDetails={setDetails} />;
            case 'ARSA':
                return <LandDetails details={details} setDetails={setDetails} />;
            case 'HIZMET':
                return <ServiceDetails details={details} setDetails={setDetails} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ 
            width: "100%", 
            mt: 1,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f5f9',
                borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#cbd5e1',
                borderRadius: '3px',
                '&:hover': {
                    background: '#94a3b8',
                }
            }
        }}>
            {renderPropertyDetails()}
        </Box>
    );
}
import React, { useState, useRef } from "react";
import { Box, Divider, Button } from "@mui/material";
import Categories from "./left-panel/categories.tsx";
import Address from "./left-panel/address.tsx";
import Price from "./left-panel/price.tsx";
import HousingDetails from "./left-panel/details/housing-details.tsx";
import OfficeDetails from "./left-panel/details/office-details.tsx";
import CommercialDetails from "./left-panel/details/commercial-details.tsx";
import ServiceDetails from "./left-panel/details/service-details.tsx";
import LandDetails from "./left-panel/details/land-details.tsx";
import IndustrialDetails from "./left-panel/details/industrial-details.tsx";
import { searchService } from "./services/SearchService.ts";

interface LeftPanelProps {
    onSearchResults?: (results: any[]) => void;
    onSearchStart?: () => void;
}

interface SearchFilters {
    category: {
        listingType: string;
        propertyType: string;
        subtype: string;
    };
    location: {
        cityIds: number[];
        districtIds: number[];
        neighborhoodIds: number[];
        cityNames: string[];
        districtNames: string[];
        neighborhoodNames: string[];
    };
    price: {
        min: string;
        max: string;
    };
}

export default function LeftPanel({ onSearchResults, onSearchStart }: LeftPanelProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    
    const housingDetailsRef = useRef<any>(null);
    const officeDetailsRef = useRef<any>(null);
    const commercialDetailsRef = useRef<any>(null);
    const landDetailsRef = useRef<any>(null);
    const industrialDetailsRef = useRef<any>(null);
    const serviceDetailsRef = useRef<any>(null);
    
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        category: {
            listingType: '',
            propertyType: '',
            subtype: ''
        },
        location: {
            cityIds: [],
            districtIds: [],
            neighborhoodIds: [],
            cityNames: [],
            districtNames: [],
            neighborhoodNames: []
        },
        price: {
            min: '',
            max: ''
        }
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        
        const parts = category.split('_');
        console.log('🐛 Debug - category parts:', parts);
        
        let subtype = '';
        if (parts.length > 2) {
            subtype = parts.slice(2).join('_');
        }
        
        console.log('🐛 Debug - determined subtype:', subtype);
        
        setSearchFilters(prev => ({
            ...prev,
            category: {
                listingType: parts[0] || '',
                propertyType: parts[1] || '',
                subtype: subtype
            }
        }));
    };

    const handleLocationChange = (locationData: any) => {
        setSearchFilters(prev => ({
            ...prev,
            location: locationData
        }));
    };

    const handlePriceChange = (priceData: any) => {
        setSearchFilters(prev => ({
            ...prev,
            price: priceData
        }));
    };

    const getCategoryDetails = () => {
        let categoryDetails: any = {};
        
        if (selectedCategory.includes("KONUT")) {
            if (housingDetailsRef.current && housingDetailsRef.current.getDetails) {
                categoryDetails.housingDetails = housingDetailsRef.current.getDetails();
            }
        }
        else if (selectedCategory.includes("OFIS")) {
            if (officeDetailsRef.current && officeDetailsRef.current.getDetails) {
                categoryDetails.officeDetails = officeDetailsRef.current.getDetails();
            }
        }
        else if (selectedCategory.includes("TICARI")) {
            if (commercialDetailsRef.current && commercialDetailsRef.current.getDetails) {
                categoryDetails.commercialDetails = commercialDetailsRef.current.getDetails();
            }
        }
        else if (selectedCategory.includes("ARSA")) {
            if (landDetailsRef.current && landDetailsRef.current.getDetails) {
                categoryDetails.landDetails = landDetailsRef.current.getDetails();
            }
        }
        else if (selectedCategory.includes("ENDUSTRIYEL")) {
            if (industrialDetailsRef.current && industrialDetailsRef.current.getDetails) {
                categoryDetails.industrialDetails = industrialDetailsRef.current.getDetails();
            }
        }
        else if (selectedCategory.includes("HIZMET")) {
            if (serviceDetailsRef.current && serviceDetailsRef.current.getDetails) {
                categoryDetails.serviceDetails = serviceDetailsRef.current.getDetails();
            }
        }
        
        return categoryDetails;
    };

    const handleSearch = async () => {
        console.log('🔍 ARA BUTONU BASILDI!');

        onSearchStart?.();

        const categoryDetails = getCategoryDetails();
        
        try {
            const results = await searchService.performSearch(
                searchFilters, 
                categoryDetails, 
                selectedCategory
            );
            
            onSearchResults?.(results);
        } catch (error) {
            console.error('Arama hatası:', error);
            onSearchResults?.([]);
        }
    };

    // Kategori-spesifik detay panellerini gösterme fonksiyonu
    const renderCategorySpecificPanels = () => {
        if (!selectedCategory) return null;

        // Konut kategorileri
        if (selectedCategory.includes("KONUT")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <HousingDetails 
                        ref={housingDetailsRef}
                        selectedCategory={selectedCategory} 
                    />
                </>
            );
        }

        // Ofis kategorileri
        if (selectedCategory.includes("OFIS")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <OfficeDetails 
                        selectedCategory={selectedCategory}
                        ref={officeDetailsRef}
                    />
                </>
            );
        }

        // Ticari kategoriler
        if (selectedCategory.includes("TICARI")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <CommercialDetails 
                        selectedCategory={selectedCategory}
                        ref={commercialDetailsRef}
                    />
                </>
            );
        }

        // Arsa kategorileri
        if (selectedCategory.includes("ARSA")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <LandDetails 
                        selectedCategory={selectedCategory}
                        ref={landDetailsRef}
                    />
                </>
            );
        }

        // Endüstriyel kategoriler
        if (selectedCategory.includes("ENDUSTRIYEL")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <IndustrialDetails 
                        selectedCategory={selectedCategory}
                        ref={industrialDetailsRef}
                    />
                </>
            );
        }

        // Hizmet kategorileri
        if (selectedCategory.includes("HIZMET")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <ServiceDetails 
                        selectedCategory={selectedCategory}
                        ref={serviceDetailsRef}
                    />
                </>
            );
        }

        return null;
    };

    return (
        <Box sx={{ 
            padding: '4px',
            height: '100%', 
            position: 'relative'
        }}>
            <Categories onCategoryChange={handleCategoryChange} />
            <Divider sx={{ 
                my: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Address onLocationChange={handleLocationChange} />
            <Divider sx={{ 
                my: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Price selectedCategory={selectedCategory} onPriceChange={handlePriceChange} />
            
            {/* Kategori-spesifik detay panelleri */}
            {renderCategorySpecificPanels()}

            <Box
                sx={{
                    position: 'sticky',
                    bottom: 4,
                    width: '100%',
                    marginTop: '20px',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)',
                    zIndex: 10,
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        width: '100%',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 500,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        background: '#ed9517',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        '&:hover': { 
                            background: '#d97706',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                        },
                        padding: '8px 0', 
                        borderRadius: '6px',
                        textTransform: 'none',
                    }}
                >
                    Ara
                </Button>
            </Box>
        </Box>
    );
}
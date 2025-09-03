import React, { useState, useRef, useEffect } from "react";
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

export default function LeftPanel() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    
    // Component ref'leri
    const housingDetailsRef = useRef<any>(null);
    const officeDetailsRef = useRef<any>(null);
    const commercialDetailsRef = useRef<any>(null);
    const landDetailsRef = useRef<any>(null);
    const industrialDetailsRef = useRef<any>(null);
    const serviceDetailsRef = useRef<any>(null);
    
    // Tüm arama filtrelerini toplayan ana state
    const [searchFilters, setSearchFilters] = useState({
        // Kategori bilgileri
        category: {
            listingType: '', // SALE, RENT
            propertyType: '', // KONUT, OFIS, TICARI vb.
            subtype: '' // DAIRE, VILLA vb.
        },
        // Lokasyon bilgileri
        location: {
            cityIds: [] as number[],
            districtIds: [] as number[],
            neighborhoodIds: [] as number[],
            cityNames: [] as string[],
            districtNames: [] as string[],
            neighborhoodNames: [] as string[]
        },
        // Fiyat bilgileri
        price: {
            min: '',
            max: ''
        }
    });

    // URL parametreleri değiştiğinde otomatik arama yap
    useEffect(() => {
        const handleUrlParamsChange = (event: any) => {
            const params = event.detail;
            console.log('🔄 URL parametrelerine göre otomatik arama yapılıyor:', params);
            
            // URL parametrelerine göre GET isteği at
            performSearchFromUrl(params);
        };

        window.addEventListener('urlParamsChanged', handleUrlParamsChange);
        
        return () => {
            window.removeEventListener('urlParamsChanged', handleUrlParamsChange);
        };
    }, []);

    // Query parameter builder fonksiyonları
    const buildCommonParams = (queryParams: URLSearchParams) => {
        // Genel listing bilgileri
        if (searchFilters.location.cityNames && searchFilters.location.cityNames.length > 0) {
            queryParams.append('city', searchFilters.location.cityNames[0]);
        }
        if (searchFilters.location.districtNames && searchFilters.location.districtNames.length > 0) {
            queryParams.append('district', searchFilters.location.districtNames[0]);
        }
        if (searchFilters.location.neighborhoodNames && searchFilters.location.neighborhoodNames.length > 0) {
            queryParams.append('neighborhood', searchFilters.location.neighborhoodNames[0]);
        }
        
        if (searchFilters.price.min) {
            queryParams.append('minPrice', searchFilters.price.min);
        }
        if (searchFilters.price.max) {
            queryParams.append('maxPrice', searchFilters.price.max);
        }
        
        // Subtype'ı sadece seçilmişse gönder
        if (searchFilters.category.subtype) {
            queryParams.append('subtype', searchFilters.category.subtype);
        }
    };

    const buildHouseParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        
        console.log('🔍 Housing details detayları:', details);
        
        if (details.roomCount && details.roomCount.length > 0) {
            details.roomCount.forEach(room => queryParams.append('roomCount', room));
        }
        
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
        
        if (details.floors && details.floors.length > 0) {
            details.floors.forEach(floor => queryParams.append('floors', floor));
        }
        
        if (details.totalFloors && details.totalFloors.length > 0) {
            details.totalFloors.forEach(totalFloor => queryParams.append('totalFloors', totalFloor));
        }
        
        if (details.buildingAges && details.buildingAges.length > 0) {
            details.buildingAges.forEach(age => queryParams.append('buildingAges', age));
        }
        
        if (details.siteFeeMin) queryParams.append('minSiteFee', details.siteFeeMin);
        if (details.siteFeeMax) queryParams.append('maxSiteFee', details.siteFeeMax);
        if (details.depositMin) queryParams.append('minDeposit', details.depositMin);
        if (details.depositMax) queryParams.append('maxDeposit', details.depositMax);
        
        if (details.heatingTypes && details.heatingTypes.length > 0) {
            details.heatingTypes.forEach(heating => queryParams.append('heatingTypes', heating));
        }
        
        if (details.facadeTypes && details.facadeTypes.length > 0) {
            details.facadeTypes.forEach(facade => queryParams.append('facadeDirections', facade));
        }
        
        if (details.features) {
            Object.entries(details.features).forEach(([key, value]) => {
                if (value === true) {
                    queryParams.append(key, 'true');
                }
            });
        }
    };

    const buildOfficeParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        console.log('🏢 Office details detayları:', details);
        // TODO: Office detayları için parametreler eklenecek
    };

    const buildCommercialParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        console.log('🏪 Commercial details detayları:', details);
        // TODO: Commercial detayları için parametreler eklenecek
    };

    const buildLandParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        console.log('🌍 Land details detayları:', details);
        // TODO: Land detayları için parametreler eklenecek
    };

    const buildIndustrialParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        console.log('🏭 Industrial details detayları:', details);
        // TODO: Industrial detayları için parametreler eklenecek
    };

    const buildServiceParams = (queryParams: URLSearchParams, details: any) => {
        if (!details) return;
        console.log('🔧 Service details detayları:', details);
        // TODO: Service detayları için parametreler eklenecek
    };

    // Emlak türüne göre API endpoint'ini belirle
    const getEndpointByPropertyType = (selectedCategory: string) => {
        if (!selectedCategory) return 'house'; // default
        
        // Konut kategorileri
        if (selectedCategory.includes("KONUT") || selectedCategory.includes("DAIRE") ||
            selectedCategory.includes("VILLA") || selectedCategory.includes("MUSTAKIL_EV") ||
            selectedCategory.includes("REZIDANS") || selectedCategory.includes("YAZLIK")) {
            return 'house';
        }
        
        // Ofis kategorileri
        if (selectedCategory.includes("OFIS") || selectedCategory.includes("BÜRO") ||
            selectedCategory.includes("COWORKING") || selectedCategory.includes("CALL_CENTER") ||
            selectedCategory.includes("TOPLANTI_SALONU") || selectedCategory.includes("MUAYENEHANE") ||
            selectedCategory.includes("AVUKATLIK_BÜROSU") || selectedCategory.includes("MUHASEBE_OFISI")) {
            return 'office';
        }
        
        // Ticari kategoriler
        if (selectedCategory.includes("TICARI") || selectedCategory.includes("DUKKAN") ||
            selectedCategory.includes("MAGAZA") || selectedCategory.includes("SHOWROOM") ||
            selectedCategory.includes("MARKET") || selectedCategory.includes("RESTAURANT") ||
            selectedCategory.includes("KAFE") || selectedCategory.includes("BAR") ||
            selectedCategory.includes("PASTANE") || selectedCategory.includes("BERBER_KUAFOR") ||
            selectedCategory.includes("GUZELLIK_SALONU") || selectedCategory.includes("ECZANE")) {
            return 'commercial';
        }
        
        // Arsa kategorileri
        if (selectedCategory.includes("ARSA") || selectedCategory.includes("KONUT_ARSASI") ||
            selectedCategory.includes("TICARI_ARSA") || selectedCategory.includes("TARLA") ||
            selectedCategory.includes("BAG_BAHCE")) {
            return 'land';
        }
        
        // Endüstriyel kategoriler
        if (selectedCategory.includes("ENDUSTRIYEL") || selectedCategory.includes("FABRIKA") ||
            selectedCategory.includes("ATOLYE") || selectedCategory.includes("IMALATHANE") ||
            selectedCategory.includes("DEPO") || selectedCategory.includes("SOGUK_HAVA_DEPOSU") ||
            selectedCategory.includes("ANTREPO") || selectedCategory.includes("LABORATUVAR") ||
            selectedCategory.includes("URETIM_TESISI")) {
            return 'industrial';
        }
        
        // Hizmet kategorileri
        if (selectedCategory.includes("HIZMET") || selectedCategory.includes("OTOPARK") ||
            selectedCategory.includes("SPOR_SALONU") || selectedCategory.includes("YIKAMA") ||
            selectedCategory.includes("OTO_SERVIS") || selectedCategory.includes("BENZIN_ISTASYONU") ||
            selectedCategory.includes("KARGO_MERKEZI") || selectedCategory.includes("TEMIZLIK_MERKEZI")) {
            return 'service';
        }
        
        return 'house'; // default fallback
    };

    // URL parametrelerinden GET isteği yapan fonksiyon
    const performSearchFromUrl = async (urlParams: any) => {
        try {
            const queryParams = new URLSearchParams(urlParams);
            console.log('🌐 URL\'den gelen parametrelerle GET isteği:', queryParams.toString());
            
            const response = await fetch(`http://localhost:8080/api/listings/search/house?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (response.ok) {
                const results = await response.json();
                console.log('🎯 URL parametrelerine göre arama sonuçları:', results);
                // MainPanel'e sonuçları gönder
            } else {
                console.error('URL arama hatası:', response.statusText);
            }
        } catch (error) {
            console.error('URL arama API hatası:', error);
        }
    };

    // Kategori değişikliklerini handle et
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        
        // Kategoriyi parse et ve filtre state'ine ekle
        const parts = category.split('_');
        console.log('🐛 Debug - category parts:', parts);
        
        // Subtype sadece 3 parça varsa (SALE_KONUT_DAIRE gibi) set edilir
        // 2 parça varsa (SALE_ARSA, SALE_OFIS) subtype boş kalır
        let subtype = '';
        if (parts.length === 3) {
            // SALE_KONUT_DAIRE, RENT_KONUT_VILLA gibi
            subtype = parts[2];
        }
        // parts.length === 2 ise (SALE_ARSA, RENT_OFIS) subtype boş kalır
        
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

    // Lokasyon değişikliklerini handle et
    const handleLocationChange = (locationData: any) => {
        setSearchFilters(prev => ({
            ...prev,
            location: locationData
        }));
    };

    // Fiyat değişikliklerini handle et
    const handlePriceChange = (priceData: any) => {
        setSearchFilters(prev => ({
            ...prev,
            price: priceData
        }));
    };

    // Backend'e arama isteği gönder
// Backend'e arama isteği gönder
const handleSearch = async () => {
    console.log('🔍 ARA BUTONU BASILDI!');
    
    // Aktif kategori detaylarını topla
    let categoryDetails: any = {};
    
    // Konut kategorileri
    if (selectedCategory.includes("KONUT") || selectedCategory.includes("DAIRE") || 
        selectedCategory.includes("VILLA") || selectedCategory.includes("MUSTAKIL_EV") ||
        selectedCategory.includes("REZIDANS") || selectedCategory.includes("YAZLIK")) {
        if (housingDetailsRef.current && housingDetailsRef.current.getDetails) {
            categoryDetails = { housingDetails: housingDetailsRef.current.getDetails() };
        }
    }
    // Ofis kategorileri
    else if (selectedCategory.includes("OFIS") || selectedCategory.includes("BÜRO") ||
        selectedCategory.includes("COWORKING") || selectedCategory.includes("CALL_CENTER") ||
        selectedCategory.includes("TOPLANTI_SALONU") || selectedCategory.includes("MUAYENEHANE") ||
        selectedCategory.includes("AVUKATLIK_BÜROSU") || selectedCategory.includes("MUHASEBE_OFISI")) {
        categoryDetails = { officeDetails: {} };
    }
    // Ticari kategoriler
    else if (selectedCategory.includes("TICARI") || selectedCategory.includes("DUKKAN") ||
        selectedCategory.includes("MAGAZA") || selectedCategory.includes("SHOWROOM") ||
        selectedCategory.includes("MARKET") || selectedCategory.includes("RESTAURANT") ||
        selectedCategory.includes("KAFE") || selectedCategory.includes("BAR") ||
        selectedCategory.includes("PASTANE") || selectedCategory.includes("BERBER_KUAFOR") ||
        selectedCategory.includes("GUZELLIK_SALONU") || selectedCategory.includes("ECZANE")) {
        categoryDetails = { commercialDetails: {} };
    }
    // Arsa kategorileri
    else if (selectedCategory.includes("ARSA") || selectedCategory.includes("KONUT_ARSASI") ||
        selectedCategory.includes("TICARI_ARSA") || selectedCategory.includes("TARLA") ||
        selectedCategory.includes("BAG_BAHCE")) {
        categoryDetails = { landDetails: {} };
    }
    // Endüstriyel kategoriler
    else if (selectedCategory.includes("ENDUSTRIYEL") || selectedCategory.includes("FABRIKA") ||
        selectedCategory.includes("ATOLYE") || selectedCategory.includes("IMALATHANE") ||
        selectedCategory.includes("DEPO") || selectedCategory.includes("SOGUK_HAVA_DEPOSU") ||
        selectedCategory.includes("ANTREPO") || selectedCategory.includes("LABORATUVAR") ||
        selectedCategory.includes("URETIM_TESISI")) {
        categoryDetails = { industrialDetails: {} };
    }
    // Hizmet kategorileri
    else if (selectedCategory.includes("HIZMET") || selectedCategory.includes("OTOPARK") ||
        selectedCategory.includes("SPOR_SALONU") || selectedCategory.includes("YIKAMA") ||
        selectedCategory.includes("OTO_SERVIS") || selectedCategory.includes("BENZIN_ISTASYONU") ||
        selectedCategory.includes("KARGO_MERKEZI") || selectedCategory.includes("TEMIZLIK_MERKEZI")) {
        categoryDetails = { serviceDetails: {} };
    }
    
    console.log('📊 Seçilen kategori:', selectedCategory);
    console.log('🏠 Kategori detayları:', categoryDetails);
    
    try {
        // Query parameters oluştur
        const queryParams = new URLSearchParams();
        
        // Ortak parametreleri ekle
        buildCommonParams(queryParams);
        
        // Kategori-spesifik parametreleri ekle
        console.log('🐛 Debug - searchFilters.category.subtype:', searchFilters.category.subtype);
        console.log('🐛 Debug - selectedCategory:', selectedCategory);
        const endpoint = getEndpointByPropertyType(selectedCategory);
        console.log('🎯 Endpoint:', endpoint);
        
        switch (endpoint) {
            case 'house':
                buildHouseParams(queryParams, categoryDetails.housingDetails);
                break;
            case 'office':
                buildOfficeParams(queryParams, categoryDetails.officeDetails);
                break;
            case 'commercial':
                buildCommercialParams(queryParams, categoryDetails.commercialDetails);
                break;
            case 'land':
                buildLandParams(queryParams, categoryDetails.landDetails);
                break;
            case 'industrial':
                buildIndustrialParams(queryParams, categoryDetails.industrialDetails);
                break;
            case 'service':
                buildServiceParams(queryParams, categoryDetails.serviceDetails);
                break;
        }
        
        console.log('🚀 Backend\'e gönderilen query params:', queryParams.toString());

        // URL'yi güncelle
        const newUrl = `/search?${queryParams.toString()}`;
        window.history.pushState(null, '', newUrl);
        
        const response = await fetch(`http://localhost:8080/api/listings/search/${endpoint}?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (response.ok) {
            const results = await response.json();
            console.log('Arama sonuçları:', results);
        } else {
            console.error('Arama hatası:', response.statusText);
        }
    } catch (error) {
        console.error('API hatası:', error);
    }
};

    // Kategori-spesifik detay panellerini gösterme fonksiyonu
    const renderCategorySpecificPanels = () => {
        if (!selectedCategory) return null;

        // Konut kategorileri
        if (selectedCategory.includes("KONUT") || 
            selectedCategory.includes("DAIRE") ||
            selectedCategory.includes("VILLA") ||
            selectedCategory.includes("MUSTAKIL_EV") ||
            selectedCategory.includes("REZIDANS") ||
            selectedCategory.includes("YAZLIK")) {
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
        if (selectedCategory.includes("OFIS") ||
            selectedCategory.includes("BÜRO") ||
            selectedCategory.includes("COWORKING") ||
            selectedCategory.includes("CALL_CENTER") ||
            selectedCategory.includes("TOPLANTI_SALONU") ||
            selectedCategory.includes("MUAYENEHANE") ||
            selectedCategory.includes("AVUKATLIK_BÜROSU") ||
            selectedCategory.includes("MUHASEBE_OFISI")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <OfficeDetails 
                        selectedCategory={selectedCategory}
                    />
                </>
            );
        }

        // Ticari kategoriler
        if (selectedCategory.includes("TICARI") ||
            selectedCategory.includes("DUKKAN") ||
            selectedCategory.includes("MAGAZA") ||
            selectedCategory.includes("SHOWROOM") ||
            selectedCategory.includes("MARKET") ||
            selectedCategory.includes("RESTAURANT") ||
            selectedCategory.includes("KAFE") ||
            selectedCategory.includes("BAR") ||
            selectedCategory.includes("PASTANE") ||
            selectedCategory.includes("BERBER_KUAFOR") ||
            selectedCategory.includes("GUZELLIK_SALONU") ||
            selectedCategory.includes("ECZANE")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <CommercialDetails 
                        selectedCategory={selectedCategory}
                    />
                </>
            );
        }

        // Arsa kategorileri
        if (selectedCategory.includes("ARSA") ||
            selectedCategory.includes("KONUT_ARSASI") ||
            selectedCategory.includes("TICARI_ARSA") ||
            selectedCategory.includes("TARLA") ||
            selectedCategory.includes("BAG_BAHCE")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <LandDetails 
                        selectedCategory={selectedCategory}
                    />
                </>
            );
        }

        // Endüstriyel kategoriler
        if (selectedCategory.includes("ENDUSTRIYEL") ||
            selectedCategory.includes("FABRIKA") ||
            selectedCategory.includes("ATOLYE") ||
            selectedCategory.includes("IMALATHANE") ||
            selectedCategory.includes("DEPO") ||
            selectedCategory.includes("SOGUK_HAVA_DEPOSU") ||
            selectedCategory.includes("ANTREPO") ||
            selectedCategory.includes("LABORATUVAR") ||
            selectedCategory.includes("URETIM_TESISI")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <IndustrialDetails 
                        selectedCategory={selectedCategory}
                    />
                </>
            );
        }

        // Hizmet kategorileri
        if (selectedCategory.includes("HIZMET") ||
            selectedCategory.includes("OTOPARK") ||
            selectedCategory.includes("SPOR_SALONU") ||
            selectedCategory.includes("YIKAMA") ||
            selectedCategory.includes("OTO_SERVIS") ||
            selectedCategory.includes("BENZIN_ISTASYONU") ||
            selectedCategory.includes("KARGO_MERKEZI") ||
            selectedCategory.includes("TEMIZLIK_MERKEZI")) {
            return (
                <>
                    <Divider sx={{ 
                        my: 1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
                    }} />
                    <ServiceDetails 
                        selectedCategory={selectedCategory}
                    />
                </>
            );
        }

        return null;
    };

    return (
        <Box sx={{ 
            padding: '8px',
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
                    bottom: 16,
                    width: '100%',
                    marginTop: '20px',
                    padding: '0 4px',
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

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

interface CategoryDetails {
    housingDetails?: any;
    officeDetails?: any;
    commercialDetails?: any;
    landDetails?: any;
    industrialDetails?: any;
    serviceDetails?: any;
}

export class SearchService {
    private baseUrl: string = 'http://localhost:8080/api/listings';

    private buildCommonParams(queryParams: URLSearchParams, searchFilters: SearchFilters): void {
        if (searchFilters.location.cityNames && searchFilters.location.cityNames.length > 0) {
            queryParams.append('city', searchFilters.location.cityNames[0]);
        }
        
        if (searchFilters.location.districtNames && searchFilters.location.districtNames.length > 0) {
            searchFilters.location.districtNames.forEach(district => {
                queryParams.append('district', district);
            });
        }
        
        if (searchFilters.location.neighborhoodNames && searchFilters.location.neighborhoodNames.length > 0) {
            searchFilters.location.neighborhoodNames.forEach(neighborhood => {
                queryParams.append('neighborhood', neighborhood);
            });
        }
        
        if (searchFilters.price.min) {
            queryParams.append('minPrice', searchFilters.price.min);
        }
        
        if (searchFilters.price.max) {
            queryParams.append('maxPrice', searchFilters.price.max);
        }

        if (searchFilters.category.listingType) {
            queryParams.append('listingType', searchFilters.category.listingType);
        }

        // Subtype'ı sadece seçilmişse gönder
        if (searchFilters.category.subtype) {
            queryParams.append('subtype', searchFilters.category.subtype);
        }
    }

    private buildHouseParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        
        console.log('🔍 Housing details detayları:', details);
        
        if (details.roomCount && details.roomCount.length > 0) {
            details.roomCount.forEach((room: string) => queryParams.append('roomCount', room));
        }
        
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
        
        if (details.floors && details.floors.length > 0) {
            details.floors.forEach((floor: string) => queryParams.append('floors', floor));
        }
        
        if (details.totalFloors && details.totalFloors.length > 0) {
            details.totalFloors.forEach((totalFloor: string) => queryParams.append('totalFloors', totalFloor));
        }
        
        if (details.buildingAges && details.buildingAges.length > 0) {
            details.buildingAges.forEach((age: string) => queryParams.append('buildingAges', age));
        }
        
        if (details.siteFeeMin) queryParams.append('minSiteFee', details.siteFeeMin);
        if (details.siteFeeMax) queryParams.append('maxSiteFee', details.siteFeeMax);
        if (details.depositMin) queryParams.append('minDeposit', details.depositMin);
        if (details.depositMax) queryParams.append('maxDeposit', details.depositMax);
        
        if (details.heatingTypes && details.heatingTypes.length > 0) {
            details.heatingTypes.forEach((heating: string) => queryParams.append('heatingTypes', heating));
        }
        
        if (details.facadeTypes && details.facadeTypes.length > 0) {
            details.facadeTypes.forEach((facade: string) => queryParams.append('facadeDirections', facade));
        }
        
        if (details.features) {
            Object.entries(details.features).forEach(([key, value]) => {
                if (value === true) {
                    queryParams.append(key, 'true');
                }
            });
        }
    }

    private buildOfficeParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        console.log('🏢 Office details detayları:', details);
        
        // Alan bilgileri
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
        
        // Kat bilgileri
        if (details.selectedFloors?.length > 0) {
            queryParams.append('floors', details.selectedFloors.join(','));
        }
        
        // Yaş bilgileri
        if (details.selectedBuildingAges?.length > 0) {
            queryParams.append('buildingAges', details.selectedBuildingAges.join(','));
        }
        
        // Oda sayısı
        if (details.selectedRoomCounts?.length > 0) {
            queryParams.append('roomCount', details.selectedRoomCounts.join(','));
        }
        
        // Toplantı odası sayısı
        if (details.selectedMeetingRoomCounts?.length > 0) {
            queryParams.append('meetingRooms', details.selectedMeetingRoomCounts.join(','));
        }
        
        // Cephe türü
        if (details.selectedFacadeTypes?.length > 0) {
            queryParams.append('facadeDirections', details.selectedFacadeTypes.join(','));
        }

        // Isıtma türü
        if (details.heatingTypes && details.heatingTypes.length > 0) {
            details.heatingTypes.forEach((heating: string) => queryParams.append('heatingTypes', heating));
        }
        
        // Site aidatı
        if (details.siteFeeMin) queryParams.append('minSiteFee', details.siteFeeMin);
        if (details.siteFeeMax) queryParams.append('maxSiteFee', details.siteFeeMax);
        
        // Depozito
        if (details.depositMin) queryParams.append('minDeposit', details.depositMin);
        if (details.depositMax) queryParams.append('maxDeposit', details.depositMax);
        
        // Özellikler (boolean features)
        if (details.features) {
            const trueFeatures = Object.keys(details.features).filter(key => details.features[key]);
            if (trueFeatures.length > 0) {
                queryParams.append('officeFeatures', trueFeatures.join(','));
            }
        }
    }

    private buildCommercialParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        console.log('🏪 Commercial details detayları:', details);
        
        // Alan bilgileri
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
        
        // Kat bilgileri
        if (details.selectedFloors?.length > 0) {
            queryParams.append('floors', details.selectedFloors.join(','));
        }
        
        // Yaş bilgileri
        if (details.selectedBuildingAges?.length > 0) {
            queryParams.append('buildingAges', details.selectedBuildingAges.join(','));
        }
                
        // Depozito
        if (details.depositMin) queryParams.append('minDeposit', details.depositMin);
        if (details.depositMax) queryParams.append('maxDeposit', details.depositMax);

        // Isıtma türü
        if (details.heatingTypes && details.heatingTypes.length > 0) {
            details.heatingTypes.forEach((heating: string) => queryParams.append('heatingTypes', heating));
        }
        
        // Özellikler (boolean features)
        if (details.features) {
            const trueFeatures = Object.keys(details.features).filter(key => details.features[key]);
            if (trueFeatures.length > 0) {
                queryParams.append('commercialFeatures', trueFeatures.join(','));
            }
        }
    }

    private buildLandParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        console.log('🌍 Land details detayları:', details);
        
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);

        if (details.zoningTypes && details.zoningTypes.length > 0) {
            details.zoningTypes.forEach((zoningStatus: string) => queryParams.append('zoningStatus', zoningStatus));
        }

        if (details.titleLandDeedStatus && details.titleLandDeedStatus.length > 0) {
            details.titleLandDeedStatus.forEach((titleLandDeedStatus: string) => queryParams.append('titleLandDeedStatus', titleLandDeedStatus));
        }
        
        // Özellikler (boolean features)
        if (details.features) {
            const trueFeatures = Object.keys(details.features).filter(key => details.features[key]);
            if (trueFeatures.length > 0) {
                queryParams.append('serviceFeatures', trueFeatures.join(','));
            }
        }
    }

    private buildIndustrialParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        console.log('🏭 Industrial details detayları:', details);
        
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
    
        if (details.selectedBuildingAges?.length > 0) {
            queryParams.append('buildingAges', details.selectedBuildingAges.join(','));
        }

        if (details.ceilingHeightMin) queryParams.append('minCeilingHeight', details.ceilingHeightMin);
        if (details.ceilingHeightMax) queryParams.append('maxCeilingHeight', details.ceilingHeightMax);

        // Özellikler (boolean features)
        if (details.features) {
            const trueFeatures = Object.keys(details.features).filter(key => details.features[key]);
            if (trueFeatures.length > 0) {
                queryParams.append('industrialFeatures', trueFeatures.join(','));
            }
        }
    }

    private buildServiceParams(queryParams: URLSearchParams, details: any): void {
        if (!details) return;
        console.log('🔧 Service details detayları:', details);
        
        if (details.netAreaMin) queryParams.append('minNetArea', details.netAreaMin);
        if (details.netAreaMax) queryParams.append('maxNetArea', details.netAreaMax);
        
        // Kapasite
        if (details.minCapacity) queryParams.append('minCapacity', details.minCapacity);
        if (details.maxCapacity) queryParams.append('maxCapacity', details.maxCapacity);

        // Depozito
        if (details.minDeposit) queryParams.append('minDeposit', details.minDeposit);
        if (details.maxDeposit) queryParams.append('maxDeposit', details.maxDeposit);

        // Kapalılık Durumu
        if (details.selectedCoverTypes?.length > 0) {
            queryParams.append('spaceTypes', details.selectedCoverTypes.join(','));
        }
        
        // Özellikler (boolean features)
        if (details.features) {
            const trueFeatures = Object.keys(details.features).filter(key => details.features[key]);
            if (trueFeatures.length > 0) {
                queryParams.append('serviceFeatures', trueFeatures.join(','));
            }
        }
    }

    private getEndpointByPropertyType(selectedCategory: string): string {
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
        
        return 'house';
    }

    private buildQueryParams(searchFilters: SearchFilters, categoryDetails: CategoryDetails, selectedCategory: string): URLSearchParams {
        const queryParams = new URLSearchParams();
        
        // Ortak parametreler
        this.buildCommonParams(queryParams, searchFilters);
        
        // Endpoint'e göre spesifik parametreler
        const endpoint = this.getEndpointByPropertyType(selectedCategory);
        
        switch (endpoint) {
            case 'house':
                this.buildHouseParams(queryParams, categoryDetails.housingDetails);
                break;
            case 'office':
                this.buildOfficeParams(queryParams, categoryDetails.officeDetails);
                break;
            case 'commercial':
                this.buildCommercialParams(queryParams, categoryDetails.commercialDetails);
                break;
            case 'land':
                this.buildLandParams(queryParams, categoryDetails.landDetails);
                break;
            case 'industrial':
                this.buildIndustrialParams(queryParams, categoryDetails.industrialDetails);
                break;
            case 'service':
                this.buildServiceParams(queryParams, categoryDetails.serviceDetails);
                break;
        }
        
        return queryParams;
    }

    public updateUrlHistory(queryParams: URLSearchParams): void {
        const newUrl = `/${queryParams.toString()}`;
        window.history.pushState(null, '', newUrl);
    }

    public async performSearch(
        searchFilters: SearchFilters, 
        categoryDetails: CategoryDetails, 
        selectedCategory: string
    ): Promise<any[]> {
        try {
            console.log('🔍 SearchService - Arama başlatıldı!');
            console.log('📊 Seçilen kategori:', selectedCategory);
            console.log('🏠 Kategori detayları:', categoryDetails);
            
            const queryParams = this.buildQueryParams(searchFilters, categoryDetails, selectedCategory);
            const endpoint = this.getEndpointByPropertyType(selectedCategory);
            
            console.log('🎯 Endpoint:', endpoint);
            console.log('🚀 Backend\'e gönderilen query params:', queryParams.toString());

            this.updateUrlHistory(queryParams);
            
            const response = await fetch(`${this.baseUrl}/${endpoint}?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (response.ok) {
                const results = await response.json();
                console.log('✅ Arama sonuçları:', results);
                return results;
            } else {
                console.error('❌ Arama hatası:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('💥 API hatası:', error);
            return [];
        }
    }
}

export const searchService = new SearchService();
import React, { useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import Categories from "./left-panel/categories.tsx";
import Address from "./left-panel/address.tsx";
import Price from "./left-panel/price.tsx";
import HousingDetails from "./left-panel/housing-details.tsx";
import OfficeDetails from "./left-panel/office-details.tsx";
import CommercialDetails from "./left-panel/commercial-details.tsx";
import LandDetails from "./left-panel/land-details.tsx";
import IndustrialDetails from "./left-panel/industrial-details.tsx";
import ServiceDetails from "./left-panel/service-details.tsx";

export default function LeftPanel() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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
                    <HousingDetails selectedCategory={selectedCategory} />
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
                    <OfficeDetails selectedCategory={selectedCategory} />
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
                    <CommercialDetails selectedCategory={selectedCategory} />
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
                    <LandDetails selectedCategory={selectedCategory} />
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
                    <IndustrialDetails selectedCategory={selectedCategory} />
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
                    <ServiceDetails selectedCategory={selectedCategory} />
                </>
            );
        }

        return null;
    };

    return (
        <Box sx={{ 
            padding: '12px',
            height: '100%',
            position: 'relative'
        }}>
            <Categories onCategoryChange={setSelectedCategory} />
            <Divider sx={{ 
                my: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Address/>
            <Divider sx={{ 
                my: 1,
                background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)'
            }} />
            <Price selectedCategory={selectedCategory} />
            
            {/* Kategori-spesifik detay panelleri */}
            {renderCategorySpecificPanels()}

            <Box
                sx={{
                    position: 'sticky',
                    bottom: 20,
                    width: '100%',
                    padding: '10px',
                    background: '#fff',
                    borderRadius: '10px',
                    marginTop: '24px',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: 600,
                        boxShadow: 'none',
                        background: 'linear-gradient(90deg, #1976d2 0%, #2563eb 100%)',
                        '&:hover': { 
                            background: 'linear-gradient(90deg, #2563eb 0%, #1976d2 100%)',
                        },
                        padding: '10px 0', 
                        borderRadius: '8px',
                        textTransform: 'none',
                    }}
                >
                    Emlakları Ara
                </Button>
            </Box>
        </Box>
    );
}

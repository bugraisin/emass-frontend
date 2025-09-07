import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';
import PinnedPanel from './pinned-panel.tsx';

export default function Main() {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Başlangıçta loading true
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [pinnedListings, setPinnedListings] = useState<any[]>([]);

    // localStorage'dan pinned listings'ları yükle
    useEffect(() => {
        const savedPinnedListings = localStorage.getItem('pinnedListings');
        if (savedPinnedListings) {
            try {
                const parsedListings = JSON.parse(savedPinnedListings);
                setPinnedListings(parsedListings);
            } catch (error) {
                console.error('Pinned listings localStorage hatası:', error);
                localStorage.removeItem('pinnedListings');
            }
        }
    }, []);

    // Sayfa ilk açıldığında tüm ilanları yükle
    useEffect(() => {
        const fetchAllListings = async () => {
            try {
                // Test için 3 saniye bekleme ekle
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Tüm ilanları tek seferde çek
                const response = await fetch('http://localhost:8080/api/listings/get-all');
                
                if (response.ok) {
                    const allListings = await response.json();
                    setSearchResults(allListings);
                } else {
                    console.error('İlanlar yüklenirken hata oluştu:', response.statusText);
                    setSearchResults([]);
                }
                
                setIsLoading(false);
                setIsInitialLoad(false);
            } catch (error) {
                console.error('Tüm ilanlar yüklenirken hata oluştu:', error);
                setSearchResults([]);
                setIsLoading(false);
                setIsInitialLoad(false);
            }
        };

        fetchAllListings();
    }, []);

    const handleSearchResults = (results: any[]) => {
        setSearchResults(results);
        setIsLoading(false);
        setIsInitialLoad(false);
    };

    const handleSearchStart = () => {
        setIsLoading(true);
        setIsInitialLoad(false);
    };

    const handlePinListing = (listing: any) => {
        const isAlreadyPinned = pinnedListings.find(p => p.id === listing.id);
        
        let updatedPinnedListings;
        if (isAlreadyPinned) {
            // Zaten pinlenmiş, unpin yap
            updatedPinnedListings = pinnedListings.filter(p => p.id !== listing.id);
        } else {
            // Henüz pinlenmemiş, pin ekle
            updatedPinnedListings = [...pinnedListings, listing];
        }
            
        setPinnedListings(updatedPinnedListings);
        localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
    };

    const handleUnpinListing = (listingId: string) => {
        const updatedPinnedListings = pinnedListings.filter(p => p.id !== listingId);
        setPinnedListings(updatedPinnedListings);
        localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Box
                display="flex"
                flexDirection="column"
                width="100%"
                maxWidth="1260px"
                sx={{ border: '1px solid rgba(148, 163, 184, 0.5)' }}
            >
                <Box
                    display="flex"
                    flex="1"
                    sx={{ minHeight: 'calc(100vh - 40px)' }}
                >
                    <Box
                        width="22%"
                        sx={{
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        }}
                    >
                        <LeftPanel 
                            onSearchResults={handleSearchResults}
                            onSearchStart={handleSearchStart}
                        />
                    </Box>

                    <Box
                        flex="1"
                        sx={{
                            background: 'rgba(148, 163, 184, 0.5)',
                        }}
                    >
                        <MainPanel 
                            searchResults={searchResults}
                            isLoading={isLoading}
                            onPinListing={handlePinListing}
                            onUnpinListing={handleUnpinListing}
                            pinnedListings={pinnedListings}
                        />
                    </Box>
                </Box>
            </Box>
            
            {/* Sağ Panel - Pinned Listings */}
            <PinnedPanel 
                pinnedListings={pinnedListings}
                onUnpinListing={handleUnpinListing}
            />
        </Box>
    );
}
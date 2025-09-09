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

    // PinnedListingsChanged event'ini dinle - Ana düzeltme burada
    useEffect(() => {
        const handlePinnedListingsChange = () => {
            try {
                const savedPinnedListings = localStorage.getItem('pinnedListings');
                const parsedListings = savedPinnedListings ? JSON.parse(savedPinnedListings) : [];
                setPinnedListings(parsedListings);
            } catch (error) {
                console.error('Pinned listings güncelleme hatası:', error);
                setPinnedListings([]);
            }
        };

        // Custom event'i dinle
        window.addEventListener('pinnedListingsChanged', handlePinnedListingsChange);

        // Cleanup
        return () => {
            window.removeEventListener('pinnedListingsChanged', handlePinnedListingsChange);
        };
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
        const isAlreadyPinned = pinnedListings.find(p => String(p.id) === String(listing.id));
        
        let updatedPinnedListings;
        if (isAlreadyPinned) {
            // Zaten pinlenmiş, unpin yap
            updatedPinnedListings = pinnedListings.filter(p => String(p.id) !== String(listing.id));
        } else {
            // Henüz pinlenmemiş, pin ekle
            const pinnedItem = {
                id: String(listing.id),
                title: listing.title || '',
                price: String(listing.price || ''),
                district: listing.district || '',
                neighborhood: listing.neighborhood || '',
                thumbnailUrl: listing.thumbnailUrl || listing.imageUrl || listing.image || listing.photos?.[0]?.url || '',
                createdAt: listing.createdAt || new Date().toISOString()
            };
            updatedPinnedListings = [...pinnedListings, pinnedItem];
        }
            
        setPinnedListings(updatedPinnedListings);
        localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
        
        // Custom event dispatch et ki diğer componentler de güncellensin
        window.dispatchEvent(new Event('pinnedListingsChanged'));
    };

    const handleUnpinListing = (listingId: string) => {
        const updatedPinnedListings = pinnedListings.filter(p => String(p.id) !== String(listingId));
        setPinnedListings(updatedPinnedListings);
        localStorage.setItem('pinnedListings', JSON.stringify(updatedPinnedListings));
        
        // Custom event dispatch et
        window.dispatchEvent(new Event('pinnedListingsChanged'));
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
                maxWidth="1440px"
                sx={{ border: '1px solid rgba(148, 163, 184, 0.5)' }}
            >
                <Box
                    display="flex"
                    flex="1"
                    sx={{ minHeight: 'calc(100vh - 40px)' }}
                >
                    {/* Sol Panel - Left Panel */}
                    <Box
                        width="18%"
                        sx={{
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        }}
                    >
                        <LeftPanel 
                            onSearchResults={handleSearchResults}
                            onSearchStart={handleSearchStart}
                        />
                    </Box>

                    {/* Orta Panel - Main Panel */}
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

                    {/* Sağ Panel - Pinned Panel */}
                    <Box width="20%">
                        <PinnedPanel 
                            pinnedListings={pinnedListings}
                            onUnpinListing={handleUnpinListing}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
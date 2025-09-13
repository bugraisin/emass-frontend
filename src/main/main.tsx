import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';
import PinnedPanel from './pinned-panel.tsx';
import { ListingService } from './services/ListingService.ts';
import { PinnedListingService } from './services/PinnedListing.ts';

export default function Main() {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pinnedListings, setPinnedListings] = useState<any[]>([]);

    useEffect(() => {
        const initialPinnedListings = PinnedListingService.getPinnedListings();
        setPinnedListings(initialPinnedListings);
    }, []);

    useEffect(() => {
        const cleanup = PinnedListingService.subscribeToPinnedListings((updatedListings) => {
            setPinnedListings(updatedListings);
        });
        return cleanup;
    }, []);

    useEffect(() => {
        const loadAllListings = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const listings = await ListingService.getAllListings();
                setSearchResults(listings);
            } catch (error) {
                console.error('İlanlar yüklenirken hata:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllListings();
    }, []);

    const handleSearchResults = (results: any[]) => {
        setSearchResults(results);
        setIsLoading(false);
    };

    const handleSearchStart = () => {
        setIsLoading(true);
    };

    const handlePinListing = (listing: any) => {
        PinnedListingService.togglePinListing(listing);
    };

    const handleUnpinListing = (listingId: string) => {
        PinnedListingService.unpinListing(listingId);
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
                            background: 'rgba(30, 41, 59, 0.2)',
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
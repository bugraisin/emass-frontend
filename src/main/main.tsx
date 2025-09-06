import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';

export default function Main() {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchResults = (results: any[]) => {
        setSearchResults(results);
        setIsLoading(false);
    };

    const handleSearchStart = () => {
        setIsLoading(true);
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
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
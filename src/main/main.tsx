import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';

export default function Main() {
    const [searchParams] = useSearchParams();
    
    // URL parametreleri değiştiğinde LeftPanel'e bildir
    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        console.log('📍 URL parametreleri değişti:', params);
        
        // Eğer parametreler varsa otomatik arama yap
        if (Object.keys(params).length > 0) {
            // LeftPanel'e URL'den arama yapmasını söyle
            window.dispatchEvent(new CustomEvent('urlParamsChanged', { detail: params }));
        }
    }, [searchParams]);

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
                sx={{ border: '1px solid rgba(148, 163, 184, 0.5)'}}
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
                    <LeftPanel/>
                </Box>
                
                <Box 
                    flex="1" 
                    sx={{
                        background: 'rgba(148, 163, 184, 0.5)',
                    }}
                >
                    <MainPanel/>
                </Box>
                </Box>
            </Box>
        </Box>
    );
}
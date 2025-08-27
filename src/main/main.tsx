import React from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';

export default function Main() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                minHeight: '100vh',
                padding: '10px 0'
            }}
        >
            <Box 
                display="flex" 
                flexDirection="column"
                width="100%"
                maxWidth="1280px"
                sx={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 30px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden'
                }}
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
                        borderRight: '1px solid rgba(148, 163, 184, 0.2)',
                        border: '1px solid rgba(148, 163, 184, 0.8)',
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px'
                    }}
                >
                    <LeftPanel/>
                </Box>
                
                <Box 
                    flex="1" 
                    sx={{
                        background: 'rgba(148, 163, 184, 0.5)',
                        border: '1px solid rgba(148, 163, 184, 0.9)',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px'
                    }}
                >
                    <MainPanel/>
                </Box>
            </Box>
                
        </Box>
        </Box>
    );
}

import React from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';
import MainPanel from './main-panel.tsx';

export default function Main() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box 
                display="flex" 
                flexDirection="column"
                width="100%"
                maxWidth="1280px"
                height="100vh"
                bgcolor="white" 
            >
                <Box 
                    display="flex" 
                flex="1">
                <Box 
                    width="20%">
                    <LeftPanel/>
                </Box>
                
                <Box 
                    flex="1" 
                    bgcolor="#d3d3d3">
                    <MainPanel/>
                </Box>
            </Box>
                
        </Box>
        </Box>
    );
}

import React from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './left-panel.tsx';

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
                    height="8%"
                    bgcolor="#ed9517"
                    display="flex"
                    sx={{
                        background: 'linear-gradient(45deg, #ed9517, #ff7a00)',
                        padding: '4px 4px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                        borderEndEndRadius: '4px',
                        borderEndStartRadius: '4px',
                      }}
                >   
                    <a href="http://localhost:3000/">  
                        <img src="/logo.png" alt="" style={{ height: '100%', marginLeft: '48px' }}/>
                    </a>
                </Box>
                <Box 
                    display="flex" 
                    flex="1">
                    <Box 
                        width="20%">
                        <LeftPanel/>
                    </Box>
                    
                    <Box 
                        flex="1" 
                        bgcolor="lightgray">
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

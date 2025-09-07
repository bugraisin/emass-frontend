import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { PushPin, Favorite } from "@mui/icons-material";

interface HeaderWithActionsProps {
  title: string;
  isPinned: boolean;
  onPinToggle: () => void;
}

export default function HeaderWithActions({ title, isPinned, onPinToggle }: HeaderWithActionsProps) {
  return (
    <>
      <Box sx={{
        p: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 600, 
          color: "#1e293b", 
          fontSize: '16px',
          flex: 1
        }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5, mt: -0.5 }}>
          <IconButton
            onClick={onPinToggle}
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              backgroundColor: isPinned ? '#ed9517' : 'transparent',
              color: isPinned ? 'white' : '#64748b',
              border: 'none',
              '&:hover': {
                backgroundColor: isPinned ? '#d97706' : '#f1f5f9',
                color: isPinned ? 'white' : '#ed9517'
              },
            }}
          >
            <PushPin sx={{ fontSize: 14 }} />
          </IconButton>
          
          <IconButton
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              backgroundColor: 'transparent',
              color: '#64748b',
              border: 'none',
              '&:hover': {
                backgroundColor: '#fef2f2',
                color: '#ef4444'
              },
            }}
          >
            <Favorite sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{mb: 1}} />
    </>
  );
}
import React from "react";
import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import { PushPin, Favorite } from "@mui/icons-material";

interface HeaderWithActionsProps {
  title: string;
  isPinned: boolean;
  onPinToggle: () => void;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
}

export default function HeaderWithActions({ 
  title, 
  isPinned, 
  onPinToggle, 
  isFavorited, 
  onFavoriteToggle
}: HeaderWithActionsProps) {
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
            disableRipple
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              color: isPinned ? '#ed9517' : '#64748b',
              border: 'none',
              padding: 0,
            }}
          >
            <PushPin sx={{ fontSize: 14 }} />
          </IconButton>
                    
          <IconButton
            onClick={onFavoriteToggle}
            disableRipple
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1,
              color: isFavorited ? '#ef4444' : '#64748b',
              border: 'none',
              padding: 0,
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
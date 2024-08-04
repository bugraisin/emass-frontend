import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import { IlanDetaylarıComponent } from './ilan-detayları';

export const MainComponentIlanVer = () => {

  return (
    <Box className="ilan-ver-detail">
      <IlanDetaylarıComponent />
    </Box>
  );
};

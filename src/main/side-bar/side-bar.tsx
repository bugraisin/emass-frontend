import { useEffect, useState } from 'react';
import './side-bar.css';
import React from 'react';
import DistrictSelection from './selection/district-selection';
import NeighbourhoodSelectionComponent from './selection/neighbourhood-selection';
import { City, District } from './components/location-components';
import CityComponent from './selection/city-selection';
import { Box, Button } from '@mui/material';

const SidebarComponent = () => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);


  const handleCityChange = (city: City | null) => {
    setSelectedCity(city);
  };

  const handleDistrictChange = (district: District | null) => {
    setSelectedDistrict(district);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: string) => {
    event.preventDefault();
    setExpandedItem(expandedItem === item ? null : item);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  return (
    <Box className='sidebar-container'>
      <Box className='upper-bar'>
        <Button
          sx={{ textTransform: 'none' }}
          className={`sidebar-btn ${activeButton === 'Satılık' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Satılık')}
        >Satılık</Button>
        <Button
        sx={{ textTransform: 'none' }}
        className={`sidebar-btn ${activeButton === 'Kiralık' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Kiralık')}
        >
        Kiralık
        </Button>
      </Box>
      <Box className='main-bar'>
        <Box className='list-address'>
          <Box className='choose-city'>
            <CityComponent onCityChange={handleCityChange}/>
          </Box>
          <Box className='choose-district'>
            <DistrictSelection 
              selectedCity={selectedCity} 
              onDistrictChange={handleDistrictChange}/>
          </Box>
          <Box className='choose-neighboorhood'>
            <NeighbourhoodSelectionComponent selectedDistrict={selectedDistrict}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default SidebarComponent;
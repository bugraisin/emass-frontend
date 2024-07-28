import { useEffect, useState } from 'react';
import './side-bar.css';
import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Autocomplete, TextField, Box } from '@mui/material';
import CityComponent from './components/city-selection';
import DistrictSelection from './components/district-selection';
import NeighbourhoodSelectionComponent from './components/neighbourhood-selection';

const SidebarComponent = () => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: string) => {
    event.preventDefault();
    setExpandedItem(expandedItem === item ? null : item);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  return (
    <div className='sidebar-container'>
      <div className='upper-bar'>
        <button
          className={`sidebar-btn ${activeButton === 'Satılık' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Satılık')}
        >Satılık</button>
        <button
        className={`sidebar-btn ${activeButton === 'Kiralık' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Kiralık')}
        >
        Kiralık
        </button>
      </div>
      <div className='main-bar'>
        <div className='list-address'>
          <div className='choose-city'>
            <CityComponent/>
          </div>
          <div className='choose-district'>
            <DistrictSelection/>
          </div>
          <div className='choose-neighboorhood'>
            <NeighbourhoodSelectionComponent/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidebarComponent;
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './header.css'
import { useState } from 'react';
import LanguageSelector from './components/language-select';
import LoginButtons from './components/login-buttons';
import { ManagerComponents } from './components/manager-buttons';

const HeaderComponent = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="header-container">
      <div className='img-component'>
        <img className="header-img" src="images/emass_logo_short_hover.png" alt="" />
      </div>
      <div className='search-box-component'>
        <TextField
          className="search-box"
          placeholder="İlan ara"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className='button-components'>
        {isLoggedIn ? (
          <ManagerComponents/>
        ) : (
          <LoginButtons/>
        )}
          <LanguageSelector/>
      </div>
    </div>
  );
};
export default HeaderComponent;
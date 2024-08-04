import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './header.css'
import { useState } from 'react';
import LanguageSelector from './components/language-select';
import LoginButtons from './components/login-buttons';
import { ManagerComponents } from './components/manager-buttons';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  return (
    <Box className="header-container">
      <Box className='img-component'>
        <img 
          className="header-img" 
          src="images/emass_logo_short_hover.png"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }} />
      </Box>
      <Box className='search-box-component'>
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
      </Box>
      <Box className='button-components'>
        {isLoggedIn ? (
          <ManagerComponents/>
        ) : (
          <LoginButtons/>
        )}
          <LanguageSelector/>
      </Box>
    </Box>
  );
};
export default HeaderComponent;
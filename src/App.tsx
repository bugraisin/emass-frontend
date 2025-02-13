import React from 'react';
import Main from './main/main.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Advert from './main/advertise/advert.tsx';
import Register from './main/user-service/register.tsx';
import TopPanel from './main/top-panel.tsx';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="black"
      >
          <TopPanel/>
        </Box>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ilan-ver" element={<Advert />} />
        <Route path="/giris-yap" element={<div>Giriş Yap</div>} />
        <Route path="/kayit-ol" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

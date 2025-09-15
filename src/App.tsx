import React from 'react';
import Main from './main/main.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Advert from './main/advertise/advert.tsx';
import Register from './main/user-service/register.tsx';
import TopPanel from './main/top-panel.tsx';
import { Box } from '@mui/material';
import Login from './main/user-service/login.tsx';
import ListingDetails from './main/listing-details/listing-details.tsx';
import Favorites from './main/favorites.tsx';
import UserListings from './main/user-listings.tsx';
import UserAccount from './main/user-details.tsx';
import UserMessages from './main/messages/user-messages.tsx';
import MessageDetails from './main/messages/message-details.tsx';

function App() {
  return (
    <Router>
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
      >
          <TopPanel/>
        </Box>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ilan/:id" element={<ListingDetails />} />
        <Route path="/ilan-ver" element={<Advert />} />
        <Route path="/ilan-duzenle/:id" element={<Advert />} />
        <Route path="/giris-yap" element={<Login />} />
        <Route path="/kayit-ol" element={<Register />} />
        <Route path="/favorilerim" element={<Favorites />} />
        <Route path='/ilanlarim' element={<UserListings/>} />
        <Route path='/hesabim' element={<UserAccount/>} />
        <Route path='/mesajlarim' element={<UserMessages/>} />
        <Route path="/mesaj/:messageId" element={<MessageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
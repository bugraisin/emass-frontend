import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './main/main'; // Ana sayfa bileşeni
import { Switch } from '@mui/material';
import { LoginForm } from './login/login';
import { RegisterForm } from './login/register';
import { IlanVerComponent } from './ilan-ver/ilan-ver';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/ilan-ver" element={<IlanVerComponent />} />
  </Routes>
  );
};

export default App;
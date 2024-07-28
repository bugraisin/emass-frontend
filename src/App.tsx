import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './main/main'; // Ana sayfa bileşeni
import LoginForm from './login/login';
import { Switch } from '@mui/material';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
  </Routes>
  );
};

export default App;
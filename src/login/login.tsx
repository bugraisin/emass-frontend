import React from 'react';
import './LoginForm.css'
import { TextField } from '@mui/material';
import logo from './components/assets/logo-color.png'

const LoginForm = () => {
  return (
    <div className='login-container'>
        <div className='logo-container'>
          <img src={logo} alt='Logo' />
        </div>
        <hr className='divider' />
        <div className='wrapper'>
          <form action="">
            <h1>Giriş Yap</h1>
              <div className='input-box'>
                <input type="text" placeholder='Kullanıcı Adı' required/>
              </div>
              <div className='input-box'>
                <input type="password" placeholder='Şifre' required/>
              </div>

              <div className='remember-forgot'>
                <label><input type="checkbox" /> Beni Hatırla</label>
                <a href="#">Şifremi Unuttum?</a>
              </div>

              <button type='submit'>Giriş</button>

              <div className='register-link'>
                <p>Hesabın yok mu? <a href="#">Kayıt Ol</a></p>
              </div>
          </form>
      </div>
    </div>
  );
};
export default LoginForm;

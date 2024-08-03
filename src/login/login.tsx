import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className='container'>
        <div className='form-wrapper'>
          <form action="">
              <h1>Giriş Yap</h1>
              <div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Kullanici Adi'
                  required/>
              </div>
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Şifre' 
                  required/>
              </div>
              <div className='form-options'>
                <label><input type="checkbox" />Beni Hatirla</label>
                <a href="#">Şifremi Unuttum?</a>
              </div>

              <button type='submit' onClick={handleClick}>Giriş</button>

              <div>
                <p>Hesabin yok mu? <a href="#">Kayit Ol</a></p>
              </div>
          </form>
      </div>
    </div>
  );
};
export default LoginForm;

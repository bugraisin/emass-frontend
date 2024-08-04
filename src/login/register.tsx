import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css'
import { Box, Button, Checkbox, FormControlLabel, Input, InputLabel, Link, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Box className='container'>
      <Box className='form-wrapper'>
        <form>
          <Typography variant="h4" component="h1" className='form-heading' gutterBottom>
            Kayıt Ol
          </Typography>
          <Box mb={2}>
            <Input
              className='form-input'
              fullWidth
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Kullanıcı Adı'
              required
            />
          </Box>
          <Box mb={2}>
            <Input
              className='form-input'
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Şifre'
              required
            />
          </Box>
          <Box className='form-options' mb={2}>
            <Link className='form-link' href="#">Şifremi Unuttum?</Link>
          </Box>
            <Button
              type='submit'
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
              sx={{
                textTransform: "none",
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#FC6F2F',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ff660096',
                }
              }}
            >
            Kayıt Ol
          </Button>
        </form>
      </Box>
    </Box>
  );
};

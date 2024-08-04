import { Box, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

export default function LoginButtons() {
  const navigate = useNavigate();

  return (
    <Box className='login-buttons'>
      <Button
        className='header-user-buttons'
        onClick={() => navigate('/register')}
        variant="contained">
        Kayıt Ol
      </Button>
      <Button
        className='header-user-buttons'
        onClick={() => navigate('/login')}
        variant="contained">
        Giriş Yap
      </Button>
    </Box>
  )
}
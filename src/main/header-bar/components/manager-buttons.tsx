import { Box, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

export function ManagerComponents() {
  const navigate = useNavigate();
  
  return (
    <Box className='add-adv-component'>
      <Button
        onClick={() => navigate('/ilan-ver')}
        className='add-adv'
        variant="contained">
        İlan Ver
      </Button>
      <Button
        className='add-adv'
        variant="contained"
        startIcon={<PersonIcon />}
      >
      Hesap
      </Button>
    </Box>

  );
};
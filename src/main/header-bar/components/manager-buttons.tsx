import { Box, Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export function ManagerComponents() {
  return (
    <Box className='add-adv-component'>
      <Button
        className='add-adv'
        variant="contained">
        İlan Ver
      </Button>
      <Button
        className='add-adv'
        variant="contained"
        startIcon={<PersonIcon />}
        onClick={() => {
          console.log('Kullanıcı butonuna tıklandı!');
        }}
      >
      Hesap
      </Button>
    </Box>

  );
};
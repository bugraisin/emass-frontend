import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const HeaderComponentIlanVer = () => {
  
  const navigate = useNavigate();

  return (
    <Box className="header-ilan-ver">
      <Box className='img-component'>
        <img 
          className="header-img" 
          src="images/emass_logo_short_hover.png" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  );
};
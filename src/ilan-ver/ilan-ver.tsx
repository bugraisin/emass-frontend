import { Box } from "@mui/material";
import HeaderComponent from "../main/header-bar/header";
import { HeaderComponentIlanVer } from "./components/header-component";
import './ilan-ver.css'
import { MainComponentIlanVer } from "./components/main-component";

export const IlanVerComponent = () => {
  return (
    <Box className="ilan-ver-container">
      <Box className="header-component">
        <HeaderComponentIlanVer />
      </Box>
      <Box className="main-component">
        <MainComponentIlanVer />
      </Box>
    </Box>
  );
};
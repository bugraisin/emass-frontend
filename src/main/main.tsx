import HeaderComponent from './header-bar/header';
import MainContentComponent from './main-content/main-content';
import SidebarComponent from './side-bar/side-bar';
import './main.css';
import { Box } from '@mui/material';

const HomePage = () => {
    return (
        <Box className="home-page">
            <header className="header">
                <HeaderComponent />
            </header>
            <Box className="main-content-wrapper">
                <aside className="sidebar">
                    <SidebarComponent />
                </aside>
                <main className="main-content">
                    <MainContentComponent />
                </main>
            </Box>
            <footer className="footer">
                Footer
            </footer>
        </Box>
    );
};

export default HomePage;

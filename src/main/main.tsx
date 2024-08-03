import HeaderComponent from './header-bar/header';
import MainContentComponent from './main-content/main-content';
import SidebarComponent from './side-bar/side-bar';
import './main.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="header">
                <HeaderComponent />
            </header>
            <div className="main-content-wrapper">
                <aside className="sidebar">
                    <SidebarComponent />
                </aside>
                <main className="main-content">
                    <MainContentComponent />
                </main>
            </div>
            <footer className="footer">
                Footer
            </footer>
        </div>
    );
};

export default HomePage;

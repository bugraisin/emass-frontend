
import HeaderComponent from './header-bar/header';
import MainContentComponent from './main-content/main-content';
import './main.css'
import SidebarComponent from './side-bar/side-bar';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="header">
                <HeaderComponent/>
            </header>
            <aside className="sidebar">
                <SidebarComponent/>
            </aside>
            <main className="main-content">
                <MainContentComponent/>
            </main>
            <footer className="footer">
                Footer
            </footer>
        </div>
    );
};
export default HomePage;
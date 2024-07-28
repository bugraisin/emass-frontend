
import MainContentComponent from './main-content/main-content';
import './main.css'
import SidebarComponent from './side-bar/side-bar';

const HomePage = () => {
    return (
        <body>
            <header className="header">
                Header
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
        </body>
    );
};
export default HomePage;
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToogle'
import Navbar from './components/Navbar'

function App() {
    const location = useLocation()

    //Kolla om sökvägen innehåller admin
    // const isAdminRoute = location.pathname.startsWith('/admin')
    return (
        <main>
            {<Navbar path={location.pathname} />}
            <Outlet />
            <div className="fixed bottom-4 right-4">
                <ModeToggle />
            </div>
        </main>
    )
}

export default App

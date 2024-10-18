import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToogle'
import Navbar from './components/Navbar'

function App() {
    return (
        <main>
            <Navbar />
            <Outlet />
            <div className="fixed bottom-4 right-4">
                <ModeToggle />
            </div>
        </main>
    )
}

export default App

import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToogle'
import Navbar from './components/Navbar'
import { Toaster } from './components/ui/sonner'

function App() {
    return (
        <main>
            <Navbar />
            <Outlet />
            <Toaster position="top-right" />
            <div className="fixed bottom-4 right-4">
                <ModeToggle />
            </div>
        </main>
    )
}

export default App

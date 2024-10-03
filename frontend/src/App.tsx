import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToogle'
import Navbar from './components/Navbar'

function App() {
    return (
        
        <main>
          <Navbar/>
          {/* <ModeToggle /> */}
            <Outlet />
        </main>
  

    )
}

export default App

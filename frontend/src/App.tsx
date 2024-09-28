import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToogle'

function App() {
    return (
        
        <main>
          Hej app 
          <ModeToggle />
            <Outlet />
        </main>
  

    )
}

export default App

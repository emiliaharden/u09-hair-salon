import { Link } from 'react-router-dom'

interface NavbarProps {
    path: string
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav>
            <ul className='flex justify-evenly'>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li>Om oss</li>
                <li>Behandlingar</li>
                <li>
                    <Link to={'/bookings'}>Bokning</Link>
                </li>
                <li>Kontakt</li>
            </ul>
        </nav>
    )
}

export default Navbar

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = location.state?.user    

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token || !user)  {
            navigate('/login')
        }
    }, [navigate, user]);

    return (
        <div>
            <h2>User dashboard</h2>
            <p>Welcome to your dashboard, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your roles: {user.roles.join(', ')}</p>
        </div>
    );
};

export default DashboardPage

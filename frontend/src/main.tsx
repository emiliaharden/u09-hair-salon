import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/loginPage.tsx'
import RegisterPage from './pages/register/registerPage.tsx'
import DashboardPage from './pages/dashboard/dashboardPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import AdminDashboardPage from './pages/admin/adminDashboardPage.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import AdminUsersPage from './pages/admin/adminUsersPage.tsx'
import AdminDashboardOverview from './components/AdminDashboardOverview.tsx'
import AdminSettingsPage from './pages/admin/adminSettingsPage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"><App /></ThemeProvider> 
        ),
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/admin/dashboard',
                element: (
                    <ProtectedRoute requiredRole='admin'>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: '', element: <AdminDashboardOverview /> }, // Detta är adminens översiktssida
                    { path: 'users', element: <AdminUsersPage /> }, // Användarhanteringsvyn
                    { path: 'settings', element: <AdminSettingsPage /> }, // Admininställningar
                ],
            },
                
          
        ],
    },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)

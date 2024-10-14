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
import AdminUsersPage from './pages/admin/components/adminUsersPage.tsx'
import AdminDashboardOverview from './pages/admin/components/AdminDashboardOverview.tsx'
import AdminSettingsPage from './pages/admin/components/adminSettingsPage.tsx'
import BookingForm from './pages/dashboard/components/bookingForm.tsx'
import UserOverview from './pages/dashboard/components/UserOverview.tsx'
import BookingHistory from './pages/dashboard/components/BookingHistory.tsx'
import UserProfile from './pages/dashboard/components/UserProfile.tsx'
import TreatmentsPage from './pages/treatments/treatmentsPage.tsx'
import AboutPage from './pages/about/aboutPage.tsx'
import ContactPage from './pages/contact/contactPage.tsx'
import HomePage from './pages/home/homePage.tsx'
import BookingPage from './pages/booking/bookingPage.tsx'
import CreateServiceComponent from './pages/admin/components/createServiceComponent.tsx'
import UserBookingsList from './pages/dashboard/components/bookingList.tsx'
import CalendarComponent from './components/calendar/CalendarComponent.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        ),
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'treatments', element: <TreatmentsPage /> },
            {
                path: 'bookings',
                element: <BookingPage />,
            },
            { path: 'contact', element: <ContactPage /> },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: '',
                        element: <UserOverview />,
                    },
                    {
                        path: 'bookings/user',
                        element: <UserBookingsList />,
                    },
                    {
                        path: 'bookings',
                        element: <BookingForm />,
                    },
                    {
                        path: 'history',
                        element: <BookingHistory />,
                    },
                    {
                        path: 'profile',
                        element: <UserProfile />,
                    },
                   
                ],
            },
            {
                path: '/admin/dashboard',
                element: (
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboardPage />
                    </ProtectedRoute>
                ),
                children: [
                    { path: '', element: <AdminDashboardOverview /> },
                    { path: 'users', element: <AdminUsersPage /> },
                    { path: 'services', element: <CreateServiceComponent /> },
                    { path: 'settings', element: <AdminSettingsPage /> },
                    {
                        path: 'schedules', element: <CalendarComponent />
                    }
                ],
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)

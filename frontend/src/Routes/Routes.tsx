import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import DashboardPage from '../pages/DashboardPage'
import Inbox from '../components/Inbox'
import Sent from '../components/Sent'
import App from '../App'
import Compose from '../components/Compose'
import LetterOverview from '../components/LetterOverview'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/mail-dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
        children: [
          { path: '/mail-dashboard/inbox', element: <Inbox /> },
          { path: '/mail-dashboard/sent', element: <Sent /> },
          { path: '/mail-dashboard/letter/:id', element: <LetterOverview /> },
          { path: '/mail-dashboard/compose', element: <Compose /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <h1>Page not found</h1>
  }
])

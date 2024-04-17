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
import WelcomePage from '../pages/WelcomePage'
import ManageAccountPage from '../pages/ManageAccountPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/welcome',
        element: <WelcomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/uid/:uid',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
        children: [
          { path: '/uid/:uid/inbox', element: <Inbox /> },
          { path: '/uid/:uid/sent', element: <Sent /> },
          {
            path: '/uid/:uid/letter/:lid',
            element: <LetterOverview />
          },
          { path: '/uid/:uid/compose', element: <Compose /> }
        ]
      },
      {
        path: '/uid/:uid/manage-account',
        element: (
          <ProtectedRoute>
            <ManageAccountPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: <h1>Page not found</h1>
  }
])

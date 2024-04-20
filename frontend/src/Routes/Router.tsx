import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import MailDashboard from '../pages/MailDashboard'
import Inbox from '../components/Inbox'
import Sent from '../components/Sent'
import Bin from '../components/Bin'
import Spam from '../components/Spam'
import App from '../App'
import Compose from '../components/Compose'
import LetterOverview from '../components/LetterOverview'
import ManageAccountDasboard from '../pages/ManageAccountDasboard'
import General from '../components/General'
import Security from '../components/Security'

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
        path: '/uid/:uid',
        element: (
          <ProtectedRoute>
            <MailDashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: '/uid/:uid/inbox', element: <Inbox /> },
          { path: '/uid/:uid/sent', element: <Sent /> },
          { path: '/uid/:uid/spam', element: <Spam /> },
          { path: '/uid/:uid/bin', element: <Bin /> },
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
            <ManageAccountDasboard />
          </ProtectedRoute>
        ),
        children: [
          { path: '/uid/:uid/manage-account/general', element: <General /> },
          { path: '/uid/:uid/manage-account/security', element: <Security /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <h1>Page not found</h1>
  }
])

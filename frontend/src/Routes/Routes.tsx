import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import InboxPage from '../pages/InboxPage'
import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'inbox',
        element: (
          <ProtectedRoute>
            <InboxPage />
          </ProtectedRoute>
        )
      }
    ]
  }
])

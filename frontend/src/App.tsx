import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/Context'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Outlet />
      </UserProvider>
    </>
  )
}

export default App

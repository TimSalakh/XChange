import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MailDashboard = () => {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <div className='flex flex-row'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default MailDashboard

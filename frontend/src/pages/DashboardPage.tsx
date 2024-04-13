import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MailDashboard = () => {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <div>
        <Header />
      </div>
      <div className='flex flex-row h-full w-full'>
        <Sidebar />
        <div className='h-full w-full p-3 bg-slate-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MailDashboard

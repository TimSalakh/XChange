import { useAuth } from '../context/Context'
import { Link } from 'react-router-dom'

const Header = () => {
  const { logout, user } = useAuth()
  return (
    <div className='w-screen h-20 bg-slate-50 flex flex-row justify-between items-center px-7 border-b border-b-slate-200'>
      <div>
        <Link
          to='/welcome'
          className='text-black font-medium text-4xl tracking-tighter px-3 py-1 hover:bg-purple-100 transition duration-200 ease-in-out rounded-lg'
        >
          {' '}
          <span className='text-purple-900 font-black italic mr-1'>X</span>
          Change
        </Link>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <p className='text-xl'>Welcome, {user?.email}</p>
        <button
          className='text-xl text-black underline px-4 py-1 hover:text-purple-900 transition duration-200 ease-in-out tracking-tight'
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header

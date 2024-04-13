import { Link } from 'react-router-dom'
import { useAuth } from '../context/Context'

const Sidebar = () => {
  const { user } = useAuth()
  return (
    <div className='h-full w-80 flex flex-col justify-start items-center border-r border-r-slate-200 bg-slate-50 p-3'>
      <div className='flex flex-row justify-center items-center w-full mb-2'>
        <Link
          className='text-center font-bold text-xl text-white bg-purple-900 w-full rounded-md py-1 hover:bg-purple-800 transition duration-200 ease-in-out tracking-tighter'
          to={`/${user!.id}/compose`}
        >
          Compose
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className='text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out'
          to={`/${user!.id}/inbox`}
        >
          Inbox
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className='text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out'
          to={`/${user!.id}/sent`}
        >
          Sent
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

import { Link } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { useState } from 'react'

const Sidebar = () => {
  const { user } = useAuth()
  const [option, setOption] = useState('inbox')

  return (
    <div className='h-full w-80 flex flex-col justify-start items-center bg-slate-50 p-3'>
      <div className='flex flex-row justify-center items-center w-full mb-2'>
        <Link
          className='text-center font-bold text-xl text-white bg-purple-900 w-full rounded-md py-1 hover:bg-purple-800 transition duration-200 ease-in-out tracking-tighter'
          to={`/${user!.id}/compose`}
          onClick={() => setOption('compose')}
        >
          Compose
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out ${
            option === 'inbox' ? 'bg-slate-200' : ''
          }`}
          to={`/${user!.id}/inbox`}
          onClick={() => setOption('inbox')}
        >
          Inbox
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out ${
            option === 'sent' ? 'bg-slate-200' : ''
          }`}
          to={`/${user!.id}/sent`}
          onClick={() => setOption('sent')}
        >
          Sent
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

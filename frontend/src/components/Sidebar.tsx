import { Link } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { useState } from 'react'
import {
  VscEdit,
  VscInbox,
  VscSend,
  VscTrash,
  VscArchive
} from 'react-icons/vsc'

const Sidebar = () => {
  const { user } = useAuth()
  const [option, setOption] = useState('inbox')

  return (
    <div className='h-full w-80 flex flex-col justify-start items-center bg-slate-50 p-3'>
      <div className='flex flex-row justify-center items-center w-full mb-2'>
        <Link
          className='flex flex-row justify-center items-center text-center font-bold text-xl text-white bg-purple-950 w-full rounded-md py-1 hover:bg-purple-800 transition duration-200 ease-in-out tracking-tighter'
          to={`/uid/${user!.id}/compose`}
          onClick={() => setOption('compose')}
        >
          <div className='flex flex-row justify-center items-center'>
            <VscEdit size={20} />
            <span className='ml-2'>Compose</span>
          </div>
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out flex flex-row justify-start items-center ${
            option === 'inbox' ? 'bg-slate-200' : ''
          }`}
          to={`/uid/${user!.id}/inbox`}
          onClick={() => setOption('inbox')}
        >
          <div className='flex flex-row justify-center items-center'>
            <VscInbox size={20} />
            <span className='ml-2'>Inbox</span>
          </div>
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out flex flex-row justify-start items-center ${
            option === 'sent' ? 'bg-slate-200' : ''
          }`}
          to={`/uid/${user!.id}/sent`}
          onClick={() => setOption('sent')}
        >
          <div className='flex flex-row justify-center items-center'>
            <VscSend size={20} />
            <span className='ml-2'>Sent</span>
          </div>
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out flex flex-row justify-start items-center ${
            option === 'qweqwe' ? 'bg-slate-200' : ''
          }`}
          to={`/uid/${user!.id}/sent`}
          onClick={() => setOption('sent')}
        >
          <div className='flex flex-row justify-center items-center'>
            <VscArchive size={20} />
            <span className='ml-2'>Spam</span>
          </div>
        </Link>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <Link
          className={`text-start font-bold text-xl text-black w-full rounded-md tracking-tight py-1 pl-2 mb-2 hover:bg-slate-200 transition duration-200 ease-in-out flex flex-row justify-start items-center ${
            option === 'qweqwe' ? 'bg-slate-200' : ''
          }`}
          to={`/uid/${user!.id}/sent`}
          onClick={() => setOption('sent')}
        >
          <div className='flex flex-row justify-center items-center'>
            <VscTrash size={20} />
            <span className='ml-2'>Bin</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { VscArrowLeft, VscAccount, VscKey } from 'react-icons/vsc'
import { useState } from 'react'

const ManageAccountSidebar = () => {
  const { user } = useAuth()
  return (
    <div className='flex flex-row justify-start items-center h-1/12 w-full p-3 mb-5'>
      <Link
        to={`/uid/${user!.id}/inbox`}
        className='w-auto flex flex-row justify-start items-center text-xl py-2 px-3 hover:bg-slate-200 transition duration-200 ease-in-out rounded-md'
      >
        <VscArrowLeft size={20} color='black' />{' '}
        <span className='ml-1'>Back</span>
      </Link>
    </div>
  )
}

const ManageAccountDasboard = () => {
  const { user } = useAuth()
  const [option, setOption] = useState<string>('general')

  return (
    <div className='flex flex-col justify-start items-center h-screen w-screen overflow-hidden bg-slate-50'>
      <ManageAccountSidebar />
      <div className='flex flex-row justify-center items-center h-5/6 w-3/6 border-2 border-slate-300'>
        <div className='flex flex-col justify-start items-center h-full w-2/6 border-r-2 border-r-slate-300 p-2'>
          <Link
            to={`/uid/${user!.id}/manage-account/general`}
            className={`w-full flex flex-row justify-start items-center text-xl px-2 py-1 hover:bg-slate-200 transition duration-200 ease-in-out rounded-md mb-2 ${
              option === 'general' ? 'bg-slate-200' : ''
            }`}
            onClick={() => setOption('general')}
          >
            <VscAccount size={20} color='black' />{' '}
            <span className='ml-2'>General</span>
          </Link>
          <Link
            to={`/uid/${user!.id}/manage-account/security`}
            className={`w-full flex flex-row justify-start items-center text-xl px-2 py-1 hover:bg-slate-200 transition duration-200 ease-in-out rounded-md ${
              option === 'security' ? 'bg-slate-200' : ''
            }`}
            onClick={() => setOption('security')}
          >
            <VscKey size={20} color='black' />
            <span className='ml-2'>Security</span>
          </Link>
        </div>
        <div className='h-full w-4/6 p-3'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ManageAccountDasboard

import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-full border-b-slate-200 w-80 flex flex-col justify-start items-center bg-slate-50 p-2'>
      <div>
        <Link
          className='font-bold text-xl bg-red-400'
          to='/mail-dashboard/compose'
        >
          Compose
        </Link>
      </div>
      <div>
        <Link className='font-bold text-xl' to='/mail-dashboard/inbox'>
          Inbox
        </Link>
      </div>
      <div>
        <Link className='font-bold text-xl' to='/mail-dashboard/sent'>
          Sent
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

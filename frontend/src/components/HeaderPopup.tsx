import React, { useState } from 'react'
import { useAuth } from '../context/Context'

const HeaderPopup = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className='text-xl underline'>
        {user?.email}
      </button>
      {isOpen && (
        <div className='absolute z-1 right-39 mt-2 w-48 bg-white rounded-md shadow-xl border-2 border-slate-200 flex flex-col items-start text-xl'>
          <button className='hover:bg-slate-200 w-full h-wull text-start px-3 py-2'>
            Manage account
          </button>
          <button
            onClick={() => logout()}
            className='hover:bg-slate-200 w-full h-wull text-start px-3 py-2'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default HeaderPopup

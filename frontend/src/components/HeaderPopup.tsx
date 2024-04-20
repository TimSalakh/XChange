import { useState } from 'react'
import { useAuth } from '../context/Context'
import { useNavigate } from 'react-router-dom'
import { VscAccount, VscSignOut } from 'react-icons/vsc'

const HeaderPopup = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setIsClicked(!isClicked)
        }}
        className={`text-xl rounded-md px-2 py-1 border-2 border-slate-300 ${
          isClicked ? 'bg-slate-200' : ''
        }`}
      >
        {user?.email}
      </button>
      {isOpen && (
        <div className='absolute z-20 right-25 mt-2 w-auto bg-white rounded-md shadow-xl border-2 border-slate-200 flex flex-col items-start text-lg'>
          <button
            onClick={() => navigate(`/uid/${user!.id}/manage-account`)}
            className='hover:bg-slate-200 w-full h-wull flex flex-row justify-start items-center px-3 py-2'
          >
            <div className='flex flex-row justify-center items-center'>
              <VscAccount size={20} />
              <span className='ml-3'>Manage account</span>
            </div>
          </button>
          <button
            onClick={() => logout()}
            className='hover:bg-slate-200 w-full h-wull text-start px-3 py-2 flex flex-row justify-start items-center'
          >
            <div className='flex flex-row justify-center items-center'>
              <VscSignOut size={20} />
              <span className='ml-3'>Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default HeaderPopup

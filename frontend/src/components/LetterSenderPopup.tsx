import { useEffect, useState } from 'react'
import { UserDataModel } from '../models/UserModels'
import { accountDataApi } from '../services/AccountService'
import { handleError } from '../services/ErrorService'
import { VscVerifiedFilled } from 'react-icons/vsc'

const LetterSenderPopup = ({ userId }: { userId: string | null }) => {
  const [userData, setUserData] = useState<UserDataModel | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!!!userId) {
        return null
      }
      try {
        const response = await accountDataApi(userId!)
        if (response && response.data) {
          setUserData(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div>
      <div
        className='flex flex-row justify-between items-center           cursor-pointer bg-slate-200 px-2 py-1 rounded-md hover:bg-slate-300 transition duration-200 ease-in-out'
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <p>{userData ? userData.email : null}</p>
        <VscVerifiedFilled size={22} color='green' className='ml-2' />
      </div>
      {isVisible && userData && (
        <div className='absolute z-1 right-39 w-auto max-w-96 text-justify bg-white border border-gray-300 shadow-lg rounded-lg p-3 mt-3'>
          <div className='mb-1 text-lg'>
            {userData.name} {userData.surname}
          </div>
          {userData.country && userData.city ? (
            <div className='mb-1 text-lg'>
              {userData.country}, {userData.city}
            </div>
          ) : null}
          {userData.bio ? (
            <div className='text-left text-lg'>Bio: {userData.bio}</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default LetterSenderPopup

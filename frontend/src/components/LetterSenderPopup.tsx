import { useEffect, useState } from 'react'
import { UserDataModel } from '../models/UserModels'
import { userDataApi } from '../services/MailService'
import { handleError } from '../services/ErrorService'

const LetterSenderPopup = ({ email }: { email: string | null }) => {
  const [userData, setUserData] = useState<UserDataModel | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        return null
      }
      try {
        const response = await userDataApi(email)
        if (response && response.data) {
          setUserData(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchUserData()
  }, [email])

  return (
    <div>
      <p
        className='cursor-pointer bg-slate-200 px-2 py-1 rounded-md'
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {email}
      </p>
      {isVisible && userData && (
        <div className='absolute z-1 right-39 w-auto bg-white border border-gray-300 shadow-lg rounded-lg p-3 mt-3'>
          <div>Name: {userData.fullName}</div>
          <div>
            {userData.country}, {userData.city}
          </div>
          <div>{userData.bio}</div>
        </div>
      )}
    </div>
  )
}

export default LetterSenderPopup

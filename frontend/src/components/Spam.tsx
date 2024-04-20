import { useEffect, useState } from 'react'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import SpamLetterPreview from './SpamLetterPreview'
import { useAuth } from '../context/Context'
import { VscDiscard } from 'react-icons/vsc'
import { toast } from 'react-toastify'
import { spamApi, removeFromSpamApi } from '../services/MailService'

const Spam = () => {
  const [spam, setSpam] = useState<LetterDataModel[]>([])
  const { user } = useAuth()
  const [isBarActive, setIsBarActive] = useState<boolean>(false)
  const [letterId, setLetterId] = useState<string>('')
  const [receiverId, setReceiverId] = useState<string>('')
  const [senderId, setSenderId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    const fetchSpam = async () => {
      try {
        const response = await spamApi(user!.id)
        setSpam(response!.data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchSpam()
  }, [user])

  const checkboxHandler = (
    isActive: boolean,
    letterId: string,
    receiverId: string,
    senderId: string
  ) => {
    setIsBarActive(isActive)
    setLetterId(letterId)
    setReceiverId(receiverId)
    setSenderId(senderId)
  }

  const handleRemoveFromSpamClick = async () => {
    try {
      await removeFromSpamApi(receiverId, senderId)
      await updateSpam()
      toast.success('Removed from spam.')
    } catch (error) {
      handleError(error)
    }
  }

  const updateSpam = async () => {
    try {
      const response = await spamApi(user!.id)
      setSpam(response!.data)
    } catch (error) {
      handleError(error)
    }
  }

  const filteredSpam = spam.filter(
    (letter) =>
      letter.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.body.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.sender.toLowerCase().includes(searchText.toLowerCase())
  )

  return spam.length === 0 ? (
    <div className='h-full w-full font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
      No letters in spam
    </div>
  ) : (
    <div className='overflow-y-auto max-h-[700px]'>
      <table className='w-full h-full'>
        <thead className='w-full h-12 bg-white border border-slate-200 flex flex-row justify-between items-center sticky top-0 z-10'>
          <td className='w-auto h-full flex flex-row justify-center items-center pl-2'>
            <button
              disabled={!isBarActive}
              onClick={() => handleRemoveFromSpamClick()}
              className={`flex flex-row justify-between items-center text-lg rounded-md px-3 py-0.5 ${
                isBarActive
                  ? 'bg-green-100 text-green-600 hover:bg-green-200 transition duration-100 ease-in-out'
                  : ' bg-gray-100 text-gray-400'
              }`}
            >
              Remove from spam
              <VscDiscard
                className='ml-2'
                size={20}
                color={`${isBarActive ? '#16a34a' : '#9ca3af'}`}
              />
            </button>
          </td>
          <td className='h-full w-3/12 px-2 py-1.5'>
            <input
              placeholder='Search'
              className='h-full w-full focus:outline-none focus:border-slate-300 rounded-md border-2 border-slate-200 px-2 text-lg'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </td>
        </thead>
        {filteredSpam.map((letter) => (
          <SpamLetterPreview
            key={letter.id}
            letterId={letter.id}
            receiverId={letter.receiverId}
            receiver={letter.receiver}
            senderId={letter.senderId}
            sender={letter.sender}
            subject={letter.subject}
            date={letter.date}
            action={checkboxHandler}
          />
        ))}
      </table>
    </div>
  )
}

export default Spam

import { useEffect, useState } from 'react'
import { changeIsDeletedByReceiverApi, inboxApi } from '../services/MailService'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import InboxLetterPreview from './InboxLetterPreview'
import { useAuth } from '../context/Context'
import { VscTrash, VscArchive } from 'react-icons/vsc'
import { error } from 'console'
import { toast } from 'react-toastify'

const Inbox = () => {
  const [inbox, setInbox] = useState<LetterDataModel[]>([])
  const { user } = useAuth()
  const [isBarActive, setIsBarActive] = useState<boolean>(false)
  const [letterId, setLetterId] = useState<string>('')
  const [senderId, setSenderId] = useState<string>('')

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await inboxApi(user!.id)
        setInbox(response!.data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchInbox()
  }, [user])

  const checkboxHandler = (
    isActive: boolean,
    letterId: string,
    senderId: string
  ) => {
    setIsBarActive(isActive)
    setLetterId(letterId)
    setSenderId(senderId)
  }

  const handleBinClick = async () => {
    try {
      await changeIsDeletedByReceiverApi(letterId)
      toast.success('Moved to bin.')
    } catch (error) {
      handleError(error)
    }
  }

  const handleSpamClick = () => {
    console.log('qweqweqwe')
  }

  return inbox.length === 0 ? (
    <div className='h-full w-full border-slate-300 font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
      No inbox letters
    </div>
  ) : (
    <table className='w-full h-full'>
      <thead className='w-full h-12 bg-white border border-slate-200 flex flex-row'>
        <td className='w-auto h-full flex flex-row justify-center items-center pl-2'>
          <button
            disabled={!isBarActive}
            onClick={() => handleBinClick()}
            className={`flex flex-row justify-between items-center text-lg rounded-md px-3 py-0.5 ${
              isBarActive
                ? 'bg-red-100 text-red-600'
                : ' bg-gray-100 text-gray-400'
            }`}
          >
            Move to bin
            <VscTrash
              className='ml-2'
              size={20}
              color={`${isBarActive ? '#dc2626' : '#9ca3af'}`}
            />
          </button>
        </td>
        <td className='w-auto h-full flex flex-row justify-center items-center pl-2'>
          <button
            disabled={!isBarActive}
            onClick={() => handleSpamClick()}
            className={`flex flex-row justify-between items-center text-lg rounded-md px-3 py-0.5 ${
              isBarActive
                ? 'bg-slate-200 text-slate-600'
                : ' bg-gray-100 text-gray-400'
            }`}
          >
            This is spam!
            <VscArchive
              className='ml-2'
              size={20}
              color={`${isBarActive ? '#475569' : '#9ca3af'}`}
            />
          </button>
        </td>
      </thead>
      {inbox.map((letter) => (
        <InboxLetterPreview
          key={letter.id}
          letterId={letter.id}
          isRead={letter.isRead}
          senderId={letter.senderId}
          sender={letter.sender}
          subject={letter.subject}
          date={letter.date}
          action={checkboxHandler}
        />
      ))}
    </table>
  )
}

export default Inbox

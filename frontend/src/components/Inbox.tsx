import { useEffect, useState } from 'react'
import {
  changeIsDeletedByReceiverApi,
  inboxApi,
  addToSpamApi
} from '../services/MailService'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import InboxLetterPreview from './InboxLetterPreview'
import { useAuth } from '../context/Context'
import { VscTrash, VscArchive, VscSearch } from 'react-icons/vsc'
import { toast } from 'react-toastify'

const Inbox = () => {
  const [inbox, setInbox] = useState<LetterDataModel[]>([])
  const { user } = useAuth()
  const [isBarActive, setIsBarActive] = useState<boolean>(false)
  const [letterId, setLetterId] = useState<string>('')
  const [receiverId, setReceiverId] = useState<string>('')
  const [senderId, setSenderId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

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
  }, [])

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

  const handleBinClick = async () => {
    try {
      await changeIsDeletedByReceiverApi(letterId)
      await updateInbox()
      toast.success('Moved to bin.')
    } catch (error) {
      handleError(error)
    }
  }

  const handleSpamClick = async () => {
    try {
      await addToSpamApi(receiverId, senderId)
      await updateInbox()
      toast.success('Moved to spam.')
    } catch (error) {
      handleError(error)
    }
  }

  const updateInbox = async () => {
    try {
      const response = await inboxApi(user!.id)
      setInbox(response!.data)
    } catch (error) {
      handleError(error)
    }
  }

  const filteredInbox = inbox.filter(
    (letter) =>
      letter.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.body.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.sender.toLowerCase().includes(searchText.toLowerCase())
  )

  return inbox.length === 0 ? (
    <div className='h-full w-full font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
      No inbox letters
    </div>
  ) : (
    <div className='overflow-y-auto max-h-[700px]'>
      <table className='w-full h-full'>
        <thead className='w-full h-12 bg-white border border-slate-200 flex flex-row justify-between items-center sticky top-0 z-10'>
          <div className='flex flex-row'>
            <td className='w-auto h-full flex flex-row justify-center items-center pl-2'>
              <button
                disabled={!isBarActive}
                onClick={() => handleBinClick()}
                className={`flex flex-row justify-between items-center text-lg rounded-md px-3 py-0.5 ${
                  isBarActive
                    ? 'bg-red-100 text-red-600 hover:bg-red-200 transition duration-100 ease-in-out'
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
                    ? 'bg-slate-200 text-slate-600 hover:bg-slate-300 transition duration-100 ease-in-out'
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
          </div>
          <td className='h-full w-3/12 px-2 py-1.5'>
            <input
              placeholder='Search'
              className='h-full w-full focus:outline-none focus:border-slate-300 rounded-md border-2 border-slate-200 px-2 text-lg'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </td>
        </thead>
        {filteredInbox.map((letter) => (
          <InboxLetterPreview
            key={letter.id}
            letterId={letter.id}
            isRead={letter.isRead}
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

export default Inbox

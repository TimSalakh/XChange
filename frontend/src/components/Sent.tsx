import { useEffect, useState } from 'react'
import { sentApi, changeIsDeletedBySenderApi } from '../services/MailService'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import SentLetterPreview from './SentLetterPreview'
import { useAuth } from '../context/Context'
import { toast } from 'react-toastify'
import { VscTrash, VscSettings } from 'react-icons/vsc'

const Sent = () => {
  const [sent, setSent] = useState<LetterDataModel[]>([])
  const { user } = useAuth()
  const [isBarActive, setIsBarActive] = useState<boolean>(false)
  const [letterId, setLetterId] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const response = await sentApi(user!.id, 'new')
        setSent(response!.data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchSent()
  }, [user])

  const checkboxHandler = (isActive: boolean, letterId: string) => {
    setIsBarActive(isActive)
    setLetterId(letterId)
  }

  const handleBinClick = async () => {
    try {
      await changeIsDeletedBySenderApi(letterId)
      await updateSent('new')
      toast.success('Moved to bin.')
    } catch (error) {
      handleError(error)
    }
  }

  const updateSent = async (option: string) => {
    try {
      const response = await sentApi(user!.id, option)
      setSent(response!.data)
    } catch (error) {
      handleError(error)
    }
  }

  const filteredSent = sent.filter(
    (letter) =>
      letter.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.body.toLowerCase().includes(searchText.toLowerCase()) ||
      letter.receiver.toLowerCase().includes(searchText.toLowerCase())
  )

  return sent.length === 0 ? (
    <div className='h-full w-full font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
      No sent letters
    </div>
  ) : (
    <div className='overflow-y-auto max-h-[700px]'>
      <table className='w-full h-full'>
        <thead className='w-full h-12 bg-white border border-slate-200 flex flex-row justify-between items-center sticky top-0 z-10'>
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
          <div className='h-full w-4/12 flex flex-row justify-end pr-2'>
            <td className='h-full w-auto px-2 py-1.5'>
              <input
                placeholder='Search'
                className='h-full w-full focus:outline-none focus:border-slate-300 rounded-md border-2 border-slate-200 px-2 text-lg'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </td>
            <td className='h-full w-12 flex flex-row justify-center items-center p-1.5'>
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                className='h-full w-full flex flex-row justify-center items-center rounded-md hover:bg-slate-200 transition duration-100 ease-in-out'
              >
                <VscSettings size={25} color='gray' />
                {isOpen && (
                  <div className='absolute z-20 top-9 right-6 mt-2 w-auto bg-white rounded-md shadow-xl border-2 border-slate-200 flex flex-col items-start text-lg'>
                    <button
                      onClick={() => updateSent('new')}
                      className='hover:bg-slate-200 w-full h-wull flex flex-row justify-start items-center px-3 py-1'
                    >
                      New first
                    </button>
                    <button
                      onClick={() => updateSent('old')}
                      className='hover:bg-slate-200 w-full h-wull flex flex-row justify-start items-center px-3 py-1'
                    >
                      Old first
                    </button>
                  </div>
                )}
              </button>
            </td>
          </div>
        </thead>
        {filteredSent.map((letter) => (
          <SentLetterPreview
            key={letter.id}
            letterId={letter.id}
            receiverId={letter.receiverId}
            receiver={letter.receiver}
            subject={letter.subject}
            date={letter.date}
            action={checkboxHandler}
          />
        ))}
      </table>
    </div>
  )
}

export default Sent

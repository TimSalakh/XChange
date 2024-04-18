import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { changeIsReadApi } from '../services/MailService'
import { handleError } from '../services/ErrorService'
import { UnreadMark, ReadMark } from './LetterStatusMark'

const InboxLetterPreview = (props: {
  id: string
  isRead: boolean
  target: string
  subject: string
  date: string
}) => {
  const { id, isRead, target, subject, date } = props
  const navigate = useNavigate()
  const { user } = useAuth()

  const changeIsReadStatus = async () => {
    try {
      await changeIsReadApi(id)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div
      onClick={() => {
        if (!isRead) {
          changeIsReadStatus()
        }
        navigate(`/uid/${user!.id}/letter/${id}`)
      }}
      className='w-full h-10 flex flex-row justify-between items-center rounded-lg bg-white border border-slate-200 py-2 px-3 mb-2 hover:bg-slate-200 transition duration-100 ease-in-out shadow-sm'
    >
      <div className='w-7/12 flex flex-row justify-between items-center'>
        {isRead ? <ReadMark /> : <UnreadMark />}
        <div className='flex w-5/6 h-full flex-row justify-between items-center'>
          <div className='font-medium text-lg w-auto'>{target}</div>
          <div className='font-medium text-lg w-auto'>{subject}</div>
        </div>
      </div>
      <div className='font-medium text-lg tracking-tight'>{date}</div>
    </div>
  )
}

export default InboxLetterPreview

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'

const LetterPreview = (props: {
  id: string
  target: string
  subject: string
  date: string
}) => {
  const { id, target, subject, date } = props
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div
      onClick={() => navigate(`/uid/${user!.id}/letter/${id}`)}
      className='w-full h-10 flex flex-row justify-between items-center rounded-lg bg-white border border-slate-200 py-2 px-3 mb-2 hover:bg-slate-200 transition duration-100 ease-in-out shadow-sm'
    >
      <div className='flex w-2/5 h-full flex-row justify-between items-center'>
        <div>
          <p className='font-medium text-lg w-auto'>{target}</p>
        </div>
        <div>
          <p className='font-medium text-lg w-auto'>{subject}</p>
        </div>
      </div>
      <div className='font-medium text-lg tracking-tight'>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default LetterPreview

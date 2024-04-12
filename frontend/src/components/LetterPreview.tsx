import { useNavigate } from 'react-router-dom'

const LetterPreview = (props: {
  id: string
  target: string
  subject: string
  date: string
}) => {
  const { id, target, subject, date } = props
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/mail-dashboard/letter/${id}`)}
      className='w-full h-4 flex flex-row justify-between items-center'
    >
      <div className='flex w-1/3 h-full flex-row justify-between items-center'>
        <div>
          <p className='font-meium text-xl'>{target}</p>
        </div>
        <div>
          <p className='font-meium text-xl'>{subject}</p>
        </div>
      </div>
      <div className='font-bold text-xl'>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default LetterPreview

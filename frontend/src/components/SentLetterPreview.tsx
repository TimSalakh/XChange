import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { useEffect, useState } from 'react'
import { DefaultCheckbox, SelectedCheckbox } from './LetterCheckbox'

const SentLetterPreview = (props: {
  letterId: string
  receiverId: string
  receiver: string
  subject: string
  date: string
  action: (isActive: boolean, letterId: string, receiverId: string) => void
}) => {
  const { letterId, receiverId, receiver, subject, date, action } = props
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)

  useEffect(() => {
    action(isCheckboxSelected, letterId, receiverId)
  }, [isCheckboxSelected])

  const handleLetterClick = () => {
    navigate(`/uid/${user!.id}/letter/${letterId}`)
  }

  return (
    <tr className='w-full h-12 bg-white border border-slate-200 flex flex-row'>
      <td
        onClick={() => setIsCheckboxSelected(!isCheckboxSelected)}
        className='h-full w-1/12 flex flex-row justify-start items-center pl-3'
      >
        {isCheckboxSelected ? <SelectedCheckbox /> : <DefaultCheckbox />}
      </td>
      <td
        className='h-full w-4/12 flex flex-row justify-start items-center text-lg cursor-default'
        onClick={() => handleLetterClick()}
      >
        <span className='italic mr-1 text-base'>to:</span> {receiver}
      </td>
      <td
        className='h-full w-5/12 flex flex-row justify-start items-center text-lg cursor-default'
        onClick={() => handleLetterClick()}
      >
        {subject}
      </td>
      <td
        className='h-full w-2/12 flex flex-row justify-end items-center pr-3 text-lg text-gray-400 cursor-default'
        onClick={() => handleLetterClick()}
      >
        {date}
      </td>
    </tr>
  )
}

export default SentLetterPreview

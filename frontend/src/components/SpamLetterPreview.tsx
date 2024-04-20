import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { changeIsReadApi } from '../services/MailService'
import { handleError } from '../services/ErrorService'
import { UnreadMark, ReadMark } from './LetterStatusMark'
import { DefaultCheckbox, SelectedCheckbox } from './LetterCheckbox'
import { useEffect, useState } from 'react'

const SpamLetterPreview = (props: {
  letterId: string
  receiverId: string
  receiver: string
  senderId: string
  sender: string
  subject: string
  date: string
  action: (
    isActive: boolean,
    letterId: string,
    receiverId: string,
    senderId: string
  ) => void
}) => {
  const {
    letterId,
    receiverId,
    receiver,
    senderId,
    sender,
    subject,
    date,
    action
  } = props
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)

  useEffect(() => {
    action(isCheckboxSelected, letterId, receiverId, senderId)
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
        className='h-full w-5/12 flex flex-row justify-start items-center text-lg cursor-default pl-3'
        onClick={() => handleLetterClick()}
      >
        <span className='italic mr-1 text-base'>from:</span> {sender}
      </td>
      <td
        className='h-full w-4/12 flex flex-row justify-start items-center text-lg cursor-default'
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

export default SpamLetterPreview

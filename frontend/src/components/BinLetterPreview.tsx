import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { DefaultCheckbox, SelectedCheckbox } from './LetterCheckbox'
import { useEffect, useState } from 'react'

const BinLetterPreview = (props: {
  letterId: string
  senderId: string
  sender: string
  receiverId: string
  receiver: string
  subject: string
  date: string
  action: (
    isActive: boolean,
    letterId: string,
    senderId: string,
    receiverId: string
  ) => void
}) => {
  const {
    letterId,
    senderId,
    sender,
    receiverId,
    receiver,
    subject,
    date,
    action
  } = props
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)

  useEffect(() => {
    action(isCheckboxSelected, letterId, senderId, receiverId)
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
        className='h-full w-6/12 flex flex-row justify-start items-center text-lg cursor-default'
        onClick={() => handleLetterClick()}
      >
        <span>
          <span className='italic mr-1 text-base'>from:</span> {sender}
        </span>
        <span className='ml-10'>
          <span className='italic mr-1 text-base'>to:</span> {receiver}
        </span>
      </td>
      <td
        className='h-full w-3/12 flex flex-row justify-start items-center text-lg cursor-default'
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

export default BinLetterPreview

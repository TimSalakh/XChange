import { useParams } from 'react-router-dom'
import { letterApi } from '../services/MailService'
import { LetterOverviewModel } from '../models/LetterModels'
import { useState, useEffect } from 'react'
import { handleError } from '../services/ErrorService'
import LetterSenderPopup from './LetterSenderPopup'

const LetterOverview = () => {
  const { lid } = useParams<{ lid?: string }>()
  const [letter, setLetter] = useState<LetterOverviewModel | null>(null)

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await letterApi(lid!)
        if (response && response.data) {
          setLetter(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchLetter()
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-start items-start bg-white border border-slate-300 p-3 rounded-lg text-xl shadow'>
      <div className='w-full flex flex-row justify-between items-center mb-1'>
        <p className='flex flex-row justify-between items-center mb-5'>
          <span className='mr-2'>From: </span>
          <LetterSenderPopup email={letter ? letter!.sender : null} />
        </p>
        <div>{letter?.date}</div>
      </div>
      <div>
        <div className='mb-5'>
          <p>{letter?.subject}</p>
        </div>
        <div>
          <p>{letter?.body}</p>
        </div>
      </div>
    </div>
  )
}

export default LetterOverview

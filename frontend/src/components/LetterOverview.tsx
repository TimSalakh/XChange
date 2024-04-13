import { useParams } from 'react-router-dom'
import { letterApi } from '../services/MailService'
import { LetterOverviewModel } from '../models/LetterModels'
import { useState, useEffect } from 'react'
import { handleError } from '../services/ErrorService'

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
        <div>
          <p>
            <span className='italic mr-2'>From: </span>
            <span className='border-b-2 border-b-gray-600'>
              {letter?.sender}
            </span>
          </p>
        </div>
        <div>
          <p>{letter?.date}</p>
        </div>
      </div>
      <div className='mb-7'>
        <p>
          <span className='italic mr-2'>To: </span>
          <span className='border-b-2 border-b-gray-600'>
            {letter?.receiver}
          </span>
        </p>
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

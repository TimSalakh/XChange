import { useParams } from 'react-router-dom'
import { letterApi } from '../services/MailService'
import { LetterOverviewModel } from '../models/LetterModels'
import { useState, useEffect } from 'react'
import { handleError } from '../services/ErrorService'

const LetterOverview = () => {
  const { id } = useParams<{ id: string }>()
  const [letter, setLetter] = useState<LetterOverviewModel | null>(null)

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const response = await letterApi(id!)
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
    <div className='w-full h-full flex flex-col justify-start items-start'>
      <p>{letter?.sender}</p>
      <p>{letter?.receiver}</p>
      <p>{letter?.subject}</p>
      <p>{letter?.body}</p>
      <p>{letter?.date}</p>
    </div>
  )
}

export default LetterOverview

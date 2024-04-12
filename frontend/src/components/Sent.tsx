import { useEffect, useState } from 'react'
import { sentApi } from '../services/MailService'
import { LetterPreviewModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import LetterPreview from './LetterPreview'

const Sent = () => {
  const [sent, setSent] = useState<LetterPreviewModel[]>([])

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const response = await sentApi()
        if (response && response.data) {
          setSent(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchSent()
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
      {sent.map((letter) => (
        <LetterPreview
          key={letter.id}
          id={letter.id}
          target={letter.receiver}
          subject={letter.subject}
          date={letter.date}
        />
      ))}
    </div>
  )
}

export default Sent

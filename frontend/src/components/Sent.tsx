import { useEffect, useState } from 'react'
import { sentApi } from '../services/MailService'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import SentLetterPreview from './SentLetterPreview'
import { useAuth } from '../context/Context'

const Sent = () => {
  const [sent, setSent] = useState<LetterDataModel[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const response = await sentApi(user!.id)
        setSent(response!.data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchSent()
  }, [user])

  return (
    <div className='w-full h-full flex flex-col justify-start items-center overflow-y-auto'>
      {sent.length === 0 ? (
        <div className='h-full w-full border-slate-300 font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
          No sent letters
        </div>
      ) : (
        sent.map((letter) => (
          <SentLetterPreview
            key={letter.id}
            id={letter.id}
            target={letter.receiver}
            subject={letter.subject}
            date={letter.date}
          />
        ))
      )}
    </div>
  )
}

export default Sent

import { useEffect, useState } from 'react'
import { inboxApi } from '../services/MailService'
import { LetterPreviewModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import LetterPreview from './LetterPreview'
import { useAuth } from '../context/Context'
import { useLocation } from 'react-router-dom'

const Inbox = () => {
  const [inbox, setInbox] = useState<LetterPreviewModel[]>([])
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        console.log(`calling api inbox from ${location.pathname}`)
        const response = await inboxApi(user!.id)
        setInbox(response!.data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchInbox()
  }, [user])

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
      {inbox.length === 0 ? (
        <div className='h-full w-full border-slate-300 font-medium text-4xl tracking-tight flex flex-row justify-center items-center text-slate-300'>
          No inbox letters
        </div>
      ) : (
        inbox.map((letter) => (
          <LetterPreview
            key={letter.id}
            id={letter.id}
            target={letter.sender}
            subject={letter.subject}
            date={letter.date}
          />
        ))
      )}
    </div>
  )
}

export default Inbox

import { useEffect, useState } from 'react'
import { inboxApi } from '../services/MailService'
import { LetterDataModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import InboxLetterPreview from './InboxLetterPreview'
import { useAuth } from '../context/Context'

const Inbox = () => {
  const [inbox, setInbox] = useState<LetterDataModel[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchInbox = async () => {
      try {
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
          <InboxLetterPreview
            key={letter.id}
            id={letter.id}
            isRead={letter.isRead}
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

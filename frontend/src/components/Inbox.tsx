import { useEffect, useState } from 'react'
import { inboxApi } from '../services/MailService'
import { LetterPreviewModel } from '../models/LetterModels'
import { handleError } from '../services/ErrorService'
import LetterPreview from './LetterPreview'

const Inbox = () => {
  const [inbox, setInbox] = useState<LetterPreviewModel[]>([])

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await inboxApi()
        if (response && response.data) {
          setInbox(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchInbox()
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
      {inbox.map((letter) => (
        <LetterPreview
          key={letter.id}
          id={letter.id}
          target={letter.sender}
          subject={letter.subject}
          date={letter.date}
        />
      ))}
    </div>
  )
}

export default Inbox

export type LetterDataModel = {
  id: string
  senderId: string
  sender: string
  receiverId: string
  receiver: string
  body: string
  subject: string
  date: string
  isRead: boolean
  isDeletedByReceiver: boolean
  isDeletedBySender: boolean
}

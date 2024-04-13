import { ComposeFormInputs } from '../models/FormInputsModels'
import axios from 'axios'
import { handleError } from './ErrorService'
import { toast } from 'react-toastify'
import { LetterPreviewModel, LetterOverviewModel } from '../models/LetterModels'
import { UserToStore } from '../models/UserModels'

const apiUrl = 'https://localhost:8888/api/xchangemail'
const user: UserToStore = JSON.parse(localStorage.getItem('user') || '{}')

const composeApi = async (props: ComposeFormInputs) => {
  try {
    await axios.post(`${apiUrl}/compose`, {
      senderId: user!.id,
      receiverEmail: props.receiver,
      subject: props.subject,
      body: props.body
    })
    toast.success('Letter sent.')
  } catch (error) {
    handleError(error)
  }
}

const inboxApi = async () => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${apiUrl}/${user!.id}/inbox`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const sentApi = async () => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${apiUrl}/${user!.id}/sent`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const letterApi = async (id: string) => {
  try {
    const response = await axios.get<LetterOverviewModel>(
      `${apiUrl}/letter/${id}`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { composeApi, inboxApi, sentApi, letterApi }

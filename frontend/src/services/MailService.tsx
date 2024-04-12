import { ComposeFormInputs } from '../models/FormInputsModels'
import axios from 'axios'
import { handleError } from './ErrorService'
import { toast } from 'react-toastify'
import { UserToStore } from '../models/UserModels'
import { LetterPreviewModel, LetterOverviewModel } from '../models/LetterModels'

const apiUrl = 'https://localhost:8888/api/xchangemail'
const user: UserToStore = JSON.parse(localStorage.getItem('user') || '{}')

const composeApi = async (props: ComposeFormInputs) => {
  try {
    await axios.post(`${apiUrl}/compose`, {
      senderId: user.id,
      receiverEmail: props.receiver,
      subject: props.subject,
      body: props.body
    })
    toast.success('Letter sent.')
  } catch (error) {
    handleError(error)
  }
}

const receivedApi = async () => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${apiUrl}/${user.id}/received`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const sentApi = async () => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${apiUrl}/${user.id}/sent`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const letterApi = async (id: string) => {
  try {
    const response = await axios.get<LetterOverviewModel>(
      `${apiUrl}/letter/${id}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { composeApi, receivedApi, sentApi, letterApi }

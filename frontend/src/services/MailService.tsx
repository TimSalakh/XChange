import { ComposeFormInputs } from '../models/FormInputsModels'
import axios from 'axios'
import { handleError } from './ErrorService'
import { LetterPreviewModel, LetterOverviewModel } from '../models/LetterModels'

const baseApiUrl = 'https://localhost:8888/api/xchangemail'

const doesUserExistApi = async (email: string) => {
  try {
    var response = await axios.get(`${baseApiUrl}/user-exist/${email}`)
    return response.status === 200
  } catch (error) {
    handleError(error)
  }
}

const composeApi = async (inputs: ComposeFormInputs, userId: string) => {
  try {
    await axios.post(`${baseApiUrl}/compose`, {
      senderId: userId,
      receiverEmail: inputs.receiver,
      subject: inputs.subject,
      body: inputs.body
    })
  } catch (error) {
    handleError(error)
  }
}

const inboxApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${baseApiUrl}/${userId}/inbox`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const sentApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterPreviewModel[]>(
      `${baseApiUrl}/${userId}/sent`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const letterApi = async (letterId: string) => {
  try {
    const response = await axios.get<LetterOverviewModel>(
      `${baseApiUrl}/letter/${letterId}`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { composeApi, inboxApi, sentApi, letterApi, doesUserExistApi }

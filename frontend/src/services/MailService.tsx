import { ComposeFormInputs } from '../models/FormInputsModels'
import axios from 'axios'
import { handleError } from './ErrorService'
import { LetterDataModel } from '../models/LetterModels'

const baseApiUrl = 'http://localhost:8888/api/xchangemail'

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
    const response = await axios.get<LetterDataModel[]>(
      `${baseApiUrl}/uid=${userId}/inbox`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const sentApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterDataModel[]>(
      `${baseApiUrl}/uid=${userId}/sent`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const letterApi = async (letterId: string) => {
  try {
    const response = await axios.get<LetterDataModel>(
      `${baseApiUrl}/letter=${letterId}`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { composeApi, inboxApi, sentApi, letterApi }

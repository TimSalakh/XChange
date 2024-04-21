import { ComposeFormInputs } from '../models/FormInputsModels'
import axios from 'axios'
import { handleError } from './ErrorService'
import { LetterDataModel } from '../models/LetterModels'

const baseApiUrl = 'http://localhost:8888/api/mail'

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
      `${baseApiUrl}/user-id/${userId}/inbox`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const sentApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterDataModel[]>(
      `${baseApiUrl}/user-id/${userId}/sent`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const spamApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterDataModel[]>(
      `${baseApiUrl}/user-id/${userId}/spam`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const binApi = async (userId: string) => {
  try {
    const response = await axios.get<LetterDataModel[]>(
      `${baseApiUrl}/user-id/${userId}/bin`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const letterApi = async (letterId: string) => {
  try {
    const response = await axios.get<LetterDataModel>(
      `${baseApiUrl}/letter/${letterId}`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const changeIsReadApi = async (letterId: string) => {
  try {
    await axios.put(`${baseApiUrl}/letter/${letterId}/change-is-read`)
  } catch (error) {
    handleError(error)
  }
}

const changeIsDeletedByReceiverApi = async (letterId: string) => {
  try {
    await axios.put(
      `${baseApiUrl}/letter/${letterId}/change-is-deleted-by-receiver`
    )
  } catch (error) {
    handleError(error)
  }
}

const changeIsDeletedBySenderApi = async (letterId: string) => {
  try {
    await axios.put(
      `${baseApiUrl}/letter/${letterId}/change-is-deleted-by-sender`
    )
  } catch (error) {
    handleError(error)
  }
}

const addToSpamApi = async (receiverId: string, senderId: string) => {
  try {
    await axios.post(`${baseApiUrl}/add-to-spam`, {
      receiverId: receiverId,
      senderId: senderId
    })
  } catch (error) {
    handleError(error)
  }
}

const removeFromSpamApi = async (receiverId: string, senderId: string) => {
  try {
    await axios.post(`${baseApiUrl}/remove-from-spam`, {
      receiverId: receiverId,
      senderId: senderId
    })
  } catch (error) {
    handleError(error)
  }
}

export {
  composeApi,
  inboxApi,
  sentApi,
  binApi,
  spamApi,
  letterApi,
  changeIsReadApi,
  changeIsDeletedByReceiverApi,
  changeIsDeletedBySenderApi,
  addToSpamApi,
  removeFromSpamApi
}

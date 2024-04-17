import axios from 'axios'
import { handleError } from './ErrorService'
import { UserDataModel } from '../models/UserModels'

const baseApiUrl = 'http://localhost:8888/api/user-service'

const doesUserExistApi = async (email: string) => {
  try {
    var response = await axios.get(
      `${baseApiUrl}/user-exist/user-email=${email}`
    )
    return response.status === 200
  } catch (error) {
    handleError(error)
  }
}

const userDataApi = async (id: string) => {
  try {
    const response = await axios.get<UserDataModel>(
      `${baseApiUrl}/user-data/user-id=${id}`
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { doesUserExistApi, userDataApi }

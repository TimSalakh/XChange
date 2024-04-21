import axios from 'axios'
import { LoginFormInputs, RegisterFormInputs } from '../models/FormInputsModels'
import { handleError } from './ErrorService'
import { UserToStoreModel, UserDataModel } from '../models/UserModels'
import { AxiosResponse } from 'axios'

const baseApiUrl = 'http://localhost:8888/api/account'

const loginApi = async (
  inputs: LoginFormInputs
): Promise<AxiosResponse<UserToStoreModel, any> | undefined> => {
  try {
    const response = await axios.post<UserToStoreModel>(
      `${baseApiUrl}/login`,
      inputs,
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

const registerApi = async (inputs: RegisterFormInputs) => {
  try {
    const response = await axios.post<UserToStoreModel>(
      `${baseApiUrl}/register`,
      inputs,
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

const doesAccountExistApi = async (email: string) => {
  try {
    var response = await axios.get(`${baseApiUrl}/${email}/account-exist`)
    return response.status === 200
  } catch (error) {
    handleError(error)
  }
}

const accountDataApi = async (id: string) => {
  try {
    const response = await axios.get<UserDataModel>(`${baseApiUrl}/${id}/data`)
    return response
  } catch (error) {
    handleError(error)
  }
}

export { registerApi, loginApi, doesAccountExistApi, accountDataApi }

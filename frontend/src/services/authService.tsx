import axios from 'axios'
import { LoginFormInputs, RegisterFormInputs } from '../models/FormInputsModels'
import { handleError } from './ErrorService'
import { UserAuthResponse } from '../models/UserModels'

const baseApiUrl = 'https://localhost:8888/api/auth'

const loginApi = async (inputs: LoginFormInputs) => {
  try {
    const response = await axios.post<UserAuthResponse>(
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
    const response = await axios.post<UserAuthResponse>(
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

export { registerApi, loginApi }

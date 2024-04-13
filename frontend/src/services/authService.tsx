import axios from 'axios'
import { LoginFormInputs, RegisterFormInputs } from '../models/FormInputsModels'
import { handleError } from './ErrorService'
import { UserAuthResponse } from '../models/UserModels'

const apiUrl = 'https://localhost:8888/api/auth'

const loginApi = async (props: LoginFormInputs) => {
  try {
    const response = await axios.post<UserAuthResponse>(
      `${apiUrl}/login`,
      props,
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

const registerApi = async (props: RegisterFormInputs) => {
  try {
    const response = await axios.post<UserAuthResponse>(
      `${apiUrl}/register`,
      props,
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

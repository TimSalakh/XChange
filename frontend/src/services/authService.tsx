import axios from 'axios'
import { LoginFormInput, RegisterFormInput } from '../models/formInputs'
import { handleError } from './errorService'
import { UserContextToken } from '../models/user'

const apiUrl = 'https://localhost:8888/api/user'

const loginApi = async (props: LoginFormInput) => {
  try {
    const response = await axios.post<UserContextToken>(
      `${apiUrl}/login`,
      props
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

const registerApi = async (props: RegisterFormInput) => {
  try {
    const response = await axios.post<UserContextToken>(
      `${apiUrl}/register`,
      props
    )
    return response
  } catch (error) {
    handleError(error)
  }
}

export { registerApi, loginApi }

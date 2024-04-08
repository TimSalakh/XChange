import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { LoginModel, RegisterModel } from './Models'

const userApiUrl: string = 'https://localhost:8888/api/user'

const register = async (props: RegisterModel) => {
  try {
    const response = await axios.post(`${userApiUrl}/register`, props)
    const token: string = response.data
    const payload: any = jwtDecode(token)
    console.log(payload)
    localStorage.setItem('token', token)
    localStorage.setItem('userEmail', payload.email)
    localStorage.setItem('userId', payload.unique_name)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

const login = async (props: LoginModel) => {
  try {
    const response = await axios.post(`${userApiUrl}/login`, props)
    const token: string = response.data
    const payload: any = jwtDecode(token)
    console.log(payload)
    localStorage.setItem('token', token)
    localStorage.setItem('userEmail', payload.email)
    localStorage.setItem('userId', payload.unique_name)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export { register, login }

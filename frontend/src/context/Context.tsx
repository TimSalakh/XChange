import { UserAuthResponseModel, UserToStoreModel } from '../models/UserModels'
import { LoginFormInputs, RegisterFormInputs } from '../models/FormInputsModels'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/AuthService'
import { toast } from 'react-toastify'
import React from 'react'
import axios, { AxiosResponse } from 'axios'

type UserContextType = {
  user: UserToStoreModel | null
  token: string | null
  registerUser: (inputs: RegisterFormInputs) => void
  loginUser: (inputs: LoginFormInputs) => void
  logout: () => void
  isLoggedIn: () => boolean
}

type Props = {
  children: React.ReactNode
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserToStoreModel | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    }
    setIsLoaded(true)
  }, [])

  const loginUser = async (inputs: LoginFormInputs) => {
    await loginApi(inputs)
      .then((response) => {
        if (response?.status === 200) {
          handleResponse(response)
        }
      })
      .catch((error) => toast.warning(error))
  }

  const registerUser = async (inputs: RegisterFormInputs) => {
    await registerApi(inputs)
      .then((response) => {
        if (response?.status === 200) {
          handleResponse(response)
        }
      })
      .catch((error) => toast.warning(error))
  }

  const handleResponse = (
    response: AxiosResponse<UserAuthResponseModel, any>
  ): void => {
    localStorage.setItem('token', response.data.token)
    const userObject = {
      id: response.data.id,
      email: response.data.email
    }
    localStorage.setItem('user', JSON.stringify(userObject))
    setToken(response.data.token)
    setUser(userObject)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + response.data.token
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    toast.success('Success.')
    navigate(`/${response.data.id}/inbox`)
  }

  const isLoggedIn = () => {
    return !!token
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken('')
    navigate('/login')
  }

  return (
    <UserContext.Provider
      value={{ loginUser, registerUser, user, token, isLoggedIn, logout }}
    >
      {isLoaded ? children : null}
    </UserContext.Provider>
  )
}

export const useAuth = () => React.useContext(UserContext)

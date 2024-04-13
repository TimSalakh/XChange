import { UserToStore } from '../models/UserModels'
import { LoginFormInputs, RegisterFormInputs } from '../models/FormInputsModels'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/AuthService'
import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'

type UserContextType = {
  user: UserToStore | null
  token: string | null
  registerUser: (props: RegisterFormInputs) => void
  loginUser: (props: LoginFormInputs) => void
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
  const [user, setUser] = useState<UserToStore | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    }
    setIsReady(true)
  }, [])

  const loginUser = async (props: LoginFormInputs) => {
    await loginApi(props)
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem('token', response?.data.token)
          const userObject = {
            id: response?.data.id,
            email: response?.data.email
          }
          localStorage.setItem('user', JSON.stringify(userObject))
          setToken(response.data.token)
          setUser(userObject)
          toast.success('Login success.')
          navigate(`/${response.data.id}/inbox`)
        }
      })
      .catch((e) => toast.warning('Server error occured.'))
  }

  const registerUser = async (props: RegisterFormInputs) => {
    await registerApi(props)
      .then((response) => {
        if (response) {
          localStorage.setItem('token', response?.data.token)
          const userObject = {
            id: response?.data.id,
            email: response?.data.email
          }
          localStorage.setItem('user', JSON.stringify(userObject))
          setToken(response?.data.token)
          setUser(userObject)
          toast.success('Register success.')
          navigate(`/${response.data.id}/inbox`)
        }
      })
      .catch((e) => toast.warning('Server error occured.'))
  }

  const isLoggedIn = () => {
    return !!user
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
      {isReady ? children : null}
    </UserContext.Provider>
  )
}

export const useAuth = () => React.useContext(UserContext)

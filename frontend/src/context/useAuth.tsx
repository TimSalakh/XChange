import { UserProfile } from '../models/user'
import { LoginFormInput, RegisterFormInput } from '../models/formInputs'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/authService'
import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'

interface UserContextType {
  user: UserProfile | null
  token: string | null
  registerUser: (props: RegisterFormInput) => void
  loginUser: (props: LoginFormInput) => void
  logout: () => void
  isLoggedIn: () => boolean
}

interface Props {
  children: React.ReactNode
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (user && token) {
      setUser(JSON.parse(user))
      setToken(token)
      axios.defaults.headers.common['Authorization'] = 'Bearer' + token
    }
    setIsReady(true)
  }, [])

  const loginUser = async (props: LoginFormInput) => {
    await loginApi(props)
      .then((response) => {
        console.log(response)

        if (response) {
          localStorage.setItem('token', response?.data.token)
          const userObject = {
            id: response?.data.name,
            email: response?.data.email
          }
          localStorage.setItem('user', JSON.stringify(userObject))
          setToken(response?.data.token)
          setUser(userObject)
          toast.success('Login success.')
          /* navigate('/inbox') */
        }
      })
      .catch((e) => toast.warning('Server error occured.'))
  }

  const registerUser = async (props: RegisterFormInput) => {
    await registerApi(props)
      .then((response) => {
        if (response) {
          localStorage.setItem('token', response?.data.token)
          const userObject = {
            id: response?.data.name,
            email: response?.data.email
          }
          localStorage.setItem('user', JSON.stringify(userObject))
          setToken(response?.data.token)
          setUser(userObject)
          toast.success('Login success.')
          /* navigate('/inbox') */
          /* navigate('/login') */
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

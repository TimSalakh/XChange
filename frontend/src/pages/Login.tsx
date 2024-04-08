import { Link } from 'react-router-dom'
import { login } from '../services/Auth'
import { LoginModel } from '../services/Models'
import { useState, FormEvent, ChangeEvent } from 'react'

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginModel>({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(loginForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label>
        Email
        <input
          type='text'
          name='email'
          value={loginForm.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password
        <input
          type='password'
          name='password'
          value={loginForm.password}
          onChange={handleInputChange}
        />
      </label>
      <button type='submit'>Login</button>
      <Link to='/register'>Not a member? register</Link>
    </form>
  )
}

export default Login

import { LoginFormInput } from '../models/formInputs'
import * as Yup from 'yup'
import { useAuth } from '../context/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validation = Yup.object().shape({
  email: Yup.string().required('Email is required.'),
  password: Yup.string().required('Password is required.')
})

const LoginPage = () => {
  const { loginUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({ resolver: yupResolver(validation) })

  const handleLogin = (form: LoginFormInput) => {
    loginUser(form)
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label htmlFor='email'>
        Email
        <input type='text' {...register('email')} />
      </label>
      {errors.email ? <p>{errors.email.message}</p> : ''}
      <label htmlFor='password'>
        Password
        <input type='password' {...register('password')} />
      </label>
      {errors.password ? <p>{errors.password.message}</p> : ''}
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginPage

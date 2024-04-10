import { LoginFormInputs } from '../models/FormInputsModels'
import * as Yup from 'yup'
import { useAuth } from '../context/Context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'

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
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) })

  const handleLogin = (form: LoginFormInputs) => {
    loginUser(form)
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-1/3 p-10 rounded-lg ring-1 ring-gray-200 shadow-xl'>
        <div>
          <h1 className='text-3xl font-bold mb-5'>Login form</h1>
        </div>
        <form className='flex flex-col' onSubmit={handleSubmit(handleLogin)}>
          <input
            className='placeholder-gray-400 text-xl h-10 my-3 p-2 pb-3 focus:outline-none border-b-2 border-gray-200 focus:border-gray-500'
            placeholder='Enter your email here'
            {...register('email')}
          />
          {errors.email ? (
            <p className='font-bold text-red-600'>{errors.email.message}</p>
          ) : (
            ''
          )}
          <input
            className='placeholder-gray-400 text-xl h-10 my-3 p-2 pb-3 focus:outline-none border-b-2 border-gray-200 focus:border-gray-500'
            type='password'
            placeholder='Enter your password here'
            {...register('password')}
          />
          {errors.password ? (
            <p className='font-bold text-red-600'>{errors.password.message}</p>
          ) : (
            ''
          )}
          <div className='flex flex-row justify-between items-center mt-5'>
            <button
              type='submit'
              className='bg-black rounded-lg h-12 tracking-wide text-white px-7 text-lg font-medium hover:bg-gray-800 transition duration-200 ease-in-out'
            >
              Login
            </button>
            <div className='flex flex-row justify-between items-center'>
              <p className='text-lg'>Not a member?</p>
              <Link
                className='tracking-wide text-lg ml-1 underline text-blue-800'
                to='/register'
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

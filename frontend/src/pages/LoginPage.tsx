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
    <div className='flex flex-col justify-center items-center h-screen bg-slate-50'>
      <div>
        <h1 className='text-3xl font-bold mb-5'>
          {' '}
          Welcome to{' '}
          <span className='text-purple-900 font-black italic mr-1'>X</span>
          <span className='tracking-tighter'>Change</span>
        </h1>
      </div>
      <div className='w-1/3 p-10 rounded-lg ring-1 ring-gray-200 shadow-xl bg-white'>
        <div>
          <h1 className='text-2xl font-bold mb-5'>Please login</h1>
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
              className='bg-purple-900 rounded-lg h-10 tracking-tight text-white px-6 text-lg font-bold hover:bg-purple-700 transition duration-200 ease-in-out'
            >
              Login
            </button>
            <div className='flex flex-row justify-between items-center'>
              <p className='text-lg tracking-tight'>Not a member?</p>
              <Link
                className='tracking-tight font-bold text-lg ml-1 underline text-blue-800'
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

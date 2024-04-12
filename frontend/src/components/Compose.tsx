import { ComposeFormInputs } from '../models/FormInputsModels'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { composeApi } from '../services/MailService'
import { useNavigate } from 'react-router-dom'

const validation = Yup.object().shape({
  receiver: Yup.string().required('Receiver email is required.'),
  subject: Yup.string().required('Subject is required.'),
  body: Yup.string().required('Body is required.')
})

const Compose = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ComposeFormInputs>({ resolver: yupResolver(validation) })

  const handleCompose = (form: ComposeFormInputs) => {
    composeApi(form)
    navigate('/mail-dashboard/inbox')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCompose)}
        className='flex flex-col p-2'
      >
        <div className='flex flex-row p-2'>
          <label className='text-xl mr-5'>Receiver</label>
          <input
            className='border-2 border-gray-400 text-xl p-1'
            placeholder='Enter receiver email here'
            {...register('receiver')}
          ></input>
          {errors.receiver ? (
            <p className='font-bold text-red-600'>{errors.receiver.message}</p>
          ) : (
            ''
          )}
        </div>
        <div className='flex flex-row p-2'>
          <label className='text-xl mr-5'>Subject</label>
          <input
            className='border-2 border-gray-400 text-xl p-1'
            placeholder='Enter a subject'
            {...register('subject')}
          ></input>
          {errors.subject ? (
            <p className='font-bold text-red-600'>{errors.subject.message}</p>
          ) : (
            ''
          )}
        </div>
        <div className='flex flex-row p-2'>
          <label className='text-xl mr-5'>Body</label>
          <input
            className='border-2 border-gray-400 text-xl p-1'
            placeholder='Enter body here'
            {...register('body')}
          ></input>
          {errors.body ? (
            <p className='font-bold text-red-600'>{errors.body.message}</p>
          ) : (
            ''
          )}
        </div>
        <button type='submit' className='bg-blue-500 font-bold text-xl p-1'>
          Send
        </button>
      </form>
    </div>
  )
}

export default Compose

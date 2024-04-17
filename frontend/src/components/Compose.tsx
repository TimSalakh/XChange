import { ComposeFormInputs } from '../models/FormInputsModels'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { composeApi } from '../services/MailService'
import { doesUserExistApi } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { toast } from 'react-toastify'
import { VscSend } from 'react-icons/vsc'

const validation = Yup.object().shape({
  receiver: Yup.string().required("Receiver's email is required"),
  subject: Yup.string().required('Subject is required.'),
  body: Yup.string().required('Body is required.')
})

const Compose = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ComposeFormInputs>({ resolver: yupResolver(validation) })

  const handleCompose = async (form: ComposeFormInputs) => {
    const response = await doesUserExistApi(form.receiver)
    if (!response) {
      toast.warning("Incorrect receiver's email. User doesn't exist.")
      return
    }
    await composeApi(form, user!.id)
    toast.success('Letter sent.')
    navigate(`/${user!.id}/inbox`)
  }

  return (
    <form
      onSubmit={handleSubmit(handleCompose)}
      className='flex flex-col rounded-lg bg-white border border-slate-200 py-2 px-3 shadow'
    >
      <div className='mb-1 flex flex-row'>
        <input
          className='w-72 border-b-2 border-b-gray-400 text-xl p-1    focus:outline-transparent'
          placeholder="Receiver's email"
          {...register('receiver')}
        />
        {errors.receiver ? (
          <p className='font-bold text-red-600 mx-5'>
            {errors.receiver.message}
          </p>
        ) : (
          ''
        )}
      </div>
      <div className='mb-10 flex flex-row'>
        <input
          className='w-72 border-b-2 border-b-gray-400 text-xl p-1 focus:outline-transparent'
          placeholder='Subject'
          {...register('subject')}
        />
        {errors.subject ? (
          <p className='font-bold text-red-600 mx-5'>
            {errors.subject.message}
          </p>
        ) : (
          ''
        )}
      </div>
      <div className='mb-3'>
        <textarea
          className='w-full h-64 text-xl p-1 focus:outline-transparent resize-none'
          placeholder='Type here..'
          {...register('body')}
        />
        {errors.body ? (
          <p className='font-bold text-red-600'>{errors.body.message}</p>
        ) : (
          ''
        )}
      </div>
      <button
        type='submit'
        className='text-center text-gray-500 border-2 border-gray-400 rounded-md h-8 w-24 tracking-tight text-lg font-bold hover:bg-slate-200 transition duration-100 ease-in-out'
      >
        <div className='flex flex-row justify-center items-center'>
          <span className='mr-2'>Send</span>
          <VscSend size={20} />
        </div>
      </button>
    </form>
  )
}

export default Compose

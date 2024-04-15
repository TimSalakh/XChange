import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Context'
import { userDataApi } from '../services/UserService'
import { useEffect, useState } from 'react'
import { UserDataModel } from '../models/UserModels'
import { handleError } from '../services/ErrorService'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ManageAccountFormInputs } from '../models/FormInputsModels'

const validation = Yup.object().shape({
  name: Yup.string().required('Email is required.'),
  surname: Yup.string().required('Password is required.'),
  country: Yup.string().nullable(),
  city: Yup.string().nullable(),
  bio: Yup.string().nullable()
})

const ManageAccountPage = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserDataModel | null>(null)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  /* const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ManageAccountFormInputs>({ resolver: yupResolver(validation)  }) */

  const handleLogin = (form: ManageAccountFormInputs) => {
    //loginUser(form)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userDataApi(user!.id)
        if (response && response.data) {
          setUserData(response.data)
        }
      } catch (error) {
        handleError(error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div>
      <button onClick={() => navigate(`/${user?.id}/inbox`)}>Back</button>
      <form>
        <div>
          <label>Name:</label>
          {/* {isEditing ? <input></input>} */}
        </div>
      </form>
    </div>
  )
}

export default ManageAccountPage

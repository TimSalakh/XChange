import axios from 'axios'
import { toast } from 'react-toastify'

export const handleError = (errorObject: any) => {
  if (!axios.isAxiosError(errorObject)) {
    toast.warning(errorObject)
  }
  let errors = errorObject.response
  if (Array.isArray(errors?.data.errors)) {
    for (let v of errors?.data.errors) {
      toast.warning(v.description)
    }
  } else if (typeof errors?.data.errors === 'object') {
    for (let e in errors?.data.errors) {
      toast.warning(errors.data.errors[e][0])
    }
  } else if (errors?.data) {
    toast.warning(errors.data)
  } else if (errors?.status === 401) {
    toast.warning('Please login')
    window.history.pushState({}, 'LoginPage', '/login')
  } else {
    toast.warning(errors?.data)
  }
}

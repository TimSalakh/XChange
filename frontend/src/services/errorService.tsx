import axios from 'axios'
import { toast } from 'react-toastify'

export const handleError = (error: any) => {
  if (!axios.isAxiosError(error)) {
    return
  }

  let errorContent = error.response
  if (Array.isArray(errorContent?.data.errors)) {
    for (let v of errorContent?.data.errors) {
      toast.warning(v.description)
    }
  } else if (typeof errorContent?.data.errors === 'object') {
    for (let e in errorContent?.data.errors) {
      toast.warning(errorContent.data.errors[e][0])
    }
  } else if (errorContent?.data) {
    toast.warning(errorContent.data)
  } else if (errorContent?.status === 401) {
    toast.warning('Please login')
    window.history.pushState({}, 'LoginPage', '/login')
  } else {
    toast.warning(errorContent?.data)
  }
}

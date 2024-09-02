import { useToast } from 'vue-toastification'

// interface ApiResponse<T> {
//   data: T;
//   error_code: number;
//   error_message: string;
// }

const toast = useToast()

export const successInterceptor = response => {
  if (response.data.error_code === 0) {
    response.data = response.data.data
    return response
  } else {
    toast.error(response.data.error_message)
    response.data = response.data.data

    return Promise.reject(response)
  }
}

export const errorInterceptor = error => {
  if (!error.response) toast.error("Перевірте інтернет з'єднання")
  else if (error.response.status === 500) toast.error('Щось пішло не так, спробуйте пізніше!')
  else toast.error(error.data.error_message)

  error.response.data = error.response.data.data

  return Promise.reject(error)
}

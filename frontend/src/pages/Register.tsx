import { Link } from 'react-router-dom'
import { register } from '../services/Auth'
import { RegisterModel } from '../services/Models'
import { useState, FormEvent, ChangeEvent } from 'react'

const Register = () => {
  const [registerForm, setRegisterForm] = useState<RegisterModel>({
    name: '',
    surname: '',
    age: 0,
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRegisterForm({
      ...registerForm,
      [name]: value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register(registerForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label>
        Name
        <input
          type='text'
          name='name'
          value={registerForm.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Surname
        <input
          type='text'
          name='surname'
          value={registerForm.surname}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Age
        <input
          type='text'
          name='age'
          value={registerForm.age}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Email
        <input
          type='text'
          name='email'
          value={registerForm.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Password
        <input
          type='password'
          name='password'
          value={registerForm.password}
          onChange={handleInputChange}
        />
      </label>
      <button type='submit'>Register</button>
      <Link to='/login'>login</Link>
    </form>
  )
}

export default Register

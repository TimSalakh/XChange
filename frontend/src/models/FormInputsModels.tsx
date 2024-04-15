export type LoginFormInputs = {
  email: string
  password: string
}

export type RegisterFormInputs = {
  name: string
  surname: string
  email: string
  password: string
}

export type ComposeFormInputs = {
  receiver: string
  subject: string
  body: string
}

export type ManageAccountFormInputs = {
  name: string
  surname: string
  country: string | null
  city: string | null
  bio: string | null
}

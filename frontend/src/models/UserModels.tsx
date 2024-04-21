export type UserToStoreModel = {
  token: string
  id: string
  email: string
}

export type UserDataModel = {
  email: string
  name: string
  surname: string
  country: string | null
  city: string | null
  bio: string | null
}

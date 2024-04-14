export type UserAuthResponseModel = {
  token: string
  id: string
  email: string
}

export type UserToStoreModel = {
  id: string
  email: string
}

export type UserDataModel = {
  id: string
  email: string
  fullName: string
  country: string
  city: string
  bio: string
  creationDate: string
}

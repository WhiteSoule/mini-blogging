export interface User{
  email:string,
  token:string,
  username:string,
  bio:string,
  image:string
}

export interface RegistrationParameters{
  username: string,
  email:string,
  password:string
}

export interface LoginParameters{
  email:string,
  password:string
}

export interface AuthResponse{
  user :User
}
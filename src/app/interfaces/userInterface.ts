export interface UserResponse{
  email:string,
  token:string,
  username:string,
  bio:string,
  image:string
}

export interface User{
  username:string,
  bio:string,
  image:string,
  following:boolean
}

export interface UserUpdate{
  email?:string|null,
  username?:string|null,
  password?:string|null,
  bio?:string|null,
  image?:string|null
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
  user :UserResponse
}
export interface IFormSignUp {
  firstName: string
  lastName: string
  username: string
  password1: string
  password2: string
}

export interface IFormSignUpError {
  nonFieldErrors?: string[]
  firstName?: string[]
  lastName?: string[]
  username?: string[]
  password1?: string[]
  password2?: string[]
}
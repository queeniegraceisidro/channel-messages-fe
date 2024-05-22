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

export interface IFormLogin {
  username: string
  password: string
}

export interface IFormChannel {
  channelName: string
}

export interface IFormJoinChannel {
  inviteCode: string
}

export interface IFormChannelError {
  nonFieldErrors?: string[]
  channelName?: string[]
}
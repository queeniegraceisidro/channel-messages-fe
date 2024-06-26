/**
 * Contains all the interfaces for the API responses
 */


export interface IBaseAPIModel {
  id: number
}

export interface ApiDataResponseModel<T> {
  success: boolean
  code: number
  error: string | null
  response?: T
}

export interface IPagedAPIViewModel<T> {
  previous: string | null
  next: string | null
  count: number
  current_page_number: number
  total_pages: number
  results: T[]
}

export interface IErrorResponseModel {
  detail?: string
  error?: string
  data?: any
}

export interface IChannelModel extends IBaseAPIModel {
  name: string
  invite_code: string
  created_at: string
  updated_at?: string
  deleted_at?: string
}

export interface IUserModel extends IBaseAPIModel {
  name: string
  username: string
  first_name: string
  last_name: string
}

export interface IUserWithAccessTokenModel extends IBaseAPIModel {
  access: string
  refresh: string
  user: IUserModel
}

export interface ILogoutResponseModel {
  detail: string
}

export interface IUserChannelModel extends IBaseAPIModel {
  channel: IChannelModel
}

export interface IMessageModel extends IBaseAPIModel {
  channel: number
  sender: IUserModel
  message: string
  created_at?: string
}
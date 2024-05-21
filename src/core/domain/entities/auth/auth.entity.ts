import { IUser } from "../user/user.entity";

export interface IAuthState {
  user: IUser | null
}
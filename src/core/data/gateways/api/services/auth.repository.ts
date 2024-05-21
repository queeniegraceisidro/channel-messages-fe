import { IAuthState } from "../../../../domain/entities/auth/auth.entity"
import { setUser } from "../../../../presentation/presenters/store/reducers/auth.reducer"
import { store } from "../../../../presentation/presenters/store/store"

export default class AuthRepository {
  setUser(user: IAuthState) {
    store.dispatch(setUser(user))
  }
}
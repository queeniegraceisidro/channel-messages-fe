import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../../domain/entities/user/user.entity";


interface IAuthState {
  user: IUser | null
}

const initialState: IAuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthState>) {
      state.user = action.payload.user
    },
    clearUser(state) {
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  clearUser,
} = authSlice.actions
export default authSlice.reducer
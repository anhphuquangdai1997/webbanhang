import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interface/User";


const initialState: UserState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
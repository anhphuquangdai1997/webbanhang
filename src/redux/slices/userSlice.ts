import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../interface/User";


const initialState: UserState = {
    user: null,
    token: null,
    loading: false,
    isAuthenticated: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            state.isAuthenticated = true;
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.token = null;
        },
        loadUserFromStorage: (state) => {
            const user = localStorage.getItem('user')
            const token = localStorage.getItem('token');
            if (user && token) {
                state.user = JSON.parse(user);
                state.token = token;
                state.isAuthenticated = true;
            }
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../interface/User";


const initialState: UserState = {
  user:null,
  users:[],
  loading: false,
  isAuthenticated: false,
  error: null,
  deleteLoading: false,
  deleteSuccess: false,
  updateLoading: false,
  updateSuccess: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    getAllUsersRequest(state) {
      state.loading = false;
      state.error = null;
    },
    getAllUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail(state, action:PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    //delete user
    deleteUserRequest(state){
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },
    deleteUserFail(state, action: PayloadAction<string>) {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.error = action.payload;
    },
    clearDeleteStatus(state) {
      state.deleteSuccess = false;
    },
    // update user
    updateUserRequest(state) {
      state.updateLoading = true;
      state.error = null;
    },
    updateUserSuccess(state) {
      state.updateLoading = false;
      state.updateSuccess = true;
    },
    updateUserFail(state, action: PayloadAction<string>) {
      state.updateLoading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },
    clearUpdateStatus(state) {
      state.updateSuccess = false;
    },
    //update user profile
    updateProfileRequest(state){
      state.loading=true;
      state.error=null
    },
    updateProfileSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateProfileFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;

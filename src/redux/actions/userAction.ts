import { userActions } from "../slices/userSlice"
import { AppDispatch } from "../store";
import axiosClient from "../../utils/axiosClient";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.loginRequest());

    const { data } = await axiosClient.post(
      "/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Login success:", data);
    dispatch(userActions.loginSuccess(data.user));
  } catch (error: any) {
    dispatch(userActions.loginFail(error.response?.data?.message || "Đăng nhập thất bại"));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axiosClient.get("/logout");
    dispatch(userActions.logout());
  } catch (error) {
    dispatch(userActions.logout());
  }
};


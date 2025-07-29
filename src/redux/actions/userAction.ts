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

// get All Users
export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.getAllUsersRequest());
    const { data } = await axiosClient.get("/admin/users");
    dispatch(userActions.getAllUsersSuccess(data.users));
  } catch (error: any) {
    dispatch(userActions.getAllUsersFail(error.response?.data?.message || "Lấy danh sách người dùng thất bại"));
  }
}

// get User Details
export const getUserDetails = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.getAllUsersRequest());
    const { data } = await axiosClient.get(`/admin/user/${id}`);
    dispatch(userActions.loginSuccess(data.user));
  } catch (error: any) {
    dispatch(userActions.loginFail(error.response?.data?.message || "Lấy thông tin người dùng thất bại"));
  }
}

//Register User
export const registerUser = (formData: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.loginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axiosClient.post("/register", formData, config);
    dispatch(userActions.loginSuccess(data.user));
  } catch (error: any) {
    dispatch(userActions.loginFail(error.response?.data?.message || "Đăng ký thất bại"));
  }
};

// Delete User
export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.deleteUserRequest());

    await axiosClient.delete(`/admin/user/${id}`);

    dispatch(userActions.deleteUserSuccess());

    // Sau khi xóa, fetch lại danh sách users
    const { data } = await axiosClient.get("/admin/users");
    dispatch(userActions.getAllUsersSuccess(data.users));

  } catch (error: any) {
    dispatch(userActions.deleteUserFail(error.response?.data?.message || "Xóa user thất bại"));
  }
};
// update User
export const updateUser = (id: string, userData: { name: string; email: string; role: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.updateUserRequest());

    await axiosClient.put(`/admin/user/${id}`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(userActions.updateUserSuccess());

    // Có thể fetch lại danh sách users nếu muốn
    const { data } = await axiosClient.get("/admin/users");
    dispatch(userActions.getAllUsersSuccess(data.users));

  } catch (error: any) {
    dispatch(userActions.updateUserFail(error.response?.data?.message || "Cập nhật user thất bại"));
  }
};
//update Profile
export const updateProfile = (profileData: { name: string; email: string; avatar?: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userActions.updateProfileRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClient.put("/me/update", profileData, config);
    dispatch(userActions.updateProfileSuccess(data.user))
  } catch (error:any) {
    dispatch(userActions.updateProfileFail(error.response?.data?.message || "Cập nhật thông tin cá nhân thất bại"));

  }
}
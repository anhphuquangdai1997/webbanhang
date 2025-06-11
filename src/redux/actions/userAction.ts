import axios from "axios"
import { userActions } from "../slices/userSlice"
import { AppDispatch } from "../store";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userActions.loginRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(
            `https://backend-fullstack-kbiq.onrender.com/api/v1/login`,
            { email, password },
            config
        );
        console.log("Đăng nhập thành công:", data);
        console.log("User data:", data.user);

        // Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        dispatch(userActions.loginSuccess({
            user: data.user,
            token: data.token
        }));
    } catch (error: any) {
        dispatch(userActions.loginFail(
            error.response?.data?.message || "Đăng nhập thất bại"
        ));
    }
};

export const logout =()=>async (dispatch:AppDispatch)=>{
    try {
        await axios.get(`https://backend-fullstack-kbiq.onrender.com/api/v1/logout`,{withCredentials:true})
        localStorage.removeItem('user')
        localStorage.removeItem('token');
        dispatch(userActions.logout());
        console.log("Đăng xuất thành công");
    } catch (error:any) {
        console.error("Đăng xuất thất bại:", error.response?.data?.message || "Lỗi không xác định");
        localStorage.removeItem('user')
        localStorage.removeItem('token');
        dispatch(userActions.logout());
    }
}
export const loadUserFromStorage = () => (dispatch: AppDispatch) => {
    dispatch(userActions.loadUserFromStorage());
};




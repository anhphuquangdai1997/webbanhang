import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRouter = () => {
    const {isAuthenticated,loading} =useAppSelector((state) => state.user);
    if(loading){
        return <div>loading...</div>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />

}
export default ProtectedRouter;
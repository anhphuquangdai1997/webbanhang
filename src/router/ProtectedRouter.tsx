import { Navigate, Outlet,useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRouter = () => {
    const {isAuthenticated,loading} =useAppSelector((state) => state.user);
    const location = useLocation();
    if(loading){
        return <div>loading...</div>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} replace />

}
export default ProtectedRouter;
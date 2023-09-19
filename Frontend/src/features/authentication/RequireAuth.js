import { Navigate, Outlet, useLocation } from "react-router-dom";
import UseAuth from "./UseAuth"

const RequireAuth = () => {
    const { auth } = UseAuth();
    const location = useLocation();
    const allowedRoles = ["Employee", "Team Leader", "Project Manager"];
    
    return (
        allowedRoles?.includes(auth.role_name)
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace />
    );
}

export default RequireAuth;
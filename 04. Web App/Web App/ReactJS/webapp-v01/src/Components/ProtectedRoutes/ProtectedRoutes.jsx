import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(isLogged, allowNavigate) {
    console.log(`isLogged: ${isLogged}  allowNav: ${allowNavigate}`);

    return (isLogged===true && allowNavigate === true) ? <Outlet/> : <Navigate to="/"/>;
}

export default ProtectedRoute;
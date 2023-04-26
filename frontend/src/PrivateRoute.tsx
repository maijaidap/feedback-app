import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();

    const [isAuthenticated] = React.useState(
        localStorage.getItem("isAuthenticated") ?? ""
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;

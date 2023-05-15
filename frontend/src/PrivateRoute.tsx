import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    // Get the current location using the `useLocation` hook from react-router-dom
    let location = useLocation();

    // Check if the user is authenticated by retrieving the value from local storage
    const [isAuthenticated] = React.useState(
        localStorage.getItem("isAuthenticated") ?? ""
    );

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If the user is authenticated, render the children components
    return children;
};

export default PrivateRoute;

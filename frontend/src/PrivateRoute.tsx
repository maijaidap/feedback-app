import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROLE } from "./roles";

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<ROLE>;
}) => {
  let location = useLocation();

  const [isAuthenticated] = React.useState(
    localStorage.getItem("isAuthenticated") ?? ""
  );

  const [userRole] = React.useState(localStorage.getItem("role") ?? "");

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  let userHasRole = false;
  roles.forEach((role) => {
    if (userRole === role) {
      userHasRole = true;
    }
  });

  if (!userHasRole) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
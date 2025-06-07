import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateValue } from "../../components/Dataprovider/DataProvider";

const ProtectedRoute = ({ children, redirectTo = "/signup", message }) => {
  const [{ user }] = useStateValue();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location, alert: message || "Please sign in first." }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;

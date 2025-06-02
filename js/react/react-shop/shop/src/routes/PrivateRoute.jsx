import React from 'react'

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({permissionLevel}) => {
  const user = "admin";//TODO-추후 변경
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ redirectPath = "/login" }) => {
  const {
    user: { user },
  } = useAppContext();
  console.log("private", user.isAuth);
  user.isAuth=true

  if (!user.isAuth) return <Navigate to={redirectPath} />;
  return <Outlet />;
};

export default PrivateRoutes;

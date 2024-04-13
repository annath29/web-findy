import React from 'react'
import { useAppContext } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = (redirectPath="/") => {
  const {user:{user}} = useAppContext();
  console.log("public",user)
  if (user.isAuth) return <Navigate to={redirectPath}/> 
  return <Outlet/>;
}

export default PublicRoutes

import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {userInfo} = useSelector((state) => state.auth);
    
  return (
      userInfo ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("User Info in AdminRoute:", userInfo);

  
  return  userInfo && userInfo.name==='Admin' ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRoute

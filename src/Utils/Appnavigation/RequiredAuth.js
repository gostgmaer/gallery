import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const RequiredAuth = ({children}) => {
    const location = useLocation()
  const  auth =useAuth()

  if (!auth.currentUser) {
    return (
       <Navigate to={'/login'} state={{path:location.pathname}} />
      )
  }
  return children
 
}

export default RequiredAuth
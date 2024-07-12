import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function PrivertRouteToSignin({isLogged}) {
  return (
    isLogged === 'true' ? <Outlet/> : <Navigate to="/signin" />
  )
}

export function PrivertRouteToHome({isLogged}) {
  return (
    isLogged !== 'true' ? <Outlet/> : <Navigate to="/home" />
  )
}

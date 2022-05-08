import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <>
            {user && user.role === 'admin' ?
                <Outlet />
                :
                <Navigate to='/' />
            }
        </>
    )
}

export default ProtectedRoute
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/User/Home'
import UserProfile from '../Pages/User/UserProfile'
import Users from '../Pages/User/Users'
import Notification from '../Pages/User/Notification'

// user routes
const UserRoutes = ({ role }) => {
    return (
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/profile' exact element={<UserProfile />} />
            <Route path='/notification' element={<Notification />} />
          
            <Route path='/users' element={ role ==='manager'? <Users/> : <Navigate to='/'/>} />
            
        </Routes>
    )
}

export default UserRoutes;
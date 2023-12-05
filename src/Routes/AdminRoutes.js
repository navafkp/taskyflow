import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminHome from '../Pages/Admin/Home';
import Users from '../Pages/Admin/Users';

// admin routes
const AdminRoutes = () => {
    return(
    <Routes>
        <Route path='/' element={<AdminHome/>} />
        <Route path='/user' element={<Users/>} />
    </Routes>
    )
}
export default AdminRoutes;
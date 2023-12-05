import React from 'react'
import {useDispatch} from 'react-redux'
import { Alogout } from '../../Store/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
// getting icon for hoem page from react icon
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoNotificationsCircleOutline, IoLogOutOutline } from "react-icons/io5";


const AdminHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // while logging out, clear the state and redirect to login page
    const logoutAdmin = async (e) => {
        dispatch(Alogout());
        navigate('/admin-login')
    }

  return (
    <div>
        <div className='flex'>
        <div className='bg-admin-bg h-screen pt-8 w-60'>
        <div className='text-app-blue p-3 font-extrabold'>
          TASKYFLOW
          </div>
          <div className='flex flex-col'>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/admin'><MdDashboard />Dashboard</NavLink>
            </div>
            
            <div >
              <NavLink className='flex p-3 items-center gap-2' to=' ' ><IoNotificationsCircleOutline />Notification</NavLink>
            </div>
            
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/admin/user' ><FaUser />User</NavLink>
            </div>
            <div >
              <span className='flex p-3 items-center gap-2'><IoLogOutOutline /> <button onClick={logoutAdmin}> Logout</button></span>  
            </div>
          </div>
        </div>
      </div>
        
    </div>
  )
}

export default AdminHeader
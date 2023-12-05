import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Logout } from '../../Store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../Store/userdataSlice';
// getting icon for hoem page from react icon
import { FaUser } from "react-icons/fa";
import { MdDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNotificationsCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { BsCameraVideoFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { CgMenuRound } from "react-icons/cg";

const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // while loging out, cleared user data from state and redirect logging page
  const logoutUser = () => {
    dispatch(clearUser())
    dispatch(Logout())
    navigate('/login')
  }

  return (

    <div className={`flex ${showNav&&'md:w-[100vw]  md:h-[100vh] md:bg-black/50 md:z-50 md:absolute'}`}>

      {/* Desktop */}
      <div className=' md:hidden'>
        <div className='bg-app-bg h-screen pt-8 w-60 md:absolute md:z-10'>
          <div className='text-app-blue p-2 text-center text-2xl font-extrabold'>
            TASKYFLOW
          </div>
          <div className='flex flex-col text-white my-menu'>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/'><MdDashboard />Dashboard</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/board' ><MdOutlineSpaceDashboard />Board</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/notification' ><IoNotificationsCircleOutline />Notification</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/meet' ><BsCameraVideoFill />Meet</NavLink>
            </div>

            {userData?.role === 'manager' && (<div>
              <NavLink className='flex p-3 items-center gap-2' to='/users'>
                <FaUser />Users
              </NavLink>
            </div>)}

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/profile'  ><FaUser />Profile</NavLink>
            </div>
            <div >
              <span className='flex p-3 items-center gap-2' ><IoLogOutOutline /> <button onClick={logoutUser}> Logout</button></span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className='hidden md:block'>
        <button onClick={()=>setShowNav(!showNav)} className='absolute right-3 top-2' ><CgMenuRound className='text-white' size={30}/></button>
        {showNav&&
          <div className='bg-app-bg h-screen pt-8 w-60 md:absolute md:z-10'>
          <div className='text-app-blue p-3 font-extrabold'>
            TASKYFLOW
          </div>
          <div className='flex flex-col my-menu'>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/'><MdDashboard />Dashboard</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/board' ><MdOutlineSpaceDashboard />Board</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/notification' ><IoNotificationsCircleOutline />Notification</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/meet' ><BsCameraVideoFill />Meet</NavLink>
            </div>

            {userData?.role === 'manager' && (<div>
              <NavLink className='flex p-3 items-center gap-2' to='/users'>
                <FaUser />Users
              </NavLink>
            </div>)}

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/profile'  ><FaUser />Profile</NavLink>
            </div>
            <div >
              <span className='flex p-3 items-center gap-2' ><IoLogOutOutline /> <button onClick={logoutUser}> Logout</button></span>
            </div>
          </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Header
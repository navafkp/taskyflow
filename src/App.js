import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import AdminLogin from './Pages/Admin/Login';
import PrivateRoutes from './Routes/PrivateRoutes';
import { userDetail } from './Store/userdataSlice';
import { useEffect, useState } from 'react';
import GetAccessToken from './utils/getAccessToken';
import Loading from './Components/loading';


function App() {
  const dispatch = useDispatch()
  const { access, is_authenticated, type } = useSelector(state => state.usertoken)
  const userData = useSelector(state => state.userData)
  const loading = useSelector(state => state.loading)

  // getting refresh token if accedd about to expire
  GetAccessToken()
  // getting user details if access ot if any change in access
  useEffect(() => {
    if (access && type === 'user') {

      dispatch(userDetail(access));

    }

  }, [access])


  return (
    <div className="App bg-gray-900 h-screen">
    
        <Router>
          <Routes>

            {/* private routes */}
            <Route path='/*' element={<PrivateRoutes is_authenticated={is_authenticated} isValidUser={type === 'user'} redirect='/login' children={<UserRoutes role={userData?.role} />} />} />
            <Route path='/admin/*' element={<PrivateRoutes is_authenticated isValidUser={type === 'admin'} redirect='/admin-login' children={<AdminRoutes />} />} />

            {/* Public Routes */}
            <Route path='/login' element={!is_authenticated ? <Login /> : <Navigate to='/' />} />
            <Route path='/register' element={!is_authenticated ? <Register /> : <Navigate to='/' />} />
            <Route path='/admin-login' element={!is_authenticated ? <AdminLogin /> : <Navigate to='/admin' />} />
          </Routes>
        </Router>
      

    </div>
  );
}
export default App;

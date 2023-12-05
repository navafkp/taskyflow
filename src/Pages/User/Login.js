import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginSchema } from '../../utils/loginValidation'
import { ValidationError } from 'yup'
import { loginUser } from '../../Store/authSlice'
import { setLoading } from '../../Store/loadingSlice'
import Loading from '../../Components/loading'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userData = useSelector(state => state.usertoken)
    const load = useSelector(state=>state.loading)

    console.log(load)
    // user login function
    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            password: password
        };
        if (email && password) {
            try {
                await loginSchema.validate(formData);
                dispatch(setLoading(true))
                const response = await dispatch(loginUser({ email, password }));
                dispatch(setLoading(false))
                if (response.payload.error === 'Authentication Failed') {
                    setError('Unauthorized Access');
                    
                } else {
                 
                    setError('');
                    navigate('/');
                }
            } catch (error) {
                setError(error.message)
            }
        }else{
            setError("Please enter all details")
        }
    };

    return (
        <div style={{ backgroundColor: '#B7A3F7' }}>
            <div className="h-screen flex flex-col items-center justify-center">
                <div>
                    <h1 className='text-[#FFFFFF] m-8 font-extrabold text-4xl'>TASKYFLOW</h1>
                </div>
                <p className="rounded-lg text-[#5bba39] text-2xl font-bold py-2 px-4 ">{userData.registerSuccess ? userData.registerSuccess : ''}</p>
               
               
                <form className=" bg-black/30 shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-4/12 md:w-8/12 lg:w-6/12  sm:w-11/12 relative overflow-hidden">
                    {load && <Loading/> }
                    <div className="mb-4">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-8" id="email" type="text" placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder='password' />
                    </div>
                    <div className="w-full ">
                        <button onClick={handleLogin} className="bg-[#4483F7] rounded-lg text-white font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline " type="button" >
                            Sign In
                        </button>
                    </div>
                    <p className='text-[#952e2e]'>{error}</p>
                    <p>{userData.authFailed ? userData.authFailed : ''}</p>
                    <p>Forgot Password?</p>
                </form>
                <p>Not yet member? <Link className='text-green-600 font-bold' to='/register'>Register here</Link></p>
                <p className="text-center text-black-500 text-xs">
                    &copy;2023 TaskyFlow. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Login
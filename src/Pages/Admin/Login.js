import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../Store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../utils/validateEmail';
import { isPasswordValid } from '../../utils/passwordValidator';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { access, authFailed } = useSelector(state => state.usertoken)

    // if access token, redirect to admin home page
    useEffect(() => {
        if (access) {
            navigate('/admin')
        }
    })

    // admin login function
    const handleAdminLogin = () => {
        // validating email using email validation function
        const response = validateEmail(email)

        if (!email || !password) {
            setError('Please Fill All Details')
        } else if (!response) {
            setError('Enter a valid email ID')
        } else {
            // validating password length using the component
            const isPasswordValidResult = isPasswordValid(password)
            if (isPasswordValidResult) {
                dispatch(adminLogin({ email, password }))
                    .then((response) => {
                        if (response.payload.error === 'Unauthorized Access') {
                            setError('Unauthorized Access')
                        } else {
                            setError('')
                            navigate('/admin')
                        }
                    }).catch((error) => {
                        setError('Network error, please try again')

                    })
            } else {
                setError("password should be minimum 4 number")
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#AEB6BF' }}>
            <div className="h-screen flex flex-col items-center justify-center">
                <div>
                    <h1 className=' m-8 font-serif  font-extrabold text-4xl'>Hello Admin, welcome</h1>
                </div>
                <form className=" bg-black/30 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/12">
                    <div className="mb-4">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-8" id="email" type="text" placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder='password' />
                        {/* <p>erorr shows here</p> */}
                    </div>
                    <div className="w-full ">
                        <button onClick={handleAdminLogin} className="bg-[#4483F7] rounded-lg text-white font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline " type="button" >
                            Sign In
                        </button>
                    </div>
                    <p className='text-[#952e2e]'>{error}</p>
                    <p>{authFailed ? authFailed : ''}</p>
                    <p>Forgot Password?</p>
                </form>
                <p className="text-center text-black-500 text-xs">
                    &copy;2023 TaskyFlow. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default AdminLogin
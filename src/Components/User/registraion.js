import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../../Server/User/userRegister'
import { Success } from '../../Store/authSlice'
import { useNavigate } from 'react-router-dom'
import { userSchema } from '../../utils/registerValidation'
import { ValidationError } from 'yup'
const Registraion = ({ closeModal }) => {
    const userData = useSelector(state=>state.userData)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [designation, setDesignation] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
 
    const handleRole = (e) => {
        setRole(e.target.value)
    }

 
    const handleRegistrationSubmit = async (e) => {

        e.preventDefault();
        const formData = {
         name:name,
         email:email,
         username:username,
         designation:designation,
         role:role,
         workspace:userData?.workspace,
         password:password,
         password2:password2,
        } 
        console.log(formData)
        
   
 
        if (name && email && username && role && designation && userData?.workspace && password && password2){             try {
                 await userSchema.validate(formData)
                 const registrationResponse = await userRegister(name, username, email, userData?.workspace, password, password2, role, designation)
                 console.log(registrationResponse, '000000')
                 if (registrationResponse.message === 'Your Account Registered Successfully') {
                     dispatch(Success(registrationResponse))
                     navigate('/login')
                 }else if(registrationResponse === 'Email already exists'){
                     setError('Email already exists')
                 }else if(registrationResponse === 'Username already exists'){
                     setError('Username already exists')
                 }else{
                     setError('Registration Failed, please check all details and try again')
                 }
                 
             } catch (error) {
                 console.log(error, 'why')
     
     
                 if (error instanceof ValidationError) {
                
                     setError(error.message)
                     
                 } else {
                     setError('Something went wrong, please try again');
                 }
                 
             }
         }else{
             setError("Please fill all details")
         }




        
    }









    

    return (
        <div>
            <div className='modal'>
                <div className='overlay'>
                    <div className='modal-content '>
                        <button className='bg-black text-right ml-auto text-white py-1 px-1 block rounded' onClick={closeModal}> X</button>
                        <form className=" capitalize shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
                            <p className='uppercase'>Register new user</p>

                            <div className="mb-2">
                                <input value={name} onChange={(e) => setName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="name" type="text" placeholder="name" />
                            </div>
                            <div className="mb-2">
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="username" type="text" placeholder="username" />
                            </div>
                            <div className="mb-2">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="email" type="email" placeholder="email" required />
                            </div>

                            <div className="mb-2">
                                <input value={designation} onChange={(e) => setDesignation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" id="designation" type="text" placeholder="designation" required />
                            </div>


                            <div className="my-4 flex ">
                                <h3 className='font-bold round p-2'>Workspace: </h3>
                                <p className='p-2 text-white font-medium rounded-sm'>{userData?.workspace}</p>
                               
                            </div>


                            <div className="mb-2 pb-2">
                                <p>Choose the Role of user</p>

                                <input id="member" name="role" type="radio" value="member"
                                    checked={role === 'member'}
                                    onChange={handleRole}
                                />
                                <label className='pr-4 text-white' >Member</label>

                                <input id='manager' name="role" type='radio' value="manager"
                                    checked={role === 'manager'}
                                    onChange={handleRole}
                                />
                                <label className=' text-white' >Manager</label>
                            </div>



                            <div className="mb-2">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mt-2" id="password" type="password" placeholder='password' />
                            </div>


                            <div className="mb-2">
                                <input value={password2} onChange={(e) => setPassword2(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mt-2" id="password2" type="password" placeholder='Confirm Password' />
                            </div>
                            <div className="mb-2">
                                <p className='text-[#952e2e]'></p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button onClick={handleRegistrationSubmit}className="bg-app-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button" >
                                    Regsiter
                                </button>
                            </div>
                            <p className='text-[#da4646]'>{error}</p>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registraion
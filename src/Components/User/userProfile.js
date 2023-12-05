import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = ({ user_id, closeModal }) => {

    const users = useSelector(state => state.users)

    const result = users.find(({ id }) => {
        return id === user_id
    })

    return (
        <div className='absolute top-16 right-44  bg-app-bg rounded-2xl w-[60%]'>


          

            <div className='p-7  capitalize w-full'>
            <button className='bg-app-green rounded-lg px-2 py-1 text-white block ml-auto' onClick={closeModal}>X</button>
                <div>
                    <h1 className='text-2xl text-app-blue font-semibold text-left border-b mb-5 pb-3 border-gray-500'>{result?.name}</h1>
                </div>
                <div className='flex bg-app-pink container mx-auto box-border py-8 max-h-max w-[80%] px-10 rounded-lg '>
                    <div className=' w-9/12 capitalize'>
                      
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Username:</h3>
                            <p>{result?.username}</p>
                        </div>
                        <div className='flex space-x-3   p-2'>
                            <h3 className=' font-semibold'>email:</h3>

                            <p>{result?.email}</p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Role:</h3>
                            <p>{result?.role} </p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Joined On:</h3>
                            <p>{new Date(result?.date_joined).toLocaleString()} </p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                           <p>{result?.designation}</p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Workspace:</h3>
                            <p>{result?.workspace} </p>
                        </div>
                        {/* <button className='bg-app-green text-black font-bold w-full my-5 rounded p-2'  >Save Changes</button><br></br> */}
                        <p className='text-green-600'> </p>
                    </div>



                </div>
                
            </div>
        </div>
               
    )
}

export default UserProfile
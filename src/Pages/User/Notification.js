import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification } from '../../Store/notificationSlice'
import Loading from '../../Components/loading'
import { setLoading } from '../../Store/loadingSlice'

const Notification = () => {
    const access = useSelector(state => state.usertoken.access)
    const workspace = useSelector(state => state.userData.workspace)
    const dispatch = useDispatch()
    const allNotifications = useSelector(state => state.notification)
    const [result, setResult] = useState([])
    const load = useSelector(state=>state.loading)
    


    useEffect(() => {
        const fetchNotification = () => {

            if(allNotifications.length === 0){
                dispatch(setLoading(true))
                dispatch(getNotification({ access, workspace })).then((response)=>{
                    dispatch(setLoading(false))
                })
            }
           
        }
        fetchNotification();
        setResult(allNotifications)
    }, [allNotifications])


    return (
        <div className='flex'>

            <Header />


            <div className='p-7 w-full '>

                <div>
                    <h1 className='text-app-blue font-bold text-left text-2xl mb-3 pb-3 border-b border-gray-500'> Notification</h1>
                </div>

                <div className='bg-app-pink mt-10 p-5 rounded-lg'>
        {load && <Loading/>}
                    {result.length !== 0 && 
                    result.map((notification)=>{
                        return (<div  className='  border p-3 mb-3 bg-white flex flex-row  justify-around rounded-md text-justify'>
                        <p>{notification.content}</p>
                        <p className='pt-4'>{new Date(notification.created_at).toLocaleString()}</p>
                    </div>)
                    })}

                </div>
            </div>


        </div >
    )
}

export default Notification
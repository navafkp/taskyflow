import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Store/loadingSlice'
import { getNotification } from '../../Store/notificationSlice'
import Loading from '../loading'

const Broadcast = () => {
  const access = useSelector(state => state.usertoken.access)
  const workspace = useSelector(state => state.userData.workspace)
  const dispatch = useDispatch()
  const allNotifications = useSelector(state => state.notification)
  const [result, setResult] = useState([])
  const load = useSelector(state => state.loading)

  // getting all notifications
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        dispatch(setLoading(true));
        console.log("-----")
        await dispatch(getNotification({ access, workspace }));
        dispatch(setLoading(false));
      } catch (error) {
        // Handle error if needed
        dispatch(setLoading(false));
      }
    };
    fetchNotification();
  }, [dispatch, access, workspace]);

  // if any notification in redux, update the data to state
  useEffect(() => {
    if (allNotifications) {
      setResult(allNotifications);
    }
  }, [allNotifications]);

console.log(result, ']]]]]]]]]]]]]]]')
    return (
        <>
        
            {load && <Loading />}
          {result.length > 0 &&
            result.map((notification) => {
                console.log("sdsdsdsd")
              return (
                <div
                  className='bg-[#FFFFFF]  border p-3 mb-3 flex flex-row  justify-around rounded-md text-justify'
                >
                  <p className='font-bold text-black'>
                    {notification.content}
                  </p>
                  <p className='pt-4 text-black'>
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>)
            })}
           



        </>

    )
}

export default Broadcast
import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { Link } from 'react-router-dom'
import CreateMeeting from '../../Components/Meeting/CreateMeeting'
import { getAllMeeting } from '../../Store/MeetingSlice'
import { useDispatch, useSelector } from 'react-redux'


const Meeting = () => {
  const access = useSelector(state => state.usertoken.access)
  const { workspace } = useSelector(state => state.userData)
  const meetingData = useSelector(state => state.meetingData)
  const [meetingState, setMeetingState] = useState([])
  const dispatch = useDispatch()
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleString();


  console.log(formattedDate, '[][][][][');


  const [showform, setShowform] = useState(false)

  useEffect(() => {
    if (meetingData) {
      setMeetingState(meetingData)
    }
  }, [meetingData])

  useEffect(() => {
    if (access && workspace) {
      console.log("getting")
      dispatch(getAllMeeting({ access, workspace }))
    }
  }, [])

  return (
    <div className='flex'>
      <Header />
      <div className='p-7 w-full bg-[#FFFFFF]'>
        <div>
          <h1 className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3 border-gray-500'>Meeting</h1>
        </div>

        <div className='flex flex-row justify-between mb-5 mt-6'>
          <div className='w-[50%] flex align-middle  px-2 py-4'>
            <div className='w-[60%] h-[80%] rounded-lg items-center bg-[#9C528B] p-4'>
              <button onClick={() => setShowform(true)}
                className='bg-[#D7CDCC] text-sm border  border-black text-center
                 text-black px-3 py-1 rounded'>
                Create meeting
                <span className='font-bold text-lg'>+
                </span>
              </button>
            </div>
          </div>

          <div className='w-[50%]  px-2 py-4'>
            <div className='w-[100%] rounded-lg bg-[#1D1E2C] p-4'>
              <p className='text-white p-2'> Meetings</p>
              {meetingState && meetingState?.length > 0 && meetingState.map((meet) => (
                (
                  <div className='flex justify-around  bg-[#9C528B] p-4 mb-2 rounded-lg'>
                    <div className='block text-white'>
                      <h2>{meet.roomID}</h2>
                      <p>Starts: {new Date(meet.starting_time * 1000).toLocaleString()}</p>
                      <p>Starts: {meet.starting_time}</p>
                      <p>Starts: {new Date(meet.expiration_time * 1000).toLocaleString()}</p>
                    </div>
                    <div className='m-auto'>
                      {new Date(formattedDate) >= new Date(meet.starting_time * 1000)?  (<Link
                          className='bg-[#D7CDCC] px-3 py-1 rounded-lg'
                          to={`/meeting/${meet.roomID}`} key={meet.id}> join now
                        </Link>) : <p className='bg-black px-3 py-1  text-white rounded-lg'>Not yet started</p>
                       
                      }
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
        {showform && <CreateMeeting closeModal={() => setShowform(false)} />}
      </div>
      {/* <ChatComp/> */}
    </div>
  )
}

export default Meeting
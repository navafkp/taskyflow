import React, { useState } from 'react'
import { createMeetAxios } from '../../Server/Meeting/CreateMeet'
import { useDispatch, useSelector } from 'react-redux'
import { updateMeetingData } from '../../Store/MeetingSlice'

const CreateMeeting = ({ closeModal }) => {
    const access = useSelector(state => state.usertoken.access)
    const { workspace, id } = useSelector(state => state.userData)
    const [roomID, setRoomID] = useState()
    const [description, setDescription] = useState()
    const [startingtime, setStartingtime] = useState()
    const [duration, setDuration] = useState()
    const [dateTime, setDateTime] = useState()
    const [error, setError] = useState('')

    const handleStartingTime = (e) => {
        const time = e.target.value + ":00"
        console.log(time)
        setDateTime(time)
        const timestamp = new Date(time).getTime() / 1000;
        setStartingtime(timestamp)
    }

    const dispatch = useDispatch()
    const handleMeetingCreation = (e) => {
        if (roomID && description && startingtime && duration) {
            e.preventDefault()
            createMeetAxios(access, id, workspace, roomID, description, startingtime, duration).then((response) => {
                dispatch(updateMeetingData(response))
                closeModal()
            })
        } else{
            setError('Please fill all details')

        }


    }

    return (
        <div>
            <div className=' absolute !w-[100%]  bg-app-bg rounded-lg'>
                <div className='overlay '>
                    <div className='modal-content '>
                        <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center items-center mt-4 rounded-full' onClick={closeModal}> x</button>
                        <form>
                            <div className="mb-2">
                                <input
                                    required value={roomID} onChange={(e) => setRoomID(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="room name" type="text"
                                    placeholder="room name"
                                />
                            </div>
                            <div className="mb-2">
                                <input required
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="description"
                                    type="text" placeholder="what is all about"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    value={dateTime}
                                    onChange={handleStartingTime}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                    id="datetime"
                                    type="datetime-local"
                                    placeholder="Date and Time"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    value={duration} onChange={(e) => setDuration(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="duration"
                                    type="number" placeholder="duration in minutes"
                                />
                            </div>
                            <button onClick={handleMeetingCreation} className='bg-red-600 text-white rounded px-2 py-1'>CREATE MEETING</button>
                        <p>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting
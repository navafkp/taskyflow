import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { newCardCreate } from '../../Store/cardSlice';
import { useEffect } from 'react';

const CreateCard = ({ closeModal, id }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [maxNum, setMaxNum] = useState(null)
    const [selectedColor, setSelectedColor] = useState()
    const [priority, setPriority] = useState()
    const access = useSelector(state => state.usertoken.access)
    const [emails, setEmails] = React.useState([]);
    const [focused, setFocused] = React.useState(false);
    const users = useSelector(state => state.users)
    const allboard = useSelector(state => state.boards)
    const [boardData, setBoardData] = useState({})
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    // Taking specific boards from all boards and set it to boardData
    useEffect(() => {
        const singleBoard = () => {
            if (allboard) {
                const data = allboard?.find((board) => board.id == id)
                setBoardData(data)
            }
        }
        singleBoard()
    }, [allboard])
   

const maxmemberChange = (e) =>{
    if (e.target.value > '0') {
        setMaxNum(e.target.value)
        
    } else {
        setMaxNum(0)

    }
}


    // creating a new cards based on given details
    const handleCreate = (e) => {
        e.preventDefault()
        if (access && id && title && description && selectedColor && priority) {
            dispatch(newCardCreate({ access, id, title, description, maxNum, emails, selectedColor, priority })).then((res) => {
                closeModal()
            })
        } else {
            setError('Please fill all details required')

        }
    }

    return (
        <div className='absolute top-16 right-44 lg:right-24 xl:right-32 md:h-[80%] md:right-36 sm:right-10 bg-app-bg rounded-lg w-[60%] xl:w-[50%] sm:w-[80%]'>
            <div className='overlay'>
                <div className='modal-content !rounded-lg  !w-[80%]'>
                    <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center items-center mt-4 rounded-full' onClick={closeModal}> x</button>
                    <h3 className=' font-bold text-center'>CREATE CARD</h3>
                    <form className=" px-4 py-4 mb-4 w-full">

                        <div className='mb-3'>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name="name" type='text' placeholder='card title' />
                        </div>
                        <div className='mb-2 '>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name='description' type='text' placeholder='description' />
                        </div>

                        <div className='mb-2'>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" required>
                                <option  className='rounded-lg'>Priority</option>
                                <option value='high' className='rounded-lg'>High</option>
                                <option value='moderate' className='rounded-lg'>Moderate</option>
                                <option value='low' className='rounded-lg'>Low</option>
                            </select>
                        </div>

                        <div className='mb-2 '>
                            <label className='pr-1'>Pick a color</label>
                            <input value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)} className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name='selectedColor' type='color' placeholder='select a color' required/>
                        </div>

                        {boardData && boardData?.visibility === 'public' && (
                            <>
                                <div className='mb-2 '>
                                    <input value={maxNum} onChange={maxmemberChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2" name='maximum member' type='number' placeholder='maximum member' />
                                </div>
                                {/* user input emails for memebers */}
                                <ReactMultiEmail
                                    placeholder="Enter email of assignee's"
                                    emails={emails}
                                    onChange={(_emails) => {
                                        setEmails(_emails);
                                    }}
                                    autoFocus={true}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    getLabel={(email, index, removeEmail) => {
                                        return (
                                            <div data-tag key={index}>
                                                <div data-tag-item>{email}</div>
                                                <span data-tag-handle onClick={() => removeEmail(index)}>
                                                    ×
                                                </span>
                                            </div>
                                        );
                                    }}
                                />
                            </>
                        )}

                        <div className='text-center mt-3'>
                            <button onClick={handleCreate} className=' bg-[#9C528B] text-white w-full rounded-lg m-2 py-1 text-center'>CREATE</button>
                        </div>
                        <p>{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCard
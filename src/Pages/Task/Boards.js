import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import CreateBoard from '../../Components/User/CreateBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoads } from '../../Store/boardSlice';
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';


const Boards = () => {
    const [showForm, setShowForm] = useState(false)
    const access = useSelector(state => state.usertoken.access)
    const { workspace, id } = useSelector(state => state.userData)
    const allboards = useSelector(state => state.boards)
    const dispatch = useDispatch()
    const load = useSelector(state => state.loading)

    // getting all boards data
    useEffect(() => {
        if (access && workspace) {
            dispatch(setLoading(true))
            dispatch(getAllBoads({ access, workspace })).then((res) => {
                dispatch(setLoading(false))
            })
        }
    }, [access, workspace, dispatch])

    return (
        <div className='flex'>
            <Header />
            <div className="p-7 w-full bg-[#FFFFFF] ">
                <div>
                    <h1 className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3 border-gray-500'>MY BOARDS</h1>
                </div>

                <div className='bg-[#1D1E2C] rounded-t-lg flex justify-between p-3 border-b border-black'>
                    <div>
                        <button onClick={() => setShowForm(true)} className='bg-[#D7CDCC] text-sm  text-center text-black px-5 py-1 rounded-lg '>CREATE BOARD<span className='font-bold text-lg'>+</span></button>
                    </div>

                    <div className='relative'>
                        <input className='bg-white  text-sm  text-center text-black px-2 py-1 m-0 rounded ' name='user' type='text' placeholder='search user' />
                        <button className='absolute top-0 right-0 pt-1 '><CiSearch size={'1.5em'} /></button>
                    </div>
                </div>

                <div className='bg-[#b278a5] p-2 '>
                    {load && <Loading />}
                    {allboards?.length > 0 ? allboards?.map((board) => {
                        // Check if the board is public or the current user is the creator
                        const canViewBoard = board.visibility === 'public' || board.user_id === id;
                        // If the user can view the board, render it; otherwise, skip rendering
                        return canViewBoard ? (
                            <Link to={`/boards/${board.slug}+${board.id}`} key={board.id}>
                                <div className='flex m-4 justify-between rounded-md bg-[#FFFFFF] p-4'>
                                    <p className='font-bold'>{board.name}</p>
                                    <div>
                                        <ul className='flex'>
                                            <li className='rounded-full w-[25px] h-[25px] text-center text-sm text-white bg-[#1D1E2C]'>A</li>
                                            <li className='rounded-full w-[25px] h-[25px] text-center text-sm text-white bg-[#59656F]'>M</li>
                                            <li className='rounded-full w-[25px] h-[25px] text-center text-sm text-white bg-[#D7CDCC]'>D</li>
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        ) : null;
                    }) : (
                        <p className='text-center m-3 p-3 uppercase text-white font-semibold'>No boards, go ahead and create boards</p>
                    )}

                    {showForm && <CreateBoard closeModal={() => setShowForm(false)} />}



                </div>
            </div>
        </div>
    )
}

export default Boards
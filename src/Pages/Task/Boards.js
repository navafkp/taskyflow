import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import CreateBoard from '../../Components/User/CreateBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoads, updateBoarddDeletion } from '../../Store/boardSlice';
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';
import { MdDelete } from "react-icons/md";
import { deleteBoard } from '../../Server/User/DeleteBoard';


const Boards = () => {
    const [showForm, setShowForm] = useState(false)
    const access = useSelector(state => state.usertoken.access)
    const { workspace, id } = useSelector(state => state.userData)
    const allboards = useSelector(state => state.boards)
    const dispatch = useDispatch()
    const load = useSelector(state => state.loading)
    const [searchname, setSearchName] = useState(null)
    const [boardData, setBoardData] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        if (allboards) {
            setBoardData(allboards)
        }
    }, [allboards])
    

    // getting all boards data
    useEffect(() => {
        if (access && workspace) {
            dispatch(setLoading(true))
            dispatch(getAllBoads({ access, workspace })).then((res) => {
                dispatch(setLoading(false))
            })
        }
    }, [access, workspace, dispatch])


    // search specific user
    const handleSearch = async () => {
        if (
            searchname !== null && searchname !== ''
        ) {
            const foundBoard = allboards?.filter(
                board => board.name.includes(searchname)
            );
            if (
                foundBoard?.length !== 0
            ) {
                setBoardData(foundBoard);
            } else {
                setBoardData([]);
            }
        } else {
            if (allboards) {
                setBoardData(allboards);
            }

        }
    };
    const handleDeleteBoard = (e, id) => {
        
        if (access) {
            deleteBoard(access, id).then((response) => {
                
                if (response.success === 'Board deleted successfully') {
                 
                    dispatch(updateBoarddDeletion(id))
                    setError('')
                    
                } else if (response.data.detail === 'Unauthorized User')
                    setError('Unauthorized User, relogin and try to delete again')

                else {
                    setError('Something went wrrong, try again')
                }
            }).catch((error) => {
                
                setError('An error occurred while deleting the board');
            });
        }

    }


    return (
        <div className='flex md:h-full'>
            <Header />
            <div className="p-7 w-full bg-[#FFFFFF] ">
                <div>
                    <h1 className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3 border-gray-500'>MY BOARDS</h1>
                </div>



                <div className='bg-[#1D1E2C] md:flex-col md:items-center rounded-t-lg flex justify-between p-3 border-b border-black'>
                    
                    <div>
                        <button onClick={() => setShowForm(true)} className='bg-[#D7CDCC] text-sm  text-center text-black px-5 py-1 rounded-lg '>CREATE BOARD<span className='font-bold text-lg'>+</span></button>
                    </div>

                    <p className='text-white'>{error}</p>

                    <div className='relative'>

                        <input
                            value={searchname} onChange={(e) => setSearchName(e.target.value)}
                            className='bg-[#D7CDCC]  font-bold border border-black  text-center
                         text-black px-2 py-1 m-2 rounded ' name='user' type='text' placeholder='search board'
                        />
                        <button
                            onClick={handleSearch} className='absolute top-2 right-2 pt-1 '>
                            <CiSearch size={'1.5em'} />
                        </button>
                    </div>
                </div>

                <div className='bg-[#b278a5] p-2 '>
                    {load && <Loading />}
                    {boardData?.length > 0 ? boardData?.map((board) => {
                        // Check if the board is public or the current user is the creator
                        const canViewBoard = board.visibility === 'public' || board.user_id === id;
                        // If the user can view the board, render it; otherwise, skip rendering
                        return canViewBoard ? (


                            <div className='flex justify-between m-4 rounded-md bg-[#FFFFFF] p-4'>
                                <Link to={`/boards/${board.slug}+${board.id}`} className='flex w-[100%] justify-between' key={board.id}>


                                    <p className='font-bold'>{board.name}</p>
                                    <p className={`float-right ${board.visibility === 'public' ? 'text-green-400 uppercase font-bold rounded-lg px-2 py-1' : 'text-yellow-400 uppercase font-bold rounded-lg px-2 py-1'}`}>
                                        {board.visibility}
                                    </p>


                                </Link>
                                <div  className='pt-1'>
                                    <button><MdDelete onClick={(e)=>handleDeleteBoard(e, board.id)}  color='red'  /></button>
                                    
                                </div>

                            </div>

                        ) : null;
                    }) : (
                        <p className='text-center m-3 p-3 uppercase text-white font-semibold'>No boards, go ahead and create boards</p>
                    )}

                    {showForm && <CreateBoard closeModal={() => setShowForm(false)} />}



                </div>
            </div>
        </div >
    )
}

export default Boards
import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { CiSearch } from "react-icons/ci";
import './user.css'
import Registraion from '../../Components/User/registraion';
import { useDispatch, useSelector } from 'react-redux';
import { alluserDetails, userBlockUpdate } from '../../Store/userslistSlice'
import UserProfile from '../../Components/User/userProfile';
import { blockUser } from '../../Server/User/blockUser';
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';

const Users = () => {
    const [showform, setShowform] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const access = useSelector(state => state.usertoken.access)
    const userDetail = useSelector(state => state.userData)
    const [userSelected, setUserSelected] = useState('')
    const [searchname, setSearchName] = useState(null)
    const dispatch = useDispatch()
    const userslist = useSelector(state => state.users)
    const workspace = userDetail?.workspace
    const [result, setResult] = useState([])
    const load = useSelector(state => state.loading)

    //    getting all user detail and handling loading
    useEffect(() => {
        const fetchData = async () => {
            if (userDetail && userslist?.length === 0) {
                if (userDetail?.role === 'manager') {
                    dispatch(setLoading(true))
                    dispatch(alluserDetails({ access, workspace })).then((res) => {
                        dispatch(setLoading(false))
                    })
                }
            }
        };
        fetchData();
        if (userslist?.length !== 0) {
            setResult(userslist)
        }
    }, [userslist]);

    console.log()
    // registration modal visibility handle
    const handleForm = () => {
        console.log("asdsd")
        setShowform(true)
    }

    // View user profile modal visibility handle
    const viewProfile = (id) => {
        setShowModal(true)
        setUserSelected(id)
    }

    // user block and activate handle
    const handleAction = (id, e) => {
        const value = e.target.value;
        let abc;
        if (value === 'Active') {
            abc = true;
        } else {
            abc = false;
        }
        blockUser(id, value, access)
            .then((response) => {
                dispatch(userBlockUpdate({ id, value }))
                setResult((prevResult) => {
                    return prevResult.map((user) => {
                        if (user.id === id) {
                            return {
                                ...user,
                                is_active: abc,
                            };
                        }
                        return user;
                    });
                });
            });
    };

    // search specific user
    const handleSearch = async () => {
        if (
            searchname !== null && searchname !== ''
        ) {
            const foundUsers = userslist?.filter(
                user => user.name.includes(searchname)
            );
            if (
                foundUsers?.length !== 0
            ) {
                setResult(foundUsers);
            } else {
                setResult([]);
            }
        } else {
            setResult(userslist);
        }
    };

    return (
        <div className='flex'>
            <Header />
            <div className="p-7 w-full overflow-hidden bg-[#FFFFFF] ">
                <div>
                    <h1 className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3'>
                        USERS LIST
                    </h1>
                </div>
                <div className='flex flex-row justify-between mb-5 mt-6'>
                    <div>
                        <button
                            onClick={handleForm}
                            className='bg-[#D7CDCC] text-sm border border-black text-center text-black 
                        px-3 py-1 rounded '>
                            CREATE USER
                            <span className='font-bold text-lg'>+</span>
                        </button>
                    </div>

                    <div>
                        {/* <select className='bg-app-green font-xs  text-center text-white px-3 py-1 rounded '>
                            <option>Sort</option>
                            <option>Sort by name</option>
                            <option>Sort by role</option>
                        
                        </select> */}
                    </div>

                    <div className='relative'>
                        <input
                            value={searchname} onChange={(e) => setSearchName(e.target.value)}
                            className='bg-[#D7CDCC]  font-bold border border-black  text-center
                         text-black px-2 py-1 m-2 rounded ' name='user' type='text' placeholder='search user'
                        />
                        <button
                            onClick={handleSearch} className='absolute top-2 right-2 pt-1 '>
                            <CiSearch size={'1.5em'} />
                        </button>
                    </div>
                </div>

                {/* data starts here */}
                <div className="py-2 align-middle overflow-x-auto">
                    <div className="shadow  sm:rounded-lg ">
                        {load && <Loading />}
                        <table className="text-sm text-white block border-0 ">
                            <thead className="bg-[#1D1E2C] text-xs uppercase font-medium">
                                <tr>

                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Joining Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">

                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-[#b278a5]">
                                {result?.length !== 0 && (
                                    result?.map((user) => {
                                        return (<tr key={user?.id} className="bg-black bg-opacity-20">
                                            <td className=" px-6 py-4 whitespace-nowrap">
                                                {user?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(user?.date_joined).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className='
                                                    bg-[#D7CDCC] text-center
                                                    text-black font-normal 
                                                    rounded px-2 py-1'
                    
                                                    onClick={() => viewProfile(user?.id)}>
                                                    view
                                                </button>
                                            </td>
                                            <td className="flex px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={user?.is_active ? 'Active' : 'block'}
                                                    onChange={(e) => handleAction(user?.id, e)}
                                                    className={`font-semibold  rounded px-1 py-1 ${user?.is_active ?
                                                        'text-green-300' : 'text-red-800'}`}
                                                >
                                                    <option
                                                        className=' rounded-lg ' value={'Active'}>
                                                        Active
                                                    </option>
                                                    <option
                                                        className=' rounded-lg text-red-800' value={'block'}>
                                                        Block
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>)
                                    })
                                )}

                            </tbody>
                        </table>



                    </div>
                </div>



            </div>


            {showform &&
                <Registraion closeModal={() =>
                    setShowform(false)
                } />
            }


            {showModal && <UserProfile user_id={userSelected} closeModal={() => {
                setShowModal(false)
            }} />}


        </div>
    )
}

export default Users
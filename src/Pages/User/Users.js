import React, { useEffect, useState } from 'react'
import Header from '../../Components/User/header'
import { CiSearch } from "react-icons/ci";
import './user.css'
import Registraion from '../../Components/User/registraion';
import { useDispatch, useSelector } from 'react-redux';
import { alluserDetails } from '../../Store/userslistSlice'
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

    useEffect(() => {

        const fetchData = async () => {
            if (userDetail && userslist.length === 0) {
                if (userDetail.role === 'manager') {
                    dispatch(setLoading(true))
                    dispatch(alluserDetails({ access, workspace })).then((res) => {
                        dispatch(setLoading(false))
                    })
                }
            }
        };
        fetchData();
        setResult(userslist)
    }, [userslist]);



    const handleForm = () => {
        setShowform(true)
    }

    const viewProfile = (id) => {
        setShowModal(true)
        setUserSelected(id)
    }

    const handleAction = (id, e) => {
        const value = e.target.value
        blockUser(id, value, access)
    }

    const handleSearch = async () => {

        if (searchname !== null && searchname !== '') {
            const foundUser = userslist.find((user) => {
                return user.name.toLowerCase() === searchname.toLowerCase()
            })

            if (foundUser) {
                const myList = [foundUser]
                setResult(myList)

            } else {
                setResult(userslist)
            }
        } else {

            setResult(userslist)
        }


    };


    return (
        <div className='flex'>

            <Header />


            <div className="p-7 w-full overflow-hidden">
                <div>
                    <h1 className="text-lg text-gray-400 font-medium">Users list</h1>
                </div>
                <div className='flex flex-row justify-between mb-5 mt-4'>
                    <div>
                        <button onClick={handleForm} className='bg-app-blue font-xs  text-center text-white px-3 py-1 rounded '>CREATE USER<span className='font-bold text-lg'>+</span></button>
                    </div>

                    <div>


                        {/* <select className='bg-app-green font-xs  text-center text-white px-3 py-1 rounded '>
                            <option>Sort</option>
                            <option>Sort by name</option>
                            <option>Sort by role</option>
                        
                        </select> */}
                    </div>

                    <div className='relative'>
                        <input value={searchname} onChange={(e) => setSearchName(e.target.value)} className='bg-app-blue font-xs  text-center text-black px-2 py-2 m-0 rounded ' name='user' type='text' placeholder='search user' />
                        <button onClick={handleSearch} className='absolute top-0 right-0 pt-1 '><CiSearch size={'2.1em'} /></button>
                    </div>
                </div>



                {/* Component Start */}

                {/* {load && <Loading />} */}






                {/* test */}
                <div className="py-2 align-middle overflow-x-auto">
                    <div className="shadow  sm:rounded-lg ">
                        <table className="text-sm text-gray-400 block">
                            <thead className="bg-gray-800 text-xs uppercase font-medium">
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
                            <tbody className="bg-gray-800">
                                {result?.length !== 0 && (

                                    result?.map((user) => {
                                        return (<tr key={user.id} className="bg-black bg-opacity-20">

                                            <td className=" px-6 py-4 whitespace-nowrap"> {user.name} </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(user.date_joined).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className='bg-app-blue text-center text-white font-normal rounded px-3 py-1' onClick={() => viewProfile(user.id)}>
                                                    view
                                                </button>
                                            </td>
                                            <td className="flex px-6 py-4 whitespace-nowrap">
                                                {/* <svg className="w-4 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg> */}

                                                <select onChange={(e) => handleAction(user.id, e)} className=' text-black rounded px-2 py-1 '>

                                                    <option className='bg-app-green ' value={'activate'}>Activate</option>
                                                    <option className='bg-red' value={'block'}>Block</option>
                                                </select>

                                            </td>
                                        </tr>)
                                    }))}

                            </tbody>
                        </table>


                        
                    </div>
                </div>
                {/* stop */}
                {/* Component End */}
                

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
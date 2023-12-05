import React, { useRef, useState } from 'react'
import Header from '../../Components/User/header'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../Store/userdataSlice';
import { changeDetails } from '../../Server/User/userDetail';
import { CgProfile } from "react-icons/cg";
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';

const UserProfile = () => {
    const [popup, setPopup] = useState('')
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userData);
    const { access } = useSelector((state) => state.usertoken);
    const [image, setImage] = useState('')
    const load = useSelector(state => state.loading)

    // initial data for state - DATA
    const initialData = {
        name: userData?.name || '',
        username: userData?.username || '',
        email: userData?.email || '',
        designation: userData?.designation || '',
        image: userData?.profile_image_base64 || '',
    };
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    };

    // Function to handle image upload
    const handleUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // change submit function
    const handleAllChange = () => {
        const requestData = image ? { ...data, 'image': image } : data;
        dispatch(setLoading(true))
        changeDetails(requestData, access)
            .then((response) => {
                console.log("hi")
                dispatch(setLoading(false))
                setPopup(response.message);
                if (response.message === 'user details updated succesfully') {
                    dispatch(updateUser(requestData))
                }
            }).catch((error) => {
                setPopup('update failed')
            })
    }

    return (
        <div className='flex'>

            <Header />

            <div className='p-7 w-full'>
                <div>
                    <h1 className='text-2xl text-app-blue font-semibold text-left border-b mb-5 pb-3 border-gray-500'>User Profile</h1>
                </div>
                <div className='flex lg:flex-col-reverse bg-white mx-auto box-border py-8 max-h-max w-[80%]  px-10 rounded-lg relative'>
                    {load && <Loading />}
                    <div className=' w-9/12 lg:w-full capitalize'>


                        <div className='flex space-x-3   p-2 '>
                            <h3 className=' font-semibold'>Name:</h3>
                            <input className=" bg-app-pink rounded-md w-full border px-3 py-1" value={data?.name} onChange={handleChange} type='text' name='name' />
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Username:</h3>
                            <input className="bg-app-pink rounded-md w-full border px-3 py-1" value={data.username} onChange={handleChange} type='text' name='username' />
                        </div>
                        <div className='flex space-x-3   p-2'>
                            <h3 className=' font-semibold'>email:</h3>

                            <input className=" bg-app-pink rounded-md w-full border px-3 py-1" value={data.email} onChange={handleChange} type='email' name='email' />
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Role:</h3>
                            <p>{userData?.role} </p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Joined On:</h3>
                            <p>{new Date(userData?.date_joined).toLocaleString()} </p>
                        </div>

                        {userData?.role === 'manager' ? (<div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                            <input className=" bg-app-pink rounded-md w-full border px-3 py-1" value={data.designation} onChange={handleChange} type='text' name='designation' />
                        </div>) : (<div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                            <p>{data.designation} </p>
                        </div>)}




                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Workspace:</h3>
                            <p>{userData?.workspace} </p>
                        </div>
                        <button className='bg-app-blue text-black font-bold w-full my-5 rounded p-2' onClick={handleAllChange} >Save Changes</button><br></br>
                        <p className='text-white text-center'> {popup}</p>
                    </div>
                    {/* image */}
                    <div className=' w-3/12 lg:m-auto lg:mb-2'>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}

                                style={{
                                    display: "none"
                                }}
                                ref={imageUploader}

                            />
                            <div
                                className='rounded-full overflow-hidden '
                                style={{
                                    height: "125px",
                                    width: "125px",

                                    borderWidth: '2px',


                                }}
                                onClick={() => imageUploader.current.click()}
                            >
                                {!image && !data?.image ?
                                    <CgProfile style={{ color: '#    ', fontSize: '8em' }} /> :
                                    (<img
                                        ref={uploadedImage}
                                        style={{
                                            width: "100%",
                                            height: "100%",

                                        }}
                                        src={image ? image : data?.image}
                                        alt="Profile"
                                    />)
                                }


                            </div>
                            <p className='text-xs'> Click to upload Image</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
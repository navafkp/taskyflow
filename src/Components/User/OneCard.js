import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactMultiEmail } from 'react-multi-email';
import { removeAssignee } from '../../Server/User/RemoveAssignee';
import { AssigneeInvite, addComment, assigneeUpdate, cardEditableUpdate, getAllComment, updateCardDeleteion } from '../../Store/cardSlice';
import { MdModeEdit } from "react-icons/md";
import { CardDelete } from '../../Server/User/CardDelete';


const OneCard = ({ task, closeModal }) => {
    const access = useSelector(state => state.usertoken?.access)
    const userdata = useSelector(state => state.userData)
    const assigneeList = useSelector(state => state.cardData.assignee)
    const commentList = useSelector(state => state.cardData?.comments)
    const [emails, setEmails] = React.useState([]);
    const [focused, setFocused] = React.useState(false);
    const [error, setError] = useState('')
    const [taskAssignee, setTaskAssignee] = useState('')
    const [title, setTitle] = useState(task?.title)
    const [description, setDescription] = useState(task?.description)
    const [maxMembers, setMaxMembers] = useState(task.max_members)
    const [comment, setComment] = useState('')
    const initialField = { title: false, description: false, max_members: false }
    const [editableFields, setEditableFields] = useState(initialField);
    const dispatch = useDispatch()
    const card_id = task?.id


    
    // collecing assignees data from redux based on the card
    useEffect(() => {
        const asigneeSet = () => {
            const collectAssignee = assigneeList?.filter((assignee) => {
                return task.id === assignee.card
            })
            setTaskAssignee(collectAssignee)
        }
        asigneeSet()
    }, [assigneeList])

    // get all comments
    useEffect(() => {
        dispatch(getAllComment({ access, card_id }))
    }, [])

    // removing assignees and update redux data
    const handleRemoveAssignee = (id) => {
        if (access) {
            removeAssignee(access, id).then((response) => {
                if (response === 'Successfully deleted') {
                    const assigneNewList = assigneeList?.filter((user) => user.id != id)
                    if (assigneNewList) {
                        dispatch(assigneeUpdate(assigneNewList))
                    }
                } else {
                    setError('Something went wrong, try again')
                }
            })
        }
    };

    // deleteing card and update redux
    const handleDelete = (id) => {
        if (access) {
            CardDelete(access, id).then((response) => {
                if (response.success === 'The card has been deleted Succesfully') {
                    dispatch(updateCardDeleteion(id))
                    closeModal()
                } else if (response.data.detail === 'Unauthorized User')
                    setError('Unauthorized User, relogin and try to delete again')
                else {
                    setError('Something went wrrong, try again')
                }
            }).catch((error) => {
                setError('An error occurred while deleting the card');
            });
        }
    }

    // add- comment
    const handleSubmit = (event) => {
        event.preventDefault();
        if (access && userdata?.id && userdata?.name && comment) {
            const user_name = userdata?.name
            const user_id = userdata?.id
            dispatch(addComment({ access, user_id, user_name, comment, card_id })).then((response) => {
                setComment('')
            })
        }
    };

    // comment state  - onchange date update
    const handleChange = (event) => {
        setComment(event.target.value);
    };

    // when edit button clicked, ready only data make it editable 
    const makeEditable = (name) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: true,
        }));
    }

    const handleMaxMemberOnChange = (e) => {
        if (parseInt(e.target.value) < taskAssignee?.length) {
            setError('maximum member cannot go below assignee count')
        }
        else if (e.target.value > '0') {
            setMaxMembers(e.target.value)
            setError('')
        } else {
            setMaxMembers(0)

        }
    }


    // updating data from editable field
    const handleCardUpdate = (e) => {
        setError('')
        e.preventDefault()
        const updatedData = {};
        if (editableFields.title) {
            updatedData.title = title;
        }
        if (editableFields.description) {
            updatedData.description = description;
        }
        if (editableFields.max_members) {

            updatedData.max_members = maxMembers;
        }
        if (updatedData) {
            dispatch(cardEditableUpdate({ access, card_id, updatedData })).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setEditableFields(initialField)

                }
            })
        }
    }


    // invite - not completed
    const handleInviteSubmit = (e) => {
        e.preventDefault()
        const size = maxMembers - taskAssignee?.length
        if (emails?.length > size) {
            setError('assignee exceed the maximum member limit')
        } else {
            setError('')
            dispatch(AssigneeInvite({ access, emails, card_id })).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setEmails([])
                }
            })





        }

    }



    return (
        <div className='absolute !w-[100%]  bg-app-bg rounded-lg'>
            <div className='overlay  flex justify-center'>
                <div className=' h-max !rounded-3xl w-[60%] sm:w-[90%]  bg-[#b278a5] text-center  mt-1 overflow-hidden '>
                    <form>


                        <div className='px-4 pt-3 pb-2 justify-between flex items-center border-b  border-gray-500'>
                            <div className='flex relative'>
                                <input
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`border ${editableFields.title === true ? 'bg-white ' : 'bg-transparent text-white'} border-[#d995ca]   text-center font-normal text-sm uppercase rounded-lg py-2 pr-5`}
                                    readOnly={!editableFields.title}
                                    value={title}
                                />
                                {!editableFields.title && <MdModeEdit className='absolute right-2 m-auto  top-0 bottom-0' onClick={() => makeEditable('title')} />}
                            </div>
                            {Object.values(editableFields).includes(true) && (
                                <button onClick={handleCardUpdate}
                                    className='bg-green-300 rounded-md px-2 py-1 '>
                                    Save Changes
                                </button>
                            )}

                            <button className='bg-[#0c0c0f] text-white w-[20px] h-[20px] flex justify-center  items-center rounded-full' onClick={closeModal}> x</button>
                        </div>
                        {/* bootsrap col */}
                        <div className="grid grid-cols-2 md:grid-cols-1 overflow-y-auto gap-4 rounded-lg px-4 pb-5 pt-4 bg-[#EEF2F5] h-full">
                            <div className=' text-left sm:mb-3'>
                                <div className='flex border border-gray-500 relative py-2'>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        name="description" id="description"
                                        className={`w-full h-[100px]  ${editableFields.description === true ? 'bg-white ' : 'bg-transparent text-black'}   text-sm font-normal capitalize  rounded-lg  border-none  pr-5 pl-2`}
                                        value={description}
                                        readOnly={!editableFields.description}
                                    />
                                    {!editableFields.description && <MdModeEdit color='red' className=' absolute right-4 ' onClick={() => makeEditable('description')} />}
                                </div>

                                {/* comments */}
                                <div className='  mt-5 mb-3'>
                                    <h4 className='text-[#9C528B] mb-2'>Comments</h4>
                                    <div className='w-full max-h-[100px] overflow-y-auto pb-2'>
                                        {commentList?.length > 0 && commentList?.map((one) =>
                                        (<div className='block capitalize text-sm py-1 border-b' key={one.id}>
                                            <p className='text-green-800'>{one.user_name}: </p>
                                            <p className='pl-2 text-gray-500 '>{one.comment}</p>
                                        </div>)
                                        )}
                                    </div>

                                    <form className='justify-center block'>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            className='text-sm font-normal capitalize border p-2 w-full h-[50px] border-[#b278a5] rounded'
                                            rows="4"
                                            cols="50"
                                            value={comment}
                                            onChange={handleChange}
                                        ></textarea>
                                        <input onClick={handleSubmit} type="submit" value="Submit" className='bg-[#D7CDCC] px-6 py-1 rounded-md' />
                                    </form>


                                </div>
                            </div>

                            <div className='bg-[#EEF2F5]'>


                                <div className='  font-normal  rounded-lg  bg-[#EEF2F5] '>
                                    <div className='flex justify-between pb-2'>
                                        <h3 className='text-left text-[#9C528B] font-bold '>Card details</h3>
                                    </div>

                                    <div className='flex pb-2'>
                                        <p className='text-left font-bold '>Date</p>
                                        <p className='ml-2'>{new Date(task.created_at).toLocaleDateString()}</p>
                                    </div>

                                    <div className='flex pb-2'>
                                        <p className='text-left font-bold '>Maximum Members</p>

                                        <div className='flex relative'>
                                            <input type='number'
                                                name='max_members'
                                                onChange={handleMaxMemberOnChange}
                                                className={`border ${editableFields.max_members === true ? 'bg-white ' : 'bg-transparent text-black'}  text-center ml-1 font-normal text-sm uppercase rounded-lg !w-auto`}
                                                readOnly={!editableFields.max_members}
                                                value={maxMembers}
                                            />
                                            {task && task?.column !== "3" && !editableFields.max_members && <MdModeEdit color='red' className=' absolute right-4 m-auto top-0 bottom-0' onClick={() => makeEditable('max_members')} />}

                                        </div>

                                    </div>

                                    <div className='pb-2'>
                                        <p className='text-left font-bold mb-1'>Assignees</p>

                                        {taskAssignee ? (
                                            taskAssignee.map((user, index) => (
                                                <div key={index} className='ml-2 flex mb-2 items-center'>
                                                    <p className='rounded-lg  p-1'> {user.user}</p>
                                                    {task && task?.column !== "3" &&
                                                        <button
                                                            className='bg-[#D7CDCC] text-red-600 text-sm rounded-full font-bold px-0 py-0 h-6 w-6 ml-3 '
                                                            type='button'
                                                            onClick={() => handleRemoveAssignee(user.id)}>
                                                            x
                                                        </button>
                                                    }
                                                </div>
                                            ))
                                        ) : (
                                            'None'
                                        )}
                                        <p className='text-center text-red-600 font-medium'>{error}</p>
                                    </div>

                                    {task && task?.column !== "3" &&
                                        <>
                                            <p className='text-left font-bold mb-2'>Invite New Member</p>
                                            <div className='flex flex-wrap'>
                                                <ReactMultiEmail
                                                    placeholder="Enter email of assignee's"
                                                    className='w-auto'
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
                                                <button
                                                    onClick={handleInviteSubmit}
                                                    className='bg-[#D7CDCC] text-black font-bold rounded-md ml-1 px-3'
                                                >Invite</button>
                                            </div>

                                        </>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <button className='bg-red-400 float-right mr-3 rounded-2xl my-2 px-2 py-1' onClick={() => handleDelete(task.id)}>Delete Card</button>
                    {/* <MdDelete
                        className='float-right'
                        title='Delete card'
                         color='red' size={40}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default OneCard
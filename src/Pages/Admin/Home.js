import React from 'react'
import AdminHeader from '../../Components/Admin/header';

const AdminHome = () => {

  return (
    <div className='flex'>
      <div> <AdminHeader /></div>
      <div className='p-7 w-full'>
        <h1 className='text-3xl font-semibold'>Admin Home Page</h1>
      </div>
    </div>
  )
}

export default AdminHome
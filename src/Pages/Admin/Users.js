import React from 'react'
import AdminHeader from '../../Components/Admin/header'
import './admin.css'

const Users = () => {
  return (
    <div className='flex'>
      <div> <AdminHeader /></div>
      <div className='p-7 w-full'>
        <div>
          <h1 className='text-2xl text-app-blue font-semibold text-left border-b mb-5 pb-3 border-gray-500'>User Details</h1>
        </div>
        <div className='flex bg-app-pink container mx-auto box-border py-8 max-h-max w-[80%] px-10 rounded-lg '>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>JOINED ON</th>
                <th>VIEW</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

            </tbody>
          </table>



        </div>
      </div>
    </div >

  )
}

export default Users
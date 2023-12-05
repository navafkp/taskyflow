import React from 'react'
import Header from '../../Components/User/header'
import { useSelector } from 'react-redux'

const Home = () => {

  
  return (
    <div className='flex'>
      <div>
        <Header />
      </div>
      <div className='p-7 w-full'>
        <h1 className='text-3xl text-white font-semibold'>Home Page</h1>
      </div>
    </div>
  )
}

export default Home
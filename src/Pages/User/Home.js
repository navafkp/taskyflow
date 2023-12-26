import React, { useState } from 'react'
import Header from '../../Components/User/header'
import { Link } from 'react-router-dom'
import Registraion from '../../Components/User/registraion'
import CreateBoard from '../../Components/User/CreateBoard'


const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const [boardForm, setBoardForm] = useState(false)


  return (
    <div className='flex'>

      <Header />

      <div className='p-7 w-full bg-[#FFFFFF]'>

        <div>
          <h1 className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3 border-gray-500'>HOME PAGE</h1>
        </div>

        <div className='flex flex-row justify-between mb-5 mt-6'>
          <div>
            <button onClick={()=>setShowForm(true)} className='bg-[#D7CDCC] text-sm border border-black text-center text-black px-3 py-1 rounded '>CREATE USER<span className='font-bold text-lg'>+</span></button>
          </div>

          <div>
            <Link to='/board'>
            <button className='bg-[#D7CDCC] text-sm border border-black text-center text-black px-3 py-1 rounded '>VIEW BOARDS<span className='font-bold text-lg'>+</span></button>
            </Link>
          </div>



          <div>
            <button onClick={()=>setBoardForm(true)} className='bg-[#D7CDCC] text-sm border border-black text-center text-black px-3 py-1 rounded '>CREATE BOARD<span className='font-bold text-lg'>+</span></button>
          </div>

        </div>

        {showForm && <Registraion closeModal={()=>setShowForm(false)}/>}

        {boardForm && <CreateBoard closeModal={()=>setBoardForm(false)}/>}
      </div>

    </div>
  )
}

export default Home
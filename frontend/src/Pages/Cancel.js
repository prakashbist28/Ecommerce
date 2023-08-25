import React from 'react'
import succ from '../assets/cancelpay.gif'

const Cancel = () => {
  return (
    <div className=' flex items-center justify-center mx-auto pt-20'>
    <div className='flex flex-col items-center justify-center bg-white p-4 w-[300px] md:w-[600px] rounded-lg drop-shadow-lg '>
        <h1 className='flex font-bold text-red-600 md:text-[40px] items-center justify-center mx-auto'>
            Payment Failed
        </h1>
        <img className='w-[100px] md:w-[300px]' src={succ} alt='img'/>
    </div>
    </div>
  )
}

export default Cancel
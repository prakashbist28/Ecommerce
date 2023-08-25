import React, { useState } from 'react'
import {GiKnifeFork} from 'react-icons/gi'

const FilterProduct = ({category,onClick, isActive}) => {

  const [select, setselect] = useState(false)

  const handleSelect = () =>{
    setselect(!select)
  }
  
  return (
    <div className='flex flex-col items-center' onClick={onClick}>
    <div onClick={handleSelect} className={`h-20 w-20 flex justify-center items-center border-2 hover:bg-purple-600/50 border-purple-500 rounded-full cursor-pointer ${isActive? 'bg-purple-600/50' : ''}`}>
    <GiKnifeFork className='text-[30px] hover:scale-110 transition'/>
  </div>
  <p className='font-medium capitalize'>{category}</p>
  </div>
  )
}

export default FilterProduct
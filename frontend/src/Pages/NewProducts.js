import React, { useState } from 'react'
import {BiSolidCloudUpload} from 'react-icons/bi'
import { toast } from 'react-toastify'
import { ImagetoBase64 } from '../Utility/ImagetoBase64'

const NewProducts = () => {
  const [data,setdata] = useState({
    name : "",
    category : "",
    image: "",
    price: "",
    description:"",
  })

  const toastOptions= {
    position:"top-center",
    autoClose:5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

  const handleOnchange = (e) =>{
    const {name, value} = e.target
    setdata((prev)=>{
      return {
        ...prev,
        [name] :value
      }
    })
  }

  const uploadImage = async(e) => {
    const data = await ImagetoBase64(e.target.files[0])
    setdata((prev)=>{
      return{
        ...prev,
        image:data
      }
    })

  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(data)
    const {name, image, category, price, description} = data

    if(name&& image && category && price && description) {
      const fetchData =  await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body:JSON.stringify(data)
      })
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message, toastOptions)

      setdata(()=>{
        return {
        name : "",
        category : "",
        image: "",
        price: "",
        description:"",
        }
      })
    } 
    else {
      toast.error("Fill the required Fields", toastOptions)
    }


  }



  return (
    <div className=''>
      <form className='bg-white border-2 p-4 flex flex-col m-auto w-full max-w-md mt-6 shadow drop-shadow-sm' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} value={data.name} name="name" className='border-2 border-black/20 focus:outline-none focus:border-purple-500 bg-slate-200 p-1 mb-2 rounded-md' onChange={handleOnchange}/>

        <label htmlFor='category' >Category</label>
        <select name="category" value={data.category} className=' bg-slate-200 p-1 rounded-md border-2 border-black/20 focus:outline-none focus:border-purple-500 ' id='category' onChange={handleOnchange}>
          <option> Select Category </option>
          <option> Fruit </option>
          <option> Vegetables </option>
          <option> Beverages </option>
          <option> Grains </option>
          <option> Oil </option>
          <option> Snacks </option>
          <option> Non-veg </option>
        </select>

        <label htmlFor='image' className='mt-2'>Image
        <div className='h-40 flex items-center border-2 border-black/20 justify-center w-full bg-slate-200 cursor-pointer rounded-lg'>
          {
          data.image ? <img src={data.image} alt='img' className='h-full'/> :
            <span className='text-[60px] text-black/40  hover:text-purple-600'>
            <BiSolidCloudUpload />
            </span>
          }
          <input type={'file'} accept="image/*" id='image' className='hidden' onChange={uploadImage} />
        </div>
        </label>

        <label htmlFor='price' className='mt-2'>Price</label>
        <input type={"text"} name='price' value={data.price} className='border-black/20 bg-slate-200 p-1 mb-2 rounded-md border-2 focus:outline-none focus:border-purple-500' onChange={handleOnchange}/>

        <label htmlFor='description' className='mt-2'>Description</label>
        <textarea rows={4} name='description' value={data.description} className='border-black/20 border-2 focus:outline-none focus:border-purple-500  bg-slate-200 resize-none p-1 rounded-md ' onChange={handleOnchange}></textarea>

        <button className='bg-purple-500 text-white rounded-md font-semibold my-4 h-10 hover:bg-purple-700'> Save </button>
      </form>
    </div>
  )
}

export default NewProducts
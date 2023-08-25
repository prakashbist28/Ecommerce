import React,{useEffect, useRef, useState} from 'react'
import delivery from '../assets/deliverybike.png'
import HomeCard from '../components/HomeCard'
import {useSelector} from 'react-redux'
import CardCategory from '../components/CardCategory'
import {GrPrevious, GrNext} from 'react-icons/gr'
import FilterProduct from '../components/FilterProduct'
import ExtraProducts from '../components/ExtraProducts'

const Home = () => {

  const productData = useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(0,4)

  const vegetablesList = productData.filter(el => el.category === "Vegetables",[])

  const loadingArray = new Array(4).fill(null)
  const loadingArrayCategory = new Array(10).fill(null)

  const slideProductRef = useRef()

  const nextProduct = () => {
    slideProductRef.current.scrollLeft +=200
  }

  const prevProduct = () =>{
    slideProductRef.current.scrollLeft -=200
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2 '>
          <div className='flex gap-6 bg-purple-300 rounded-lg px-2 items-center w-[220px]'>
            <p className='text-lg font-mono text-purple-700'>Bike Delivery</p>
            <img src={delivery} className='w-8'/>
          </div>
          <h2 className='text-4xl lg:text-7xl pt-4 py-3'>The Fastest delivery to <span className='font-bold text-purple-500'> Your Home</span></h2>
          <p className='py-3 text-base'> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <button className='bg-purple-500 hover:bg-purple-800 rounded-lg p-2 font-semibold text-white'>Order Now</button>
        </div>
        <div className=' md:w-1/2 pt-8 md:pt-0 flex flex-wrap gap-6 justify-center'>
          {//if one data is available then it displays
            homeProductCartList[0] ? homeProductCartList.map(el =>{
              return(
                <HomeCard
                key={el._id} 
                id={el._id}
                image={el.image} 
                name={el.name}
                price={el.price}
                category={el.category}
                description = {el.description}/>
              )
            }) :
            loadingArray.map((el,index)=>{ //loadingscreen(empty cards)
              return(
                <HomeCard 
                key={index + "loading"}   
                loading={"Loading..."}/>
              )
            })
          }
        </div>
      </div> 

      <div className='pt-12 '>
          <div className=' flex w-full items-center '>
          <h2 className='font-bold text-2xl my-2'> Fresh Vegetables </h2>
          <div className='flex ml-auto gap-4'>
            <button onClick={prevProduct} className=' border-2 border-purple-600 rounded-full hover:bg-purple-500/40 p-2'><GrPrevious /></button>
            <button onClick={nextProduct} className='border-2 border-purple-600 rounded-full hover:bg-purple-500/40 p-2'><GrNext /></button>
          </div>
          </div>

          <div className=' pb-5  flex gap-6 p-4 overflow-scroll scrollbar-none  transition-all scroll-smooth ' ref={slideProductRef}>
            { //loading
              vegetablesList[0] ? vegetablesList.map(el=>{
                return (<CardCategory 
                key={el._id + "vegetables"} 
                id={el._id}
                image={el.image} 
                name={el.name}
                price={el.price}
                category={el.category}
                />
                )
              }) 
              : loadingArrayCategory.map((el,index)=>{
                return(
                  <CardCategory key={index + "Cart Loading"} loading={"Loading..."}/>
                )
              })
            }
          
          </div>
        </div>

        <ExtraProducts />

    </div>
  )
}

export default Home
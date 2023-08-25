import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCategory from "./CardCategory";
import FilterProduct from "./FilterProduct";
import {GiKnifeFork} from 'react-icons/gi'

const ExtraProducts = ({loading}) => {
  const productData = useSelector((state) => state.product.productList);

  const categoryList = [...new Set(productData.map((el) => el.category))];

  //data filter
  const [filterby, setfilterby] = useState("");
  const [datafilter, setDatafilter] = useState(productData);
  const [select, setselect] = useState(false)

  const loadingArrayCategory = new Array(10).fill(null)

  useEffect(() => {
    setDatafilter(productData);
  }, [productData]);

  const handlefilter = (category) => {
    setfilterby(category);
    let filter;

    if (category === "all") 
    {
      filter = [...productData];
    } 
    else {
      filter = productData.filter((el) => el.category === category);
    }
    setDatafilter(() => [...filter]);
  };

  const handleSelect = () =>{
    setselect(!select)
  }

  return (
    <div className="my-5">
      <h1 className="font-bold text-2xl ">Categories  </h1>

      <div className="flex p-2 gap-4 justify-center items-center overflow-scroll scrollbar-none">  
      <div className='flex flex-col items-center' onClick={()=>handlefilter("all")}>
        <div onClick={handleSelect} className='h-20 w-20 flex justify-center items-center border-2 hover:bg-purple-600/50 border-purple-500 rounded-full cursor-pointer'>
          <GiKnifeFork className='text-[30px] hover:scale-110 transition'/>
          </div>
          <p1 className='font-medium capitalize'>All</p1>
        </div>
        {categoryList[0] ?
          categoryList.map((el) => {
            return (
              <FilterProduct 
              category={el} 
              key={el}
              isActive={el === filterby}
              onClick={() => handlefilter(el)} />
            );
          })
          :
          (
            <div className="min-h-[250px] flex justify-center items-center h-full">
              <p className="text-purple-600 font-medium"> loading</p>
            </div>
          )
          }
      </div>

      <div className="my-4 p-4 items-center flex gap-5 flex-wrap justify-center">
        {datafilter[0] ? datafilter.map((el) => {
          return (     
            <CardCategory
              key={el._id + "category"}
              id={el._id}
              price={el.price}
              image={el.image}
              name={el.name}
              category={el.category}
            />
          );
        })
        : loadingArrayCategory.map((el,index)=>{
          return(
            <CardCategory key={index + "All Products"} loading={"Loading..."}/>
          )
        })
        }
      </div>
    </div>
  );
};

export default ExtraProducts;

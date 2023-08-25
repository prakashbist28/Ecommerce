import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ExtraProducts from "../components/ExtraProducts";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.find((el) => el._id === filterby);
  console.log(productDisplay)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClick = () =>{
    dispatch(
      addCartItem(productDisplay) //has id,name...
    )
  }

  const handlebuy = () =>{
    dispatch(
      addCartItem(productDisplay) //has id,name... 
    )
    navigate('/cart')
  }

  return (
    <div className="p-3 md:p-6">
      <div className="w-full max-w-4xl bg-slate-300 m-auto p-3 md:p-4 ">
        {productDisplay ? (
          <div className="flex md:flex-row flex-col  gap-4">
            <div className=" min-w-1/2 min-h-80 shadow-md drop-shadow-md hover:scale-105 transition duration-150 overflow-hidden">
              <img src={productDisplay.image} className=' w-full' />
            </div>

            <div className="md:w-1/2 flex flex-col justify-center gap-2 md:gap-4">
              <h1 className="capitalize font-semibold whitespace-nowrap  text-xl md:text-4xl  overflow-hidden">
                {productDisplay.name}
              </h1>
              <p className="font-semibold text-purple-600 text-lg md:text-4xl">
                ₹ {productDisplay.price}
              </p>
              <p className="text-lg md:text-4xl font-normal"> {productDisplay.category}</p>

              <div className="flex gap-2">
              <button className="w-[100px] md:w-1/2 text-[12px] md:text-xl bg-purple-500 hover:bg-purple-700 text-white font-medium p-1 rounded-lg"
              onClick={handlebuy}>
                Buy
              </button>
              <button className="w-[100px] md:w-1/2 text-[12px] md:text-xl  bg-purple-500 hover:bg-purple-700 text-white font-medium p-1 rounded-lg"
              onClick={handleClick}>
                Add to Cart
              </button>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-medium">
                  Description : 
                </h1>
                <p className=" text-[12px] md:text-lg">
                  {productDisplay.description}
                </p>
              </div>
            
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl flex items-center justify-center h-[340px] md:h-[460px]">
            Loading...
          </div>
        )}
      </div>
      <ExtraProducts />
    </div>
  );
};

export default Menu;

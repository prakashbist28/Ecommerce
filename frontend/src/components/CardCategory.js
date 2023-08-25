import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";

const CardCategory = ({ name, image, category, price, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  
  return (
    <div className=" w-40 min-w-[200px] max-w-[200px] min-h-[380px] max-h-[380px] cursor-pointer flex flex-col bg-white gap-4 shadow-md drop-shadow-md p-2 rounded-lg border-2 border-white hover:border-purple-400 hover:scale-105 transition duration-200">
      {name ? (
        <div className=" flex gap-4 flex-col justify-between">
          <Link
            to={`/Menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="w-40 flex mx-auto items-center justify-center h-[180px]">
              <img src={image} className=" h-full rounded-lg w-full" />
            </div>
            <div className="flex flex-col h-[120px] gap-4">
              <h1 className=" capitalize font-semibold whitespace-nowrap overflow-hidden">
                {name}
              </h1>
              <p className="font-semibold text-purple-600">₹ {price}</p>
              <p> {category}</p>
            </div>
          </Link>

          <button
            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-medium p-1 rounded-lg"
            onClick={handleAddCart}
          >
            Add to Cart
          </button>
        </div>
      ) : (
        <div className="min-h-[250px] flex justify-center items-center h-full">
          <p className="text-purple-600 font-medium"> {loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardCategory;

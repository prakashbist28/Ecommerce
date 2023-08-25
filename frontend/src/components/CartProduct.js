import React from "react";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, key, name, price, category, image, qty, total }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-300 p-2 w-full rounded-sm border border-slate-400/50">
      <div className="bg-white p-3 flex gap-4 h-30">
        <div className="">
          <img src={image} className="h-32 w-40 md:h-40 md:w-48 " />
        </div>

        <div className="w-full flex flex-col justify-center pt-1 gap-1 capitalize overflow-hidden">
          <div className="flex justify-between">
            <h1 className="font-bold text-[14px] md:text-[18px]">{name}</h1>
            <AiFillDelete
              onClick={() => dispatch(deleteCartItem(id))}
              className="cursor-pointer text-[20px] text-red-500 hover:text-red-700"
            />
          </div>

          <h1 className="text-[14px] md:text-[18px]">{category}</h1>
          <h1 className="text-[14px] md:text-[18px]">
            <span className="font-bold text-purple-600 text-[14px] md:text-[18px]">₹</span>
            {price}
          </h1>

          <div className=" flex justify-between gap-1">
            <div className="flex gap-1 bg-slate-200/60 rounded-md p-1">
              <button
                className="flex w-6 items-center justify-center border-2 border-purple-400 hover:bg-purple-300 rounded-sm"
                onClick={() => dispatch(decreaseQty(id))}
              >
                <AiOutlineMinus />
              </button>

              <h1 className="text-[14px] flex items-center gap-2 font-bold md:text-[14px]">{qty}</h1>

              <button
                className="flex items-center border-2 w-6 justify-center border-purple-400 hover:bg-purple-300 rounded-sm"
                onClick={() => dispatch(increaseQty(id))}
              >
                <AiOutlinePlus />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 font-bold text-slate-500">
              <p className="text-[12px] md:text-[14px]">Total</p>
              <p className="text-[12px] md:text-[14px] text-purple-500">
                <span className="font-bold text-purple-600">₹</span>
                {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    productList : [],
    cartItem : []
}

const toastOptions= {
    position:"top-center",
    autoClose:2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setDataProduct : (state,action)=>{
            state.productList = [...action.payload]
        },
        addCartItem : (state, action) =>{
            const check = state.cartItem.some(el=>el._id ===action.payload._id)
            
            if(check){
                toast.error('Item is already present in cart', toastOptions)
            }
            else{
                toast("Item is added to cart", toastOptions)
                const total = action.payload.price
                state.cartItem = [...state.cartItem,{...action.payload, qty:1, total} ]
            }
        },
        deleteCartItem:(state, action) =>{
            toast('Item removed from cart', toastOptions)
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            state.cartItem.splice(index,1)
            
        },
        increaseQty : (state, action)=>{
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty = state.cartItem[index].qty
            const qtyinc = ++qty
            state.cartItem[index].qty = qtyinc;

            const price = state.cartItem[index].price
            const total = price*qtyinc

            state.cartItem[index].total = total

        },
        decreaseQty : (state, action) => {
            const index = state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty = state.cartItem[index].qty
            
            if(qty > 1) {
                const qtydec = --qty
                state.cartItem[index].qty = qtydec

                const price = state.cartItem[index].price
                const total = price*qtydec
    
                state.cartItem[index].total = total
            } 


        }
    }
})
export const {setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions

export default productSlice.reducer
import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptycart from "../assets/empty.gif";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js'
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);

  const user = useSelector(state => state.user)

  const navigate = useNavigate()

  const totalprice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  ); //or parseInt(curr.total)
  const totalqty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const toastOptions = {
    position:"top-center",
    autoClose:5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handlepayment = async () => {
    if (user.email) {
      try {
        const stripePromise = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
        );
        
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/payment`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(productCartItem),
        });
        
        if (res.status === 500) {
          return;
        }

        const data = await res.json();
        console.log(data);

        toast('Redirecting to payment gateway...', toastOptions);
        stripePromise.redirectToCheckout({ sessionId: data });

        // Assuming that the payment process is successful,
        // you may update the Redux store here if needed
        // dispatch(paymentSuccessAction());

      } catch (error) {
        console.error('Error during payment:', error);
      }
    } else {
      toast.error('Login to place the order', toastOptions);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <div>
      <div className="p-2 md:p-4 ">
        <h1 className="text-purple-600 text-lg md:text-2xl font-bold">
          Your Cart
        </h1>
        {productCartItem[0] ? (
          <div className="flex flex-col md:flex-row gap-4">
            {/* display cart items */}
            <div className="md:w-1/2">
              <div>
                {productCartItem.map((el) => {
                  return (
                    <CartProduct
                      key={el._id}
                      id={el._id}
                      name={el.name}
                      image={el.image}
                      category={el.category}
                      price={el.price}
                      qty={el.qty}
                      total={el.total}
                    />
                    // qty, total - productslice
                  );
                })}
              </div>
            </div>
            {/* total cart items */}
            <div className="w-full h-full md:max-w-lg bg-white drop-shadow shadow-md md:ml-auto">
              <h2 className="p-2 text-lg font-bold bg-purple-500 text-white">
                {" "}
                Summary{" "}
              </h2>
              <div className="flex justify-between p-4">
                <p>Total Quantity</p>
                <p className="font-bold">{totalqty}</p>
              </div>
              <div className="flex justify-between p-4">
                <p>Total Price</p>
                <p className="font-bold">
                  <span className="font-bold text-purple-600">₹</span>
                  {totalprice}
                </p>
              </div>
              <div className="p-4">
                <button onClick={handlepayment} className="bg-purple-500 hover:bg-purple-700 w-full p-2 rounded-md font-bold text-white">
                  PAYMENT
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <img src={emptycart} className="w-full max-w-sm" />
              <h1 className="font-bold text-slate-500 text-[20px]">
                {" "}
                Your cart is empty
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

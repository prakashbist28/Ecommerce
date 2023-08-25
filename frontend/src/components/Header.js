import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux'
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Header = () => {
  const [show, setshow] = useState(false);
  const userData = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toastOptions= {
    position:"top-center",
    autoClose:5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}
  const handleLogout = () =>{
    dispatch(logoutRedux())
    localStorage.clear();
    navigate('/login')
    toast("Logout successfull", toastOptions)
  }

  const cardItemNumber = useSelector((state)=> state.product.cartItem)

  return (
    <header className="bg-white fixed shadow-md w-full h-16 px-2 md:px-4 z-50"> 

      <div className=" flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            {/* <img className="h-full" src={Logo} alt="img" /> */}
          </div>
        </Link>

        <div className=" flex items-center gap-4 md:gap-7">
          <nav className="hidden md:flex gap-4 md:gap-6 text-base md:text-xl">
            <Link to={""} className="hover:text-purple-600 ">
              Home
            </Link>
            <Link to={"Menu/64c6abca323edacc2241377d"} className="hover:text-purple-600 ">
              Menu
            </Link>
            <Link to={"About"} className="hover:text-purple-600 ">
              About
            </Link>
            <Link to={"Contact"} className="hover:text-purple-600 ">
              Contact
            </Link>
          </nav>
          <div className="text-3xl text-gray-700 hover:text-purple-600 relative">
            <Link to ={"cart"}> 
            <FaShoppingCart />
            <div className="absolute flex item-center justify-center -top-2 -right-2 text-white text-center bg-purple-600 h-5 w-5 text-xs rounded-full hover:bg-black hover:text-purple-500 font-bold">
              {cardItemNumber.length}
            </div>
            </Link>
          </div>
          <div  onClick={() => {setshow((prev) => !prev);}}>
            <div className=" items-center text-black w-10 h-10 rounded-full overflow-hidden text-[27px] cursor-pointer hover:text-purple-600 shadow-md drop-shadow-md">
              {userData.image ? <img src={userData.image} className='w-full h-full '/>:
              <FaUserCircle className="w-full h-full"
              />
              }
            </div> 
            {show && (
              <div className="absolute flex flex-col right-2 bg-white shadow drop-shadow-md border-2 border-purple-500 ">
                {
                  userData.email && 
                  <Link to={"NewProducts"} className=" cursor-pointer py-2 px-2 hover:bg-purple-500 hover:text-white">
                  New products
                  </Link> 
                }
                
                {
                  userData.email ? <p className="py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white" onClick={handleLogout}>Logout</p> :
                  <Link to={"Login"} className="w-[100px] py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white ">
                  Login
                </Link>
                }
            <nav className="md:hidden flex flex-col ">
            <Link to={""} className="py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white">
              Home
            </Link>
            <Link to={"Menu/64c6abca323edacc2241377d"} className="py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white ">
              Menu
            </Link>
            <Link to={"About"} className="py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white ">
              About
            </Link>
            <Link to={"Contact"} className="py-2 px-2 cursor-pointer hover:bg-purple-500 hover:text-white ">
              Contact
            </Link>
            </nav>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

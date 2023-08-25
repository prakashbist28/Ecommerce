import React, { useState } from "react";
import signup from "../assets/register.png";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../Utility/ImagetoBase64";
import  {toast} from 'react-toastify'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import axios from 'axios'

const Signup = () => {
  const [showpass, setshowpass] = useState(false);
  const [showconfpass, setshowconfpass] = useState(false);
  const navigate = useNavigate();

  const toastOptions= {
    position:"top-center",
    autoClose:5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image:""
  });
  console.log(data)

  const handleOnchange =(e) =>{
    const {name, value} = e.target
    setdata((prev)=>{
        return{
            ...prev,
            [name] : value
        }
    })
  }

  const handleUploadProfile = async(e) => {
    const data = await ImagetoBase64(e.target.files[0])
    setdata((prev)=>{
      return{
        ...prev,
        image:data
      }
    })
  }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(handleValidation()){
            const {firstname,lastname, email, password, confirmpassword, image} = data;
            const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/Signup`, {
                firstname,
                lastname,
                email,
                password,
                confirmpassword,
                image
            });
            const dataRes = await response.data
            toast(dataRes.message, toastOptions)
            if(dataRes.alert===false){
                toast.error(data.msg, toastOptions)
            }
            if(dataRes.alert===true){
                navigate("/login");
            }
            
        };
    }

  const handleValidation =() => {
    const {password,confirmpassword,email} = data;

    if(password !== confirmpassword){
        toast.error("password and confirm password donot match", toastOptions);
        return false;
    } else if (email.length < 3) {
        toast.error("username should have more than 3 characters", toastOptions);
        return false;
    }else if (password.length < 8) {
        toast.error("password should have more than 8 characters", toastOptions);
        return false;
    }else if(email===""){
        toast.error("email is required", toastOptions);
        return false;
    }
    return true;
}

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex flex-col items-center justify-center p-2 shadow drop-shadow-lg">

        <div className="w-[120px] h-[120px] overflow-hidden rounded-full shadow drop-shadow-lg">
          <img src={data.image ? data.image : signup} alt="img" className="w-full h-full" />

          <label htmlFor="profileImage">
        <div className=" absolute bottom-0 h-1/3 bg-black/70 text-white w-full text-center cursor-pointer hover:bg-black/40">
          <p className=" font-semibold ml-5 text-[18px] flex hover:text-purple-500">upload<AiOutlineCloudUpload className="font-bold ml-1 mt-1 text-[20px]"/></p>
          
        </div>
        </label>
        <input className="hidden"  type={'file'} accept="image/*" id='profileImage' onChange={handleUploadProfile}/>
        </div>

        <form className="w-full pt-4 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            value={data.firstname}
            id="firstname"
            name="firstname"
            onChange={handleOnchange}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded-lg border-2 border-black hover:border-purple-500 outline-none focus:border-2 focus:border-purple-600"
          />

          <label htmlFor="lastName ">Last Name</label>
          <input
            type={"text"}
            value={data.lastname}
            id="lastname"
            name="lastname"
            onChange={handleOnchange}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded-lg border-2 border-black hover:border-purple-500 outline-none focus:border-2 focus:border-purple-600"
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            value={data.email}
            id="email"
            name="email"
            onChange={handleOnchange}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded-lg border-2 border-black hover:border-purple-500 outline-none focus:border-2 focus:border-purple-600"
          />

          <label htmlFor="password">Password</label>
          <div className="flex items-center mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded-lg border-2 border-black hover:border-purple-500 outline-none focus:border-2 focus:border-purple-600">
            <input
              type={showpass ? "text" : "password"}
              value={data.password}
              id="password"
              name="password"
              onChange={handleOnchange}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              className="flex text-xl hover:text-purple-600 cursor-pointer"
              onClick={() => {
                setshowpass((prev) => !prev);
              }}
            >
              {showpass ? <BiShowAlt /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex items-center w-full bg-slate-200 rounded-lg border-2 border-black mt-1 mb-2 px-2 py-1 focus-within:outline  hover:border-purple-500 outline-none focus:border-2 focus:border-purple-600">
            <input
              type={showconfpass ? "text" : "password"}
              value={data.confirmpassword}
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleOnchange}
              className=" w-full bg-slate-200 border-none outline-none "
            />
            <span
              className="flex text-xl hover:text-purple-600 cursor-pointer"
              onClick={() => {
                setshowconfpass((prev) => !prev);
              }}
            >
              {showconfpass ? <BiShowAlt /> : <BiHide />}
            </span>
          </div> 

          <button type="submit" className="max-w-[120px] p-2 mx-auto cursor-pointer w-full font-semibold text-white bg-purple-600 hover:bg-purple-800 rounded-3xl text-xl">
            Sign Up
          </button>
        </form>
        <p className="text-[14px] pt-2">
          Already have an account ?{" "}
          <Link to={"/Login"} className="text-purple-600 font-medium">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

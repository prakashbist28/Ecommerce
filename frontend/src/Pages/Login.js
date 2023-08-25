import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showpass, setshowpass] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    image: "",
  });

  const dispatch = useDispatch();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email } = data;
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          email,
          password,
        }
      );
      const datares = await response.data;
      toast(datares.message, toastOptions);
      if (datares.alert === true) {
        dispatch(loginRedux(datares));
        Cookies.set("jwtoken", datares.data.token);
        localStorage.setItem("userData", JSON.stringify(datares.data));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, email } = data;

    if (password === "") {
      toast.error("username and password are required", toastOptions);
      return false;
    } else if (email.length === "") {
      toast.error("username and password are required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex flex-col items-center justify-center p-2 shadow drop-shadow-lg">
        <h1 className="font-bold text-purple-500 text-[30px]">Login</h1>

        <form className="w-full pt-4 flex flex-col" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="max-w-[120px] p-2 mx-auto cursor-pointer w-full font-semibold text-white bg-purple-600 hover:bg-purple-800 rounded-3xl text-xl"
          >
            Login
          </button>
        </form>
        <p className="text-[14px] pt-2">
          Already have an account ?{" "}
          <Link to={"/Signup"} className="text-purple-600 font-medium">
            {" "}
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import {setDataProduct} from './redux/productSlice'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import { loginRedux } from './redux/userSlice';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
   
  //product data
  useEffect(async()=>{ 
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
  },[])

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const token = Cookies.get("jwtoken");
    
    if (storedUserData && token) {
      const userData = JSON.parse(storedUserData);
      // Dispatch login action with stored user data
      dispatch(loginRedux({data : userData}));
    }
  }, [dispatch]);

  return (
    <>
    <ToastContainer />
    <div>
      <Header />
      <div className='pt-16 bg-slate-200 min-h-[calc(100vh)]'>
        <Outlet />
      </div>
    </div>
    </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Login from './Pages/Login';
import NewProducts from './Pages/NewProducts';
import Signup from './Pages/Signup';
import { Store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './Pages/Cart';
import Successpay from './Pages/Successpay';
import Cancel from './Pages/Cancel';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>} />
      <Route path='Menu' element={<Menu/>} />
      <Route path='Menu/:filterby' element={<Menu/>} />
      <Route path='About' element={<About/>} />
      <Route path='Contact' element={<Contact/>} />
      <Route path='Login' element={<Login />} />
      <Route path='NewProducts' element={<NewProducts/>} />
      <Route path='Signup' element={<Signup/>} />
      <Route path='Cart' element={<Cart/>} />
      <Route path='success' element={<Successpay/>} />
      <Route path='cancel' element={<Cancel/>} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <RouterProvider router={router} />
  </Provider>
);


import React from 'react';
import {createBrowserRouter} from "react-router";
import Home from '../../Pages/Home/Home/Home';
import RootLayout from '../../Layouts/RootLayout';
import Products from '../../Pages/Products/Products';
import Login from '../../Pages/Authentication/Login/Login';
import Register from '../../Pages/Authentication/Register/Register';
import PrivateRoute from '../PrivateRoutes/PrivateRoute';
import DashBoardLayout from '../../Layouts/DashBoardLayout';
import MyProfile from '../../Pages/DashBoard/MyProfile/MyProfile';
import AddProduct from '../../Pages/DashBoard/AddProducts/AddProduct';
import MyProducts from '../../Pages/DashBoard/MyProducts/MyProducts';
import UpdateProduct from '../../Pages/DashBoard/UpdateProduct/UpdateProduct';

export const router = createBrowserRouter([
    {
      path:'/',
      Component:RootLayout,
      children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'/products',
          Component:Products
        },
        {
          path:'/login',
          Component:Login
        },
        {
          path:'/register',
          Component: Register
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute> ,
      children:[
        {
          path:'my-profile',
          element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        },
        {
          path:'add-product',
          element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
        },
        {
          path:'my-products',
          element:<PrivateRoute><MyProducts></MyProducts></PrivateRoute>
        },
        {
          path:'update-product/:id',
          element:<PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>
        }
      ]
    }
]);

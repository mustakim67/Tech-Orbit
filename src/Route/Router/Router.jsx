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
import ProductReview from '../../Pages/DashBoard/ProductReviewQueue/ProductReview';
import ProductDetails from '../../Pages/ProductDetails/ProductDetails';
import ReportedContent from '../../Pages/DashBoard/ReportedContent/ReportedContent';
import ManageUsers from '../../Pages/DashBoard/Admin/ManageUsers/ManageUsers';
import Error from '../../Pages/ErrorPage/Error';

export const router = createBrowserRouter([
    {
      path:'/',
      Component:RootLayout,
      errorElement:<Error></Error>,
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
          path:'/product-details/:id',
          element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
        },
        {
          path:'/login',
          Component:Login
        }
        ,
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
        },
        {
          path:'product-review-queue',
          element:<PrivateRoute><ProductReview></ProductReview></PrivateRoute>
        },
        {
          path:'reported-content',
          element:<PrivateRoute><ReportedContent></ReportedContent></PrivateRoute>
        },
        {
          path:'manage-users',
          element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
        }
      ]
    }
]);

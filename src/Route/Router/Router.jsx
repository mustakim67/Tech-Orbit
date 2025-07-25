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
import Forbidden from '../../Pages/Forbidden/Forbidden';
import AdminRoutes from '../AdminRoutes/AdminRoutes';
import ManageCoupon from '../../Pages/DashBoard/Admin/ManageCoupon/ManageCoupon';
import ModeratorRoutes from '../ModeratorRoutes/ModeratorRoutes';
import Statistics from '../../Pages/DashBoard/Admin/Statistics/Statistics';
import UserRoutes from '../UserRoutes/UserRoutes';
import About from '../../Pages/About/About';

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
          path:'/about',
          Component:About
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
        },
        {
          path:'/forbidden',
          Component: Forbidden
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute> ,
      children:[
        {
          path:'my-profile',
          element:<PrivateRoute><UserRoutes><MyProfile></MyProfile></UserRoutes></PrivateRoute>
        },
        {
          path:'add-product',
          element:<PrivateRoute><UserRoutes><AddProduct></AddProduct></UserRoutes></PrivateRoute>
        },
        {
          path:'my-products',
          element:<PrivateRoute><UserRoutes><MyProducts></MyProducts></UserRoutes></PrivateRoute>
        },
        {
          path:'update-product/:id',
          element:<PrivateRoute><UserRoutes><UpdateProduct></UpdateProduct></UserRoutes></PrivateRoute>
        },
        {
          path:'product-review-queue',
          element:<ModeratorRoutes><ProductReview></ProductReview></ModeratorRoutes>
        },
        {
          path:'reported-content',
          element:<ModeratorRoutes><ReportedContent></ReportedContent></ModeratorRoutes>
        },
        {
          path:'manage-users',
          element:<AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
        },
        {
          path:'manage-coupon',
          element:<AdminRoutes><ManageCoupon></ManageCoupon></AdminRoutes>
        },
        {
          path:'admin-statistics',
          element:<AdminRoutes><Statistics></Statistics></AdminRoutes>
        }
      ]
    }
]);

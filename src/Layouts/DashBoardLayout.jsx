import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaPlusCircle, FaUserCircle, FaUserEdit, FaUsers, FaHourglassHalf, FaSearchLocation } from 'react-icons/fa';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import logo from '../assets/logoIcon.png';
import { ToastContainer } from 'react-toastify';
import { MdReviews } from "react-icons/md";
import { VscReport } from "react-icons/vsc";
import { MdManageAccounts } from "react-icons/md";
import useUserRole from '../Hooks/useUserRole';
import { RiCoupon2Fill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
const DashBoardLayout = () => {

    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-gray-100 text-gray-800">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <div className="navbar bg-white shadow-md px-4 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 font-bold text-lg text-blue-700">TECHORBIT Dashboard</div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <Outlet />
                </div>
                <ToastContainer></ToastContainer>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu w-72 min-h-full bg-blue-900 text-white px-4 py-6 space-y-2">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <img src={logo} alt="TechOrbit" className="w-10 h-10" />
                        <span className="text-2xl font-bold">TECHORBIT</span>
                    </div>

                    <li>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? 'active-link' : 'default-link'}>
                            <FaHome /> Home
                        </NavLink>
                    </li>

                    {!roleLoading && role === 'user' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/my-profile" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <FaUserCircle /> My Profile
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/add-product" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <FaPlusCircle /> Add Product
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/my-products" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <FaBoxOpen /> My Products
                                </NavLink>
                            </li>
                        </>}
                    {!roleLoading && role === 'moderator' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/product-review-queue" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <MdReviews /> Product Review Queue
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reported-content" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <VscReport /> Reported Contents
                                </NavLink>
                            </li>
                        </>}

                    {/* //admin links */}
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/admin-statistics" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <FcStatistics /> Admin Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <MdManageAccounts /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-coupon" className={({ isActive }) =>
                                    isActive ? 'active-link' : 'default-link'}>
                                    <RiCoupon2Fill /> Manage Coupon
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;

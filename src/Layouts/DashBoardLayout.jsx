import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaPlusCircle, FaUserCircle, FaUserEdit, FaUsers, FaHourglassHalf, FaSearchLocation } from 'react-icons/fa';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import logo from '../assets/logoIcon.png';
const DashBoardLayout = () => {

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
                    <li className="mt-4">
                        <NavLink to="/dashboard/update-profile" className={({ isActive }) =>
                            isActive ? 'active-link' : 'default-link'}>
                            <FaUserEdit /> Update Profile
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;

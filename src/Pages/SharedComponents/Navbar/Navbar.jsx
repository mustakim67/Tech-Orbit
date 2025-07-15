import React from 'react';
import logo from '../../../assets/logo.png';
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router';
import { LuLogOut } from "react-icons/lu";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import { auth } from '../../../Firebase/firebase.init';

const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    const navigate = useNavigate()
    const handleSignOut = () => {
        logOut(auth)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sign Out Successfully !',
                    text: 'Thank You!',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate('/');
            })
            .catch(error => {
                toast.error("Log Out failed!", {
                    autoClose: 4000,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.log(error)
            });
    }

    const navItems = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/products'}>Products</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>

    </>
    return (
        <div>
            <div className="navbar bg-white shadow-md border-b border-b-gray-300 px-[5%] md:px-[10%] py-3 fixed top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <FaBars size={20} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <div className='flex items-center'>
                        <img className='max-h-[50%] md:max-w-md h-15' src={logo} alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 lg:flex lg:items-center lg:text-lg font-500 lg:gap-5">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className={`${user ? "hidden" : ""}`}>
                        <Link to={user ? " " : '/login'}>
                            <button
                                className="bg-[#1E3A8A] text-white btn mr-3"
                            >
                                {user ? " " : 'Sign In'}
                            </button>
                        </Link>
                    </div>

                    <div className={`${user ? " " : "hidden"}`}>
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="w-12 md:w-18 rounded-full mr-4">
                                <img src={user?.photoURL} alt="User Image" className="rounded-full w-12 h-12 md:w-18 md:h-18 object-cover" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm -translate-x-20">
                                <a className='mx-auto'>{user?.displayName || "User Name"}</a>
                                <li><NavLink to={'dashboard'} className={'mx-auto'}>Dashboard</NavLink></li>
                                <li><button onClick={handleSignOut} className='btn btn-sm mt-1 rounded-full'>Sign Out <LuLogOut size={15} /></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import React from 'react';
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router';
import { LuLogOut } from "react-icons/lu";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import { auth } from '../../../Firebase/firebase.init';
import useUserRole from '../../../Hooks/useUserRole';

const Navbar = () => {
    const { role, roleLoading } = useUserRole();
    const { user, logOut, theme, setTheme } = useAuth();
    const navigate = useNavigate();

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
            });
    };

    const navItems = <>
        <li><NavLink to={'/'} className={({ isActive }) =>
            isActive
                ? " font-semibold border-b-2 border-blue-600 pb-1"
                : " hover:text-blue-600"
        }>Home</NavLink></li>
        <li><NavLink to={'/products'} className={({ isActive }) =>
            isActive
                ? " font-semibold border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-600"
        }>Products</NavLink></li>
        {
            user ? (<><li>
                <NavLink
                    to={
                        !roleLoading && role === 'user'
                            ? 'dashboard/my-profile'
                            : !roleLoading && role === 'moderator'
                                ? 'dashboard/product-review-queue'
                                : !roleLoading && role === 'admin'
                                    ? 'dashboard/admin-statistics'
                                    : '/'
                    }
                    className={({ isActive }) =>
                        isActive
                            ? " font-semibold border-b-2 border-blue-600 pb-1"
                            : " hover:text-blue-600"
                    }
                >
                    Dashboard
                </NavLink>
            </li>
            </>) : " "
        }
        <li><NavLink to={'/about'} className={({ isActive }) =>
            isActive
                ? " font-semibold border-b-2 border-blue-600 pb-1"
                : " hover:text-blue-600"
        }>About</NavLink></li>
        <li><NavLink to={'/contact'} className={({ isActive }) =>
            isActive
                ? " font-semibold border-b-2 border-blue-600 pb-1"
                : " hover:text-blue-600"
        }>Contact</NavLink></li>
    </>;

    return (
        <div>
            <div className="navbar shadow-xl bg-white/30 backdrop-blur-lg px-[5%] md:px-[10%] py-3 fixed top-0 z-50">
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
                        <span className="text-2xl font-extrabold cedarville-cursive-regular">TECHORBIT</span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 lg:flex lg:items-center lg:text-lg font-500 lg:gap-5">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* Sign In button (shown if no user) */}
                    <div className={`${user ? "hidden" : ""}`}>
                        <Link to={user ? " " : '/login'}>
                            <button className="bg-blue-800 text-white btn mr-3">
                                {user ? " " : 'Sign In'}
                            </button>
                        </Link>
                    </div>

                    {/* User section (theme toggler + profile dropdown) */}
                    <div className="flex items-center gap-4">
                        {/* Theme toggler before profile */}
                        <label className="swap swap-rotate">
                            <input
                                type="checkbox"
                                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                                checked={theme === "dark"}
                            />

                            {/*sun icon */}
                            <svg
                                className="swap-off fill-current w-8 h-8 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0L7.05,18.37A1,1,0,0,0,5.64,17ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5ZM12,2a1,1,0,0,0,1,1h0a1,1,0,1,0,0-2h0A1,1,0,0,0,12,2Zm7,9a1,1,0,0,0,1,1h0a1,1,0,1,0,0-2h0A1,1,0,0,0,19,11Zm-7,9a1,1,0,0,0,1,1h0a1,1,0,1,0,0-2h0A1,1,0,0,0,12,20Zm6.36-3,.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41L19.05,15.64A1,1,0,0,0,18.36,17ZM6.34,6.34A1,1,0,0,0,7.75,7.75L7.05,7.05A1,1,0,0,0,6.34,6.34ZM17.66,6.34a1,1,0,0,0,0,1.41L18.36,7.05A1,1,0,0,0,17.66,6.34ZM4,11a1,1,0,0,0,1,1H5a1,1,0,1,0,0-2H5A1,1,0,0,0,4,11Z" />
                            </svg>

                            {/*moon icon */}
                            <svg
                                className="swap-on fill-current w-8 h-8 text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
                            </svg>
                        </label>
                        {/* Profile dropdown */}
                        <div className={`${user ? " " : "hidden"}`}>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="w-12 md:w-18 rounded-full mr-4">
                                    <img
                                        src={user?.photoURL}
                                        alt="User"
                                        className="rounded-full w-12 h-12 md:w-18 md:h-18 object-cover"
                                    />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm -translate-x-20">
                                    <a className="mx-auto">{user?.displayName || "User Name"}</a>
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="btn btn-sm mt-1 rounded-full"
                                        >
                                            Sign Out <LuLogOut size={15} />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Navbar;

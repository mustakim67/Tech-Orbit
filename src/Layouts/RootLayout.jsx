import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/SharedComponents/Navbar/Navbar';

const RootLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='px-[10%]'>
                <Outlet></Outlet>
            </div>
        </>

    );
};

export default RootLayout;
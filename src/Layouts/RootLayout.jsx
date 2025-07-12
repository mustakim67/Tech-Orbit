import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/SharedComponents/Navbar/Navbar';
import Footer from '../Pages/SharedComponents/Footer/Footer';

const RootLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>

    );
};

export default RootLayout;
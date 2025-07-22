import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import Coupon from '../Coupon/Coupon';

const Home = () => {
    return (
        <div className='md:px-[10%]'>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Coupon></Coupon>
        </div>
    );
};

export default Home;
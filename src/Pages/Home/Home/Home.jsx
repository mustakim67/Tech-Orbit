import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import Coupon from '../Coupon/Coupon';
import TechNews from '../TechNews/TechNews';
import TopContributors from '../TopContributors/TopContributors';

const Home = () => {
    return (
        <div className='md:px-[10%]'>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Coupon></Coupon>
            <TechNews></TechNews>
            <TopContributors></TopContributors>
        </div>
    );
};

export default Home;
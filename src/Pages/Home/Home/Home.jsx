import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <div className='md:px-[10%]'>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;
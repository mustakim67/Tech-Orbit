import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import bgImage from '../../../assets/coupon.png';

const Coupon = () => {
    const axiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        axiosSecure.get('/coupons/valid-coupons')
            .then(res => setCoupons(res.data))
            .catch(err => console.error('Failed to load coupons:', err));
    }, [axiosSecure]);

    if (!coupons.length) return null;

    return (
        <div className="my-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                Exclusive Membership Coupons
            </h2>
            <Carousel
                showArrows
                infiniteLoop
                showThumbs={false}
                autoPlay
                interval={4000}
                showStatus={false}
            >
                {coupons.map((coupon) => (
                    <div
                        key={coupon._id}
                        className="relative overflow-hidden shadow-md px-[7%]"
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px'
                        }}
                    >
                        <div className="absolute inset-0 bg-black/10" />

                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center h-full py-6 md:px-40 px-10 text-white">
                            <div>
                                <h3 className="text-xl md:text-3xl font-bold">
                                    Use Code: <span className="">{coupon.code}</span>
                                </h3>
                                <p className="text-sm mt-1">{coupon.description}</p>
                            </div>

                            <div className="mt-4 md:mt-0 md:text-right">
                                <p className="text-lg md:text-5xl font-semibold text-yellow-300">
                                    {coupon.discount}% OFF
                                </p>
                                <p className="text-sm">
                                    Expires: <span className="italic">{coupon.expiry}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Coupon;

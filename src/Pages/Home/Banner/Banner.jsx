import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img1 from '../../../assets/Plain credit card-bro.png';
import img2 from '../../../assets/Version control-pana.png';
import img3 from '../../../assets/Chat bot-bro.png';
import { Link } from 'react-router';

const slides = [
    {
        img: img2,
        title: 'Built for Innovators & Makers',
        desc: 'Showcase your latest tech products, tools, or apps and get discovered by a growing community.',
        btn: 'Submit Product',
        link: '/dashboard/add-product',
        reverse: true,
    },
    {
        img: img1,
        title: 'Smart Subscriptions & Discounts',
        desc: 'Subscribe for premium access and unlock features like unlimited product posting and coupon benefits.',
        link: '/dashboard/my-profile',
        btn: 'Subscribe Now',
    },
    {
        img: img3,
        title: 'Discover & Support Tech Talent',
        desc: 'Browse trending tools, vote on your favorites, and support the best innovations from emerging creators.',
        link: '/products',
        btn: 'Browse Products',
    },
];

const Banner = () => {
    return (
        <div className="mx-auto mt-20 md:mt-30 mb-10 py-2 px-4 border border-gray-300 rounded-xl">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={600}
                swipeable
                emulateTouch
            >
                {slides.map((slide, index) => (
                    <div key={index} className="bg-black/3050 rounded-xl px-8 ">
                        <div className={`flex flex-col-reverse ${slide.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-8 h-[600px] p-6`}>
                            <div className="md:w-1/2 text-left space-y-2 md:space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    {slide.title}
                                </h2>
                                <p className="text-base md:text-lg leading-relaxed">
                                    {slide.desc}
                                </p>
                                <button className="btn bg-blue-800 text-white rounded-xl px-6 py-2 mb-2 text-sm md:text-base">
                                    <Link to={`${slide.link}`}>{slide.btn}</Link>
                                </button>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="w-full max-h-[500px] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;

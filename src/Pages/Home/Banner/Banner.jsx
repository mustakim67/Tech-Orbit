import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img1 from '../../../assets/Plain credit card-bro.png';
import img2 from '../../../assets/Version control-pana.png';
import img3 from '../../../assets/Chat bot-bro.png';
import { Link } from 'react-router';

const slides = [
  
    {
        img: img2,
        title: 'For Developers, By Developers',
        desc: 'Empowering developers with tools, APIs, and automation for faster, more efficient workflows.',
        btn: 'Explore Tools',
        reverse: true,
    },
      {
        img: img1,
        title: 'Seamless Transactions',
        desc: "TechOrbit offers fast, secure, and user-friendly payment solutions for individuals and businesses.",
        btn: 'Get Started',
    },
    {
        img: img3,
        title: 'Powering Digital Innovation',
        desc: 'Unlock growth with scalable, modern tech solutions tailored for startups and enterprises alike.',
        btn: 'Discover More',
    },
];

const Banner = () => {
    return (
        <div className="mx-auto mt-20 md:mt-30 mb-10 md:px-4 py-2">
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
                    <div key={index} className="bg-blue-50 rounded-xl px-8">
                        <div className={`flex flex-col-reverse ${slide.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-8 md:h-[600px] p-6`}>
                            <div className="md:w-1/2 text-left space-y-2 md:space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                                    {slide.title}
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    {slide.desc}
                                </p>
                                <button className="btn bg-blue-800 text-white rounded-xl px-6 py-2 mb-2 text-sm md:text-base">
                                   <Link to={'/products'}>{slide.btn}</Link> 
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

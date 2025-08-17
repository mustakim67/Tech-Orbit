import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import Coupon from '../Coupon/Coupon';
import TechNews from '../TechNews/TechNews';
import TopContributors from '../TopContributors/TopContributors';
import { FaUsers, FaComments, FaHandsHelping } from "react-icons/fa";
import Swal from 'sweetalert2';


const Home = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        Swal.fire({
            icon: "success",
            title: "Subscribed!",
            text: "You will now receive the latest tech updates and product launches.",
            confirmButtonColor: "#3b82f6",
            background: "#0f172a",
            color: "#fff",
        });
        setEmail("");
    };

    return (
        <div className='md:px-[10%] px-4'>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Coupon></Coupon>
            <TechNews></TechNews>
            <TopContributors></TopContributors>
            <section className="px-[10%] py-16 rounded-2xl my-12 border border-gray-200 shadow-xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">Join Our Community</h2>
                    <p className="mt-4 max-w-xl mx-auto">
                        Connect with developers, share your insights, and collaborate on the latest tech products. Be part of a forward-thinking community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/20 transition border border-gray-200">
                        <FaUsers className="text-4xl" />
                        <h3 className="text-xl font-semibold">Meet Developers</h3>
                        <p>Engage with like-minded tech enthusiasts from around the world.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/20 transition border border-gray-200">
                        <FaComments className="text-4xl" />
                        <h3 className="text-xl font-semibold">Discuss Ideas</h3>
                        <p>Share ideas, provide feedback, and vote on the next big products.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/20 transition border border-gray-200">
                        <FaHandsHelping className="text-4xl" />
                        <h3 className="text-xl font-semibold">Collaborate</h3>
                        <p>Work together with other innovators to build amazing products.</p>
                    </div>
                </div>
            </section>
            <section className="px-[10%] py-16  dark:bg-gray-900 rounded-2xl my-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">
                        Stay Updated
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto">
                        Subscribe to our newsletter to get the latest tech product launches,
                        updates, and insights delivered straight to your inbox.
                    </p>
                </div>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition w-full md:w-auto"
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Home;
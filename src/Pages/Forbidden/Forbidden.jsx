import React from 'react';
import { Link } from 'react-router';
import image from '../../assets/403.jpg'

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            {/* Image section */}
            <div className="mb-8 max-w-xs w-full">
                <img
                    src={image}
                />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Access Forbidden</h2>
            <p className="text-gray-700 mb-8 text-center max-w-md">
                Sorry, you don’t have permission to view this page.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Forbidden;

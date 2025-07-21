import React from 'react';
import { Link } from 'react-router';
import image from '../../assets/404.jpg'

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      {/* Image section */}
      <div className="mb-8 max-w-xs w-full">
        <img
          src={image}
        />
      </div>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-700 mb-8 text-center max-w-md">
        Sorry, we are unable to find this page for you.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-900 text-white rounded-md transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;

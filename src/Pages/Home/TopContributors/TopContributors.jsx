import React from 'react';
import Marquee from 'react-fast-marquee';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';

const TopContributors = () => {
    const axiosInstance = useAxios();

    const { data: contributors = [], isLoading } = useQuery({
        queryKey: ['top-contributors'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users/top-contributors');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="py-8 px-4 rounded-lg my-12">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
                Top Contributors of the Month
            </h2>

            <Marquee pauseOnHover speed={50} gradient={false}>
                {contributors.map((user, idx) => (
                    <div
                        key={idx}
                        className="w-64 mx-4 p-5 bg-white rounded-xl shadow-md border border-purple-200 flex flex-col items-center justify-center text-center"
                    >
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-20 h-20 rounded-full border-2 border-blue-500 mb-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className="mt-2 inline-block bg-purple-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                            {user.count} Product
                        </span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default TopContributors;

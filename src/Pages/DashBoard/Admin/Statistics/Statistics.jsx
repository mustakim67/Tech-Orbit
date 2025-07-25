import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const COLORS = ["#4ade80", "#facc15", "#60a5fa", "#f472b6", "#a78bfa"];

const AdminStatistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get("/admin-stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);
    if (loading) return <p className="text-center py-10"><span className="loading loading-spinner loading-xl"></span></p>;
    if (!stats) return <p className="text-center py-10">No stats found.</p>;

    const pieData = [
        { name: "Accepted Products", value: stats.acceptedProducts },
        { name: "Pending Products", value: stats.pendingProducts },
        { name: "All Products", value: stats.totalProducts },
        { name: "Reviews", value: stats.totalReviews },
        { name: "Users", value: stats.totalUsers },
    ];
    const StatCard = ({ label, value, color, bgColor }) => (
        <div className={`p-6 rounded-2xl shadow-md ${bgColor} text-white`}>
            <p className="text-xl opacity-80">{label}</p>
            <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
    );
    return (
        <div className="md:p-6 dark:bg-gray-900 min-h-screen">
            <h2 className="text-lg md:text-2xl text-blue-900 dark:text-white mb-8 text-center font-bold">
                Admin Statistics Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
                <StatCard label="Total Products" value={stats.totalProducts} color="text-blue-600" bgColor="bg-blue-300" />
                <StatCard label="Total Reviews" value={stats.totalReviews} color="text-white" bgColor="bg-yellow-400"/>
                <StatCard label="Total Users" value={stats.totalUsers} color="text-indigo-600" bgColor="bg-violet-300" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <p className="text-xl text-gray-600 dark:text-gray-300">{label}</p>
        <p className={`text-2xl font-bold ${color} dark:${color}`}>{value}</p>
    </div>
);

export default AdminStatistics;

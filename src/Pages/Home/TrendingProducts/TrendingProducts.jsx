import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaThumbsUp } from "react-icons/fa";
import useUserRole from "../../../Hooks/useUserRole";
import { useState } from "react";

const TrendingProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { role } = useUserRole();
    const [loading, setLoading] = useState(true);

    const { data: products = [], refetch } = useQuery({
        queryKey: ["trending-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products/trending");
            setLoading(false)
            return res.data;
        },
    });

    const queryClient = useQueryClient();
    const handleUpvote = async (product) => {
        if (!user) return navigate("/login");
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't vote a product", "error");
            return;
        }

        try {
            await axiosSecure.patch(`/products/upvote/${product._id}`, { email: user.email });

            queryClient.invalidateQueries(["trending-products"]);
            queryClient.invalidateQueries(["featured-products"]);
        } catch (err) {
            Swal.fire("Oops", err.response?.data?.error || "Vote failed", "error");
        }
    };
    if (loading)
        return <div className="text-center py-10 text-blue-500"><span className="loading loading-spinner loading-xl"></span></div>;
    return (
        <div className="py-10 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 font-mono">Trending Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {products.map(product => (
                    <div key={product._id} className="rounded-2xl shadow p-4 flex flex-col justify-between h-full border border-gray-400">
                        <div>
                            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-xl mb-3" />

                            <Link to={`/product-details/${product._id}`}>
                                <h3 className="text-lg font-semibold hover:underline mb-2">{product.name}</h3>
                            </Link>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {product.tags?.map((tag, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => handleUpvote(product)}
                            disabled={product?.owner?.email === user?.email}
                            className="mt-auto flex items-center justify-center gap-2 bg-blue-900 text-white px-3 py-1.5 text-sm rounded hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed btn"
                        >
                            <FaThumbsUp />
                            {product.votes?.length || 0}
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link to="/products">
                    <button className="px-5 py-2 bg-blue-900 text-white rounded">
                        Show All Products
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TrendingProducts;

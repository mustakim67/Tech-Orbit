import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaThumbsUp } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import useUserRole from "../../Hooks/useUserRole";

const Products = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { role } = useUserRole();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { data = {}, refetch, isLoading,isFetching} = useQuery({
        queryKey: ["all-products", searchTerm, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/all?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
    });

    const products = data.products || [];
    const total = data.total || 0;
    const totalPages = Math.ceil(total / itemsPerPage);

    const handleUpvote = async (product) => {
        if (!user) return navigate("/login");
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't vote a product", "error");
            return;
        }

        try {
            await axiosSecure.patch(`/products/upvote/${product._id}`, {
                email: user.email,
            });
            refetch();
        } catch (err) {
            Swal.fire("Oops", err.response?.data?.error || "Vote failed", "error");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setSearchTerm(searchText);
    };
    //loading spinner
    if (isLoading || isFetching) return <div className="text-center h-screen flex justify-center items-center py-10"><span className="loading loading-spinner loading-xl"></span></div>;
    return (
        <div className="px-[10%] py-20 mt-15 mx-auto">
            <h2 className="text-3xl font-bold justify-center mb-8 text-blue-900 font-mono flex gap-5">
                <span><GrSearch /></span>Explore Products
            </h2>

            {/* search bar */}
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border border-blue-300 px-4 py-2 rounded-l-md w-full max-w-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-800"
                >
                    Search
                </button>
            </form>

            {/* Product cards add korsi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between h-full"
                    >
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-full object-cover rounded-xl mb-3"
                            />
                            <Link to={`/product-details/${product._id}`}>
                                <h3 className="text-lg font-semibold text-blue-800 hover:underline mb-2">
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {product.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-blue-900 text-white"
                                : "bg-blue-100 text-blue-900"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
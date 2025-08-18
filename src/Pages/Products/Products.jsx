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
    const [sortOrder, setSortOrder] = useState("newest");

    const [searchTerm, setSearchTerm] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data = {}, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["all-products", searchTerm, currentPage, sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/products/all?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}&sort=${sortOrder}`
            );
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
            <h2 className="text-3xl font-bold justify-center mb-8 font-mono flex gap-5">
                <span><GrSearch /></span>Explore Products
            </h2>

            {/* search bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 w-full">
                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex w-full max-w-md"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 border border-gray-200 px-4 py-2 rounded-l-md focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-r-md"
                    >
                        Search
                    </button>
                </form>

                {/* Sort Dropdown */}
                <select
                    value={sortOrder}
                    onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); refetch(); }}
                    className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>



            {/* Product cards add korsi */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="rounded-2xl shadow p-4 flex flex-col justify-between h-full border border-gray-200"
                    >
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-40 w-full object-cover rounded-xl mb-3"
                            />
                            <Link to={`/product-details/${product._id}`}>
                                <h3 className="text-lg font-semibold hover:underline mb-2">
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {product.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-black text-xs px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => handleUpvote(product)}
                            disabled={product?.owner?.email === user?.email}
                            className="mt-auto flex items-center justify-center gap-2 bg-blue-800 text-white px-3 py-1.5 text-sm rounded hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed btn"
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
                                ? "bg-black text-white"
                                : "bg-blue-100 text-black"
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
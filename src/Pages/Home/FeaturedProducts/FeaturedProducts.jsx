import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaThumbsUp } from "react-icons/fa";
import useUserRole from "../../../Hooks/useUserRole";

const FeaturedProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { role } = useUserRole();

    const { data: featured = [], refetch } = useQuery({
        queryKey: ["featured-products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products/featured");
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/products/upvote/${id}`, { email: user.email }),
        onSuccess: () => refetch(),
        onError: (err) => {
            Swal.fire("Oops", err.response?.data?.error || "Voting failed", "error");
        }
    });

    const handleUpvote = (product) => {
        if (!user) return navigate("/login");
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't vote a product", "error");
            return;
        }
        mutation.mutate(product._id);
    };

    return (
        <div className="py-5 md:py-10 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-900 font-mono">Featured Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map(product => (
                    <div key={product._id} className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between h-full">
                        <div>
                            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-xl mb-3" />

                            <Link to={`/product-details/${product._id}`}>
                                <h3 className="text-lg font-semibold text-blue-800 hover:underline mb-2">{product.name}</h3>
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
        </div>
    );
};

export default FeaturedProducts;
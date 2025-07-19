import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProductReview = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all products
    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get("/products");
            return res.data.sort((a, b) => {
                if (a.status === "pending" && b.status !== "pending") return -1;
                if (a.status !== "pending" && b.status === "pending") return 1;
                return 0;
            });
        },
    });

    // Mutation for status update
    const statusMutation = useMutation({
        mutationFn: ({ id, status }) => axiosSecure.patch(`/products/status/${id}`, { status }),
        onSuccess: (_, { status }) => {
            queryClient.invalidateQueries(["products"]);
            if (status === "accepted") {
                Swal.fire({
                    icon: "success",
                    title: "Product Accepted",
                    text: "The product has been accepted successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        },
        onError: () => {
            Swal.fire("Error", "Failed to update status", "error");
        },
    });

    // Mutation for mark as featured
    const featureMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/products/featured/${id}`, { featured: true }),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            Swal.fire({
                icon: "success",
                title: "Product marked as Featured!",
                timer: 2000,
                showConfirmButton: false,
            });
        },
    });

    // Handle rejection with confirmation
    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to reject this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                statusMutation.mutate({ id, status: "rejected" });
                Swal.fire("Rejected!", "The product has been rejected.", "success");
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Product Review Queue</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-base-200 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td className="py-3 font-medium">{product.name}</td>
                                    <td>
                                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${product.status === "accepted" ? "bg-green-100 text-green-700" :
                                            product.status === "rejected" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="flex flex-wrap justify-center gap-2">
                                        <Link to={`/product-details/${product._id}`}>
                                            <button className="bg-blue-900 text-white text-sm px-3 py-1 rounded hover:opacity-90">
                                                View
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => featureMutation.mutate(product._id)}
                                            className="bg-blue-900 text-white text-sm px-3 py-1 rounded hover:opacity-90"
                                        >
                                            Feature
                                        </button>
                                        <button
                                            onClick={() => statusMutation.mutate({ id: product._id, status: "accepted" })}
                                            disabled={product.status !== "pending"}
                                            className={`text-sm px-3 py-1 rounded ${product.status !== "pending"
                                                ? "bg-gray-300 text-white cursor-not-allowed"
                                                : "bg-green-600 text-white hover:opacity-90"
                                                }`}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(product._id)}
                                            disabled={product.status !== "pending"}
                                            className={`text-sm px-3 py-1 rounded ${product.status !== "pending"
                                                ? "bg-gray-300 text-white cursor-not-allowed"
                                                : "bg-red-600 text-white hover:opacity-90"
                                                }`}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReview;

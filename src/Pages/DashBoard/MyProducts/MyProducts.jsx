import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(true);

    const { data: products = [] } = useQuery({
        queryKey: ["myProducts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/user/${user.email}`);
            setLoading(false);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/products/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Product has been removed.", "success");
            queryClient.invalidateQueries(["myProducts"]);
        },
        onError: () => {
            Swal.fire("Error!", "Could not delete product.", "error");
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) deleteMutation.mutate(id);
        });
    };

    if (loading)
        return (
            <div className="text-center py-10 text-base-content">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );

    return (
        <div className="md:p-6 text-base-content">
            <h2 className="text-2xl font-bold mb-6 text-base-content">My Products</h2>

            <div className="overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg">
                <table className="table w-full rounded-lg overflow-hidden">
                    <thead className="border-b border-gray-300 dark:border-gray-600">
                        <tr>
                            <th className="text-base-content">#</th>
                            <th className="text-base-content">Product Name</th>
                            <th className="text-base-content">Votes</th>
                            <th className="text-base-content">Status</th>
                            <th className="text-base-content text-center" colSpan={2}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-base-content">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <th className="text-base-content">{index + 1}</th>
                                    <td className="text-base-content">{product.name}</td>
                                    <td className="text-base-content">{product.votes.length || 0}</td>
                                    <td>
                                        <span
                                            className={`text-sm font-semibold px-2 py-1 rounded-full ${product.status === "accepted"
                                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                                                : product.status === "rejected"
                                                    ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                                                }`}
                                        >
                                            {product.status || "pending"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-base-content bg-blue-800 dark:bg-blue-700 text-sm px-3 py-1 rounded hover:opacity-90 mr-1"
                                            onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="text-base-content bg-red-500 dark:bg-red-600 text-sm px-3 py-1 rounded hover:opacity-90 ml-1"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
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

export default MyProducts;

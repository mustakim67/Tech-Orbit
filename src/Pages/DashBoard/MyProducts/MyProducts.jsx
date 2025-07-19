import React from "react";
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

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["myProducts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/products/${id}`);
        },
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
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading)
        return <div className="text-center py-10 text-blue-500">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 ">My Products</h2>
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="table table-zebra w-full rounded-lg overflow-hidden">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Votes</th>
                            <th>Status</th>
                            <th className="text-center" colSpan={2}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.votes.length || 0}</td>
                                    <td>
                                        <span
                                            className={`text-sm font-semibold px-2 py-1 rounded-full 
                        ${product.status === "accepted"
                                                    ? "bg-green-100 text-green-700"
                                                    : product.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {product.status || "pending"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-white bg-blue-900 text-sm px-3 py-1 rounded hover:opacity-90 mr-1"
                                            onClick={() =>
                                                navigate(`/dashboard/update-product/${product._id}`)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="text-white bg-red-500 text-sm px-3 py-1 rounded hover:opacity-90 ml-1"
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

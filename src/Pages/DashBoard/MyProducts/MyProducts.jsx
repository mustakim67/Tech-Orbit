import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['myProducts', user?.email],
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
            Swal.fire('Deleted!', 'Product has been removed.', 'success');
            queryClient.invalidateQueries(['myProducts']);
        },
        onError: () => {
            Swal.fire('Error!', 'Could not delete product.', 'error');
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <div className="text-center py-10 text-blue-500">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">My Products</h2>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any products yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th>Product Name</th>
                                <th>Votes</th>
                                <th>Status</th>
                                <th colSpan={2} className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="hover">
                                    <td className="font-medium">{product.name}</td>
                                    <td>{product.votes || 0}</td>
                                    <td>
                                        <span
                                            className={`badge ${product.status === 'accepted'
                                                    ? 'badge-success'
                                                    : product.status === 'rejected'
                                                        ? 'badge-error'
                                                        : 'badge-warning'
                                                }`}
                                        >
                                            {product.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline btn-info btn-sm"
                                            onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline btn-error btn-sm"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyProducts;

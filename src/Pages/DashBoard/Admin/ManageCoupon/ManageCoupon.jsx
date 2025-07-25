import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCoupon = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCoupons = async () => {
        try {
            const res = await axiosSecure.get('/coupons');
            setLoading(false);
            setCoupons(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch coupons', 'error');
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const onSubmit = async (data) => {
        try {
            await axiosSecure.post('/coupons', data);
            Swal.fire('Success', 'Coupon added successfully!', 'success');
            reset();
            fetchCoupons();
        } catch (error) {
            Swal.fire('Error', 'Failed to add coupon', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This coupon will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/coupons/${id}`);
            Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
            fetchCoupons();
        } catch {
            Swal.fire('Error', 'Failed to delete coupon', 'error');
        }
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        document.getElementById('edit_modal').showModal();
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updated = {
            code: form.code.value,
            expiry: form.expiry.value,
            description: form.description.value,
            discount: parseInt(form.discount.value),
        };

        try {
            await axiosSecure.put(`/coupons/${editingCoupon._id}`, updated);
            Swal.fire('Updated!', 'Coupon updated successfully!', 'success');
            setEditingCoupon(null);
            fetchCoupons();
            form.reset();
        } catch {
            Swal.fire('Error', 'Failed to update coupon', 'error');
        }
    };

    if (loading) return <div className="text-center py-10"><span className="loading loading-spinner loading-xl"></span></div>;
    return (
        <div className="p-4 md:p-8 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Add New Coupon</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-xl p-6 grid gap-4 md:grid-cols-2">
                <input {...register("code")} placeholder="Coupon Code" className="input input-bordered w-full" required />
                <input type="date" {...register("expiry")} className="input input-bordered w-full" required />
                <input {...register("description")} placeholder="Short Description" className="input input-bordered w-full col-span-2" required />
                <input type="number" {...register("discount")} placeholder="Discount %" className="input input-bordered w-full" required />
                <button type="submit" className="btn bg-blue-900 text-white hover:bg-blue-700 col-span-2">Add Coupon</button>
            </form>

            {coupons.length === 0 ? (
                <p className="text-center text-gray-500 mt-15">No coupons available.</p>
            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-6 text-blue-900 mt-10">Available Coupons</h3>

                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="table w-full border border-base-300">
                            <thead className="bg-blue-100 text-blue-800 text-sm">
                                <tr>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Discount</th>
                                    <th>Expiry</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id} className="hover:bg-base-100">
                                        <td className="font-semibold text-sm">{coupon.code}</td>
                                        <td className="text-sm">{coupon.description}</td>
                                        <td className="text-sm text-green-600 font-medium">{coupon.discount}%</td>
                                        <td className="text-sm">{coupon.expiry}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(coupon)}
                                                    className="btn btn-xs bg-blue-900 text-white hover:bg-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(coupon._id)}
                                                    className="btn btn-xs btn-error"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Update Modal */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Edit Coupon</h3>
                    {editingCoupon && (
                        <form onSubmit={handleUpdateSubmit} className="grid gap-3">
                            <input name="code" defaultValue={editingCoupon.code} className="input input-bordered w-full" />
                            <input type="date" name="expiry" defaultValue={editingCoupon.expiry} className="input input-bordered w-full" />
                            <input name="description" defaultValue={editingCoupon.description} className="input input-bordered w-full" />
                            <input type="number" name="discount" defaultValue={editingCoupon.discount} className="input input-bordered w-full" />
                            <div className="modal-action">
                                <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn btn-outline">Cancel</button>
                                <button type="submit" onClick={() => document.getElementById('edit_modal').close()} className="btn bg-blue-600 text-white">Update</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageCoupon;

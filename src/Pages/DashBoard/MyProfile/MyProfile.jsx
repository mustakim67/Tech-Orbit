import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import CheckoutForm from '../Payment/CheckOutForm';
import { MdWorkspacePremium } from 'react-icons/md';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);

    const { data: membershipStatus = {}, refetch, isLoading } = useQuery({
        queryKey: ['membershipStatus', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/verified/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        staleTime: Infinity,
    });

    const handleSubscribeClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (isLoading) {
        return (
            <div className="text-center py-10 font-medium text-blue-600">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    const isSubscribed = membershipStatus?.isSubscribed;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center space-y-4">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/LvFTrbJ/user.png'}
                    alt="User Profile"
                    className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-md object-cover"
                />

                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                        {user?.displayName}
                        {isSubscribed && (
                            <MdWorkspacePremium className="text-[#DAA520]" size={28} />
                        )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>

                    {!isSubscribed && (
                        <button
                            onClick={handleSubscribeClick}
                            className="mt-4 w-full max-w-[220px] bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition"
                        >
                            Subscribe for ৳{membershipStatus?.price || 199}
                        </button>
                    )}
                </div>
            </div>

            {/* Stripe Payment Modal */}
            <dialog
                className={`modal ${showModal ? 'modal-open' : ''}`}
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-box max-w-md bg-white dark:bg-gray-800 relative">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl"
                        onClick={handleCloseModal}
                    >
                        ✕
                    </button>

                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4">
                        Complete Your Membership
                    </h3>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            price={membershipStatus?.price || 199}
                            onSuccess={async () => {
                                try {
                                    await axiosSecure.post('/users/verified', {
                                        email: user.email,
                                        verifiedAt: new Date(),
                                    });
                                    handleCloseModal();
                                    refetch();
                                } catch (err) {
                                    console.error(err);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong while updating membership!',
                                    });
                                }
                            }}
                        />
                    </Elements>
                </div>
            </dialog>
        </div>
    );
};

export default MyProfile;

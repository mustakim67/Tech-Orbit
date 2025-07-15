import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const CheckoutForm = ({ price, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const [clientSecret, setClientSecret] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Create Payment Intent on mount
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Stripe Init Error:', err.response?.data || err.message);
                    setErrorMsg('Failed to initialize payment.');
                });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret || isProcessing) return;

        setIsProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setIsProcessing(false);
            return;
        }

        const { error: methodError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodError) {
            setErrorMsg(methodError.message);
            console.error(methodError);
            setIsProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email,
                },
            },
        });

        if (confirmError) {
            setErrorMsg(confirmError.message);
            console.error(confirmError);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            try {
                await axiosSecure.post('/users/verified', {
                    email: user.email,
                    verifiedAt: new Date(),
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Membership Activated!',
                    text: `You are now a verified TechOrbit member.`,
                    confirmButtonColor: '#2563eb',
                });

                onSuccess?.();
            } catch (err) {
                console.error(err);
                setErrorMsg('Verification failed after payment.');
            }
        }

        setIsProcessing(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600 text-sm mb-1">Payable Amount</p>
            <div className="text-lg font-semibold text-blue-800 mb-2">৳{price}</div>

            <CardElement className="p-3 border rounded-md" />
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!stripe || !clientSecret}
            >
                Pay ৳{price}
            </button>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </form>
    );
};

export default CheckoutForm;

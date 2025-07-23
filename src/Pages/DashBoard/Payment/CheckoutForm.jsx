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
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(price);
    const [validCoupons, setValidCoupons] = useState([]);

    // Load valid coupons once
    useEffect(() => {
        axiosSecure.get('/coupons/valid-coupons')
            .then(res => {
                setValidCoupons(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch coupons', err);
            });
    }, [axiosSecure]);

    // Apply discount when couponCode changes
    useEffect(() => {
        const foundCoupon = validCoupons.find(c => c.code === couponCode.trim().toUpperCase());

        if (foundCoupon) {
            const discountAmount = price * (parseFloat(foundCoupon.discount) / 100);
            const newPrice = parseFloat((price - discountAmount).toFixed(2));
            setDiscountedPrice(newPrice);
        } else {
            setDiscountedPrice(price);
        }
    }, [couponCode, validCoupons, price]);

    // Create PaymentIntent when price or coupon changes
    useEffect(() => {
        if (discountedPrice > 0) {
            axiosSecure.post('/create-payment-intent', {
                price: discountedPrice
            })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                    setErrorMsg('');
                })
                .catch(err => {
                    console.error('Stripe Init Error:', err);
                    setErrorMsg(err.response?.data?.error || 'Failed to initialize payment.');
                });
        }
    }, [discountedPrice, axiosSecure]);

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
                setErrorMsg('Verification failed after payment.');
            }
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <p className="text-gray-600 text-sm mb-1">Original Price</p>
                <div className="text-lg font-semibold text-gray-700 line-through">
                    ৳{price}
                </div>
            </div>

            <div>
                <p className="text-gray-600 text-sm mb-1">Discounted Price</p>
                <div className="text-xl font-bold text-blue-900">
                    ৳{discountedPrice}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700">Coupon Code</label>
                <input
                    type="text"
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
            </div>

            <CardElement className="p-3 border rounded-md" />

            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!stripe || !clientSecret || isProcessing}
            >
                {isProcessing ? 'Processing...' : `Pay ৳${discountedPrice}`}
            </button>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </form>
    );
};

export default CheckoutForm;

import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { VscLinkExternal } from "react-icons/vsc";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(2);
    const { role } = useUserRole();


    const { data: product = {} } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        }
    });

    const handleUpvote = async () => {
        if (!user) return Swal.fire("Login Required", "Please login to vote", "info");
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't vote a product", "error");
            return;
        }
        await axiosSecure.patch(`/products/upvote/${product._id}`, { email: user.email });
        queryClient.invalidateQueries(["product", id]);
    };

    const handleReport = async () => {
        if (!user) return Swal.fire("Login Required", "Please login to report", "info");
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't report a product", "error");
            return;
        }
        await axiosSecure.post("/reports", {
            productId: product._id,
            productName: product.name,
            reporterEmail: user.email,
            reportedAt: new Date(),
        });
        Swal.fire("Reported!", "Your report has been submitted.", "success");
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value;
        if (role === 'admin' || role === 'moderator') {
            Swal.fire("Oops", "Admin or Moderator can't review a product", "error");
            return;
        }
        await axiosSecure.post("/reviews", {
            productId: product._id,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            description,
            rating,
        });

        form.reset();
        setRating(2);
        queryClient.invalidateQueries(["reviews", id]);
    };

    return (
        <div className="px-[5%] md:px-[10%] mx-auto p-6 mt-25 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl" />
                <div>
                    <h2 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-3">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags?.map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{tag}</span>
                        ))}
                    </div>
                    <div className="flex gap-5 items-center">
                        <div>
                            <a href={product.externalLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-800 underline mb-4">
                                Visit Link <VscLinkExternal />
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleUpvote}
                                disabled={product?.owner?.email === user?.email}
                                className="btn btn-sm bg-blue-800 text-white"
                            >
                                <FaThumbsUp /> {product.votes?.length || 0}
                            </button>

                            <button
                                onClick={handleReport}
                                className="btn btn-sm bg-red-600 text-white"
                            >
                                Report
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/*Reviews Section*/}
            <div>
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                <div className="grid md:grid-cols-2 gap-4 rounded-lg">
                    {reviews.length != 0 ? (reviews.map((review, i) => (
                        <div key={i} className="bg-gray-100 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={review.reviewerImage} alt="User" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{review.reviewerName}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(review.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <p className="mb-2 text-gray-700">{review.description}</p>
                            <p className="text-sm text-yellow-600">⭐ {review.rating} / 5</p>
                        </div>
                    ))) : (<h1 className=" text-gray-400">No one reviewed yet</h1>)
                    }
                </div>
            </div>
            {/* === Post Review Section (above the reviews) === */}
            {user && (
                <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-xl shadow mb-6">
                    <h3 className="text-xl font-semibold mb-2">Post a Review</h3>
                    <textarea
                        name="description"
                        placeholder="Write your review here"
                        className="textarea textarea-bordered w-full mt-4"
                        required
                    />
                    <div className="flex items-center gap-4 mt-4">
                        <p className="font-medium">Rating:</p>
                        <div className="rating rating-sm">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <input
                                    key={num}
                                    type="radio"
                                    value={num}
                                    name="rating"
                                    className="mask mask-star-2 bg-orange-400"
                                    aria-label={`${num} star`}
                                    checked={rating === num}
                                    onChange={() => setRating(num)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            value={user.photoURL}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button type="submit" className="btn bg-blue-900 text-white mt-4">
                        Submit Review
                    </button>
                </form>
            )}

        </div>
    );
};

export default ProductDetails;

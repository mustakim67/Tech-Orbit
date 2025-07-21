import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import loginImage from '../../../assets/authentication.jpg';
import useAxios from '../../../hooks/useAxios';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);

        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`, formData)
            .then(res => {
                const photoURL = res.data.data.url;

                createUser(data.email, data.password)
                    .then(async (userCredential) => {
                        const user = userCredential.user;

                        // Update Firebase user profile
                        await updateUserProfile({
                            displayName: data.name,
                            photoURL
                        });

                        // Save user info in your DB
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: 'user',
                            created_at: new Date(),
                            last_log_in: new Date()
                        };

                        await axiosInstance.post('/users', userInfo);

                        Swal.fire({
                            icon: 'success',
                            title: 'Sign Up Successful!',
                            text: 'Welcome!',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate(from);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Sign Up Failed',
                            text: 'Email already in use',
                        });
                    });
            });
    };



    return (
        <div className='bg-gradient-to-br from-blue-50 to-white min-h-screen'>
            <div className="md:py-60 flex items-center justify-center px-[5%] py-30 md:px-[10%]">
                <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden">

                    {/* Left */}
                    <div className="md:w-[40%] bg-blue-100 flex items-center justify-center p-6">
                        <img src={loginImage} alt="Register" className="w-full h-auto max-h-[400px]" />
                    </div>

                    {/* Right */}
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Create Account</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', { required: 'Password is required' })}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-700 mb-1">Upload Profile Picture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('photo', { required: 'Profile photo is required' })}
                                    className="file-input file-input-bordered w-full"
                                />
                                {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                            </div>
                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full btn bg-[#1E3A8A] text-white py-2 rounded-xl"
                            >
                                Register
                            </button>

                            <p className="text-sm text-center text-gray-600 mt-4">
                                Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

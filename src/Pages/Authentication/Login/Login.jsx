import { useForm } from 'react-hook-form';
import { useState } from 'react';
import loginImage from '../../../assets/authentication.jpg';
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Login = () => {
    const { GoogleSignIn, signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from || '/';

    //email password login
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                console.log("Sign-in success:", res);
                navigate(from);
            })
            .catch(error => {
                console.error("Sign-in failed:", error);
            });
    };

    //Social Login
    const handleGoogleSignIn = () => {
        GoogleSignIn()
            .then(async (res) => {
                console.log(res);
                const user = res.user;
                //update user info in the database
                const userInfo = {
                    email: user.email,
                    role: 'user', 
                    created_at: new Date(),
                    last_log_in: new Date()
                }
                const result = await axiosInstance.post('/users', userInfo);
                console.log('user Update info:', result.data)
                navigate(from);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='bg-gradient-to-br from-blue-50 to-white'>
            <div className="md:py-60 flex items-center justify-center px-[5%] py-30 md:px-[10%]">
                <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden">

                    {/* Left Side */}
                    <div className="md:w-[40%] bg-blue-100 flex items-center justify-center p-6">
                        <img
                            src={loginImage}
                            alt="Login Illustration"
                            className="w-full h-auto max-h-[400px]"
                        />
                    </div>

                    {/* Right Side */}
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Welcome Back</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                                        title={showPassword ? "Hide Password" : "Show Password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full btn bg-[#1E3A8A] text-white py-2 rounded-xl transition duration-300"
                            >
                                Login
                            </button>

                            {/* Divider */}
                            <div className="divider">OR</div>

                            {/* Google Sign-In */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                            >
                                <FcGoogle className="text-xl mr-2" />
                                Continue with Google
                            </button>

                            {/* Register Link */}
                            <p className="text-sm text-center text-gray-600 mt-4">
                                Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

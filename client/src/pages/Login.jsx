import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiApple } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLockPassword } from 'react-icons/tb';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { api } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const validationRules = {
    fullname: {
        regex: /^[a-zA-Z\s'-]{3,20}$/,
        message: 'Full name must be 3 to 20 characters and contain only letters, spaces, hyphens, or apostrophes',
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Please provide a valid email address',
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message:
            'Password must be 8 characters and contain one uppercase letter, one lowercase letter, and one number',
    },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEye, setIsEye] = useState(false);
    const [errors, setErrors] = useState({ fullname: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleEye = () => {
        setIsEye((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ fullname: '', email: '', password: '' });
        setIsLoading(true);

        try {
            let hasError = false;
            const newErrors = { fullname: '', email: '', password: '' };

            if (!email) {
                newErrors.email = 'Email is required';
                hasError = true;
            } else if (!validationRules.email.regex.test(email)) {
                newErrors.email = validationRules.email.message;
                hasError = true;
            }

            if (!password) {
                newErrors.password = 'Password is required';
                hasError = true;
            } else if (!validationRules.password.regex.test(password)) {
                newErrors.password = validationRules.password.message;
                hasError = true;
            }

            if (hasError) {
                setErrors(newErrors);
                toast.error('Please fix the mistakes in the form');
                return;
            }

            const response = await api.post('/api/v1/user/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate('/');
                toast.success(response?.data?.message || 'Logged in successfully!');
            }
        } catch (error) {
            console.error('Registration error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            setErrors({
                ...errors,
                general: error.response?.data?.message || 'Failed to login, try again.',
            });
            toast.error(error.response?.data?.message || 'Failed to login, try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full border border-neutral-200 rounded-md bg-white p-6">
                <div className='mb-6'>
                    <h1 className="text-2xl font-bold text-neutral-700 ">
                        Welcome Back!
                    </h1>
                    <p className='text-sm text-neutral-400'>Login to access your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="border border-neutral-200 flex items-center justify-center gap-2 py-2 hover:bg-neutral-100 transition-colors duration-200"
                            onClick={() => toast((t) => (
                                <span>
                                    <button onClick={() => toast.dismiss(t.id)}>
                                        Google login coming soon
                                    </button>
                                </span>
                            ))}
                        >
                            <FcGoogle className="text-2xl" />
                            <span className="text-neutral-800 font-bold">Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => toast((t) => (
                                <span>
                                    <button onClick={() => toast.dismiss(t.id)}>
                                        Apple login coming soon
                                    </button>
                                </span>
                            ))}
                            className="border border-neutral-200 flex items-center justify-center gap-2 py-2hover:bg-neutral-100 transition-colors duration-200"
                        >
                            <SiApple className="text-2xl" />
                            <span className="text-neutral-800 font-bold">Apple</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 my-6">
                        <hr className="flex-grow border-t border-neutral-400" />
                        <span className="text-neutral-600 font-medium">OR</span>
                        <hr className="flex-grow border-t border-neutral-400" />
                    </div>

                    {errors.general && (
                        <p className="text-sm text-red-500 text-center">{errors.general}</p>
                    )}

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-neutral-700 text-sm">
                            Email
                        </label>
                        <div className="relative">
                            <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-xl" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrors({ ...errors, email: "" })
                                }}
                                placeholder="Eg: johnwick@gmail.com"
                                className="w-full border border-neutral-200 rounded-md outline-none pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {errors.email && (
                            <p id="email-error" className="text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="text-neutral-700 text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-xl" />
                            <input
                                type={isEye ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrors({ ...errors, password: "" })
                                }}
                                placeholder="Password"
                                className="w-full border border-neutral-200 rounded-md outline-none pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                            />
                            {isEye ? (
                                <IoEyeOffOutline
                                    onClick={handleEye}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 cursor-pointer"
                                />
                            ) : (
                                <IoEyeOutline
                                    onClick={handleEye}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 cursor-pointer"
                                />
                            )}
                        </div>
                        {errors.password && (
                            <p id="password-error" className="text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className=''>
                        <p
                            className='text-sm text-neutral-800 cursor-pointer'
                            onClick={() => toast((t) => (
                                <span>
                                    <button onClick={() => toast.dismiss(t.id)}>
                                        Under development, comming soon!
                                    </button>
                                </span>
                            ))}
                        >Forgot password?</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center py-2 rounded-md text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            } transition-colors duration-200`}
                    >
                        {isLoading ? (
                            <Loader2 className='text-neutral-700 animate-spin' />
                        ) : null}
                        {isLoading ? 'logging In...' : 'Login'}
                    </button>

                    <div className='text-center'>
                        <p className='text-sm text-neutral-800'>Don't have an account?<Link to='/sign-up' className=' hover:text-red-500 underline active:text-blue-600'>{" "} create one here</Link></p>
                        <Link to='/' className=' underline text-sm text-neutral-800'>Back to Home</Link>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Login;
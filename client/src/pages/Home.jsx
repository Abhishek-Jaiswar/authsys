import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks';

const Home = () => {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const navigate = useNavigate()

    // Remove the console.log to prevent spam

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout, refresh and try again");
        }
    }

    if (loading) {
        return (
            <div className='h-screen w-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto'></div>
                    <p className='mt-2 text-neutral-600'>Loading...</p>
                </div>
            </div>
        );
    }


    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='space-y-3'>
                <h1 className='text-4xl text-neutral-900 font-bold'>Welcome to Authsys</h1>
                <p className='text-sm text-neutral-700 font-semibold'>Full stack authentication system with best practises</p>

                {isAuthenticated ? (
                    <div className='space-y-5'>
                        <h1 className='text-2xl font-bold text-neutral-500'>Welcome, {user?.fullname || "User"}</h1>
                        <p className='text-sm text-neutral-600'>Email: {user?.email}</p>
                        {user?.googleId && (
                            <p className='text-xs text-blue-600'>Signed in with Google</p>
                        )}
                        <button
                            className='px-4 py-1.5 bg-neutral-800 text-white text-sm rounded-md hover:bg-neutral-700 transition-colors duration-200 cursor-pointer'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className=' flex items-center justify-center gap-2'>
                        <Link to='/login'>
                            <button className='px-4 py-1.5 border border-neutral-800 rounded-md text-sm cursor-pointer hover:text-neutral-50 hover:bg-neutral-800 transition-colors duration-200'>
                                Login
                            </button>
                        </Link>
                        <Link to='/sign-up'>
                            <button className='px-4 py-1.5 bg-neutral-800 text-white text-sm rounded-md hover:bg-neutral-700 transition-colors duration-200 cursor-pointer'>
                                Sign up
                            </button>
                        </Link>
                    </div >
                )}

            </div >
        </div >
    )
}

export default Home
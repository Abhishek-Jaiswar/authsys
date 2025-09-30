import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authenticated = user?.id

    const navigate = useNavigate()

    console.log(user);

    const handleLogout = async () => {
        try {
            const response = await api.post('/api/v1/user/logout')
            if (response.status === 200) {
                navigate('/login')
                localStorage.setItem("user", null);
                toast.success(response?.data?.message || "Logged out successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message || "Failed to logout, refresh and try again")
        }
    }


    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='space-y-3'>
                <h1 className='text-4xl text-neutral-900 font-bold'>Welcome to Authsys</h1>
                <p className='text-sm text-neutral-700 font-semibold'>Full stack authentication system with best practises</p>

                {authenticated ? (
                    <div className='space-y-5'>
                        <h1 className='text-2xl font-bold text-neutral-500'>Mr. {user?.username || "Unknown"}</h1>
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
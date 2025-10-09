import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Since the Google OAuth callback already set the cookie,
    // we just need to redirect to home and let the AuthContext handle the rest
    toast.success('Successfully signed in with Google!');
    navigate('/');
  }, [navigate]);

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
        <p className='mt-2 text-neutral-600'>Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

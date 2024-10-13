'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './provider/AuthContext';

const Page = () => {
  const router = useRouter();
  const {user, signIn } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
  
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
  
    const { data, error } = await signIn(email, password); // Calling the signIn function
  
    if (error) {
      setErrorMessage(error.message || 'Unknown error occurred');
    } else if (data) {
      router.push('/dashboard/overview'); // Redirect on successful signIn
    } else {
      setErrorMessage('No data returned from login'); // Handle error message
    }
  
    setLoading(false);
  };

  if(user){
    router.push('/dashboard/overview');
    return null;
  }
  

  return (
    <div className='mt-20'>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src="https://i.ibb.co/9Wmvqhy/logo-home.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-500 p-8 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleLogin} className="space-y-6" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="" className="font-semibold text-pink-600 hover:text-pink-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} {/* Display error message */}

            <div>
              <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            <div className="flex items-center">
              <hr className="flex-grow border-t border-black" />
              <div className="mx-4 text-black">Or continue with</div>
              <hr className="flex-grow border-t border-black" />
            </div>
          </form>

          <div className="flex items-center justify-center gap-4 mt-7 ">
            <button className="px-6 w-full justify-center items-center py-2 border flex gap-2 shadow-lg border-slate-200 rounded-lg text-black dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
              <span className='text-black text-base'>Google</span>
            </button>

            <button className="px-6 w-full py-2 justify-center items-center border flex gap-2 shadow-lg border-slate-200 rounded-lg text-black dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <img className="w-8 rounded-md h-5" src="https://e7.pngegg.com/pngimages/213/828/png-clipart-facebook-logo-facebook-messenger-logo-social-media-icon-facebook-icon-blue-text-thumbnail.png" loading="lazy" alt="facebook logo" />
              <span className='text-black text-base'>Facebook</span>
            </button>
          </div>

          <div className='flex justify-between items-center mt-10'>
            <p className="text-center text-sm text-gray-500">
              Not a member?
            </p>
            <Link href={'/registration'} className='text-sm text-gray-500 underline'>
              <p>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

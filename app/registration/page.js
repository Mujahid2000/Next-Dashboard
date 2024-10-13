'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { supabase, supabaseAdmin } from '../supabaseAuth';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [loading, setLoading] = useState(false);
  const routes = useRouter()
  const handleReg = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    console.log({ name, email, password });

    // Call signUp function to create a new user
    const { data, error } = await signUpNewUser(name, email, password);
    console.log(data, error);
    if (error) {
      setLoading(false);
      toast.error(error.message);
      console.log('Error during signup:', error);
    } else {
      const { user } = data;
      toast.success('successfully login')
      routes.push('/dashboard/overview')
    {
  toast.error('No user returned from signup process');
  console.log('No user returned from signup');
}


      setLoading(false);
      
    }
  };

  // Function to handle sign-up with Supabase
  const signUpNewUser = async (name, email, password) => {
    console.log(name);
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {name:name},
      password,
      options: {
      emailRedirectTo: 'https://next-dashboard-sepia-chi.vercel.app/dashboard/overview',
      },
    });

    return { data, error };
  };

  return (
    <div className="flex max-h-screen h-fit flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto mt-12 sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-20 h-20"
          src="https://i.ibb.co/9Wmvqhy/logo-home.png"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-500 p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleReg} className="space-y-5" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="text-sm">
            <a href="#" className="font-semibold text-pink-600 hover:text-pink-500">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </div>
          <div className="flex items-center">
            <hr className="flex-grow border-t border-black" />
            <div className="mx-4">Or continue with</div>
            <hr className="flex-grow border-t border-black" />
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 mt- ">
          <button className="px-6 w-full justify-center items-center py-2 border flex gap-2 shadow-lg border-slate-200 rounded-lg text-black hover:shadow transition duration-150">
            <img
              className="w-5 h-5"
              width={25}
              height={25}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
            />
            <span className="text-black text-base">Google</span>
          </button>

          <button className="px-6 w-full py-2 justify-center items-center border flex gap-2 shadow-lg border-slate-200 rounded-lg text-black hover:shadow transition duration-150">
            <img
              className="w-8 rounded-md h-5"
              width={25}
              height={25}
              src="https://i.ibb.co/ZfbcWtn/facebook.png"
              alt="facebook logo"
            />
            <span className="text-black text-base">Facebook</span>
          </button>
        </div>

        <div className="flex justify-between items-center mt-10">
          <p className="text-center text-sm text-gray-500">Not a member?</p>
          <Link href={"/signIn"} className="text-sm text-gray-500 underline">
            <p>SignIn</p>
          </Link>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            success: "text-green-400",
          },
        }}
      />
    </div>
  );
};

export default Page;

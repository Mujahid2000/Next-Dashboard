'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseAuth';
import { useRouter } from 'next/navigation'; 
import PrivateRoute from '../provider/PrivateRoute';

const Page = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [userData, setUserData] = useState();
  const router = useRouter(); //

  // Function to toggle sidebar for responsive
  const toggleSidebar = async () => {
    setOpenMenu(!openMenu);
  };

  // implement to get the current user
  async function getCurrentUser() {
    return await supabase.auth.getUser();
  }

  // Fetch the user data when the component is mounted
  useEffect(() => {
    const res = getCurrentUser();
    res.then((data) => setUserData(data?.data?.user?.user_metadata));
  }, []);

  // Function  logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/'); // Redirect to login page after logout
    } else {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <PrivateRoute>
    <div className="flex flex-col h-screen">
    
      <header className="bg-[#2E2E48] h-20 fixed w-full z-50 flex items-center justify-between px-4 md:px-8 shadow-md">
        <div className="flex items-center space-x-2">
          <img
            className="w-9 h-9"
            src="https://i.ibb.co/bzwmrds/Group-302.png"
            alt="logo"
          />
          <h1 className="text-xl text-white">Dashboard</h1>
        </div>
        <p>{userData?.name}</p>

        
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <div className="flex mt-12 md:mt-20 flex-1">
       
        <aside className={`z-40 flex flex-col justify-between md:w-64 w-64 fixed h-full transform transition-transform duration-300 ease-in-out bg-[#2E2E48] shadow-lg ${openMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex flex-col h-full">
            <nav className="mt-10 flex-grow">
              <Link href="/dashboard/overview">
                <p className="block py-2.5 px-4 text-white hover:bg-[#475BE8]">Overview</p>
              </Link>
              <Link href="/dashboard/order">
                <p className="block py-2.5 px-4 text-white hover:bg-[#475BE8]">Orders</p>
              </Link>
            </nav>

          
            <div className="p-4 mb-20">
              <button
                className="w-full py-2 px-4 bg-red-600 hover:duration-300 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-[#383854] p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
    </PrivateRoute>

  );
};

export default Page;

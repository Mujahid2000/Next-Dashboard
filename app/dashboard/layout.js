'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseAuth';
import { useRouter } from 'next/navigation';
import PrivateRoute from '../provider/PrivateRoute';

const Page = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [userData, setUserData] = useState();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);




  //  toggle sidebar for responsive
  const toggleSidebar = () => {
    setOpenMenu(!openMenu);
  };

  // get the current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await supabase.auth.getUser();
      setUserData(res?.data?.user?.user_metadata);
    };
    getCurrentUser();
  }, []);

  // logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/'); // Redirect to the login page after logout
    } else {
      console.error('Error during logout:', error.message);
    }
  };

  useEffect(() =>{
    const handleClickOutSide= (event) =>{
      if(sidebarRef.current && !sidebarRef.current.contains(event.target) 
      && toggleButtonRef.current && 
    !toggleButtonRef.current.contains(event.target)
      ){
        setOpenMenu(false)
      }
    }
    if(openMenu){
      document.addEventListener('mousedown', handleClickOutSide);
    }else{
      document.addEventListener('mousedown', handleClickOutSide);
    }
    return() =>{
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  },[openMenu])

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
          <p className="text-white">{userData?.name}</p>

          
          <button
            className="text-white lg:hidden focus:outline-none"
            ref={toggleButtonRef}
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        
        <div className="flex mt-20 flex-1">
          {/* Sidebar */}
          <aside
          ref={sidebarRef}
            className={`z-40 flex flex-col justify-between md:w-64 w-64 fixed h-full transform transition-transform duration-300 ease-in-out bg-[#2E2E48] shadow-lg ${
              openMenu ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}
          >
            <div className="flex flex-col h-full">
             
              <nav className="mt-10 flex-grow">
                <Link href="/dashboard/overview">
                  <p className="block py-2.5 px-4 text-white hover:bg-[#475BE8] cursor-pointer">
                    Overview
                  </p>
                </Link>
                <Link href="/dashboard/order">
                  <p className="block py-2.5 px-4 text-white hover:bg-[#475BE8] cursor-pointer">
                    Orders
                  </p>
                </Link>
              </nav>

              {/* Logout Button */}
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

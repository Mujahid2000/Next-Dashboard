'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../provider/AuthContext'; // Import the useAuth hook

const PrivateRoute = ({ children }) => {
    const { user } = useAuth(); // Get the user from AuthContext
    const [loading, setLoading] = useState(true); // loading state
    const router = useRouter();
    const pathname = usePathname(); // Get current pathname

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                // User is logged in
                const redirectPath = pathname || '/dashboard/overview'; 
                router.push(redirectPath); // Redirect to the desired page
            } else {
                router.push('/'); // Redirect to home page if user not found
            }
            setLoading(false); // Set loading false after the check
        };

        fetchUser();
    }, [user, router, pathname]); // Added user, pathname, and router dependencies

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            {user ? children : null} 
        </>
    );
};

export default PrivateRoute;

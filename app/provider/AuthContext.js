'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseAdmin } from '../supabaseAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // For showing loading states

    useEffect(() => {
        // Fetch the current session
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log('Error fetching session', error.message);
                return;
            }
            if (data.session) {
                setUser(data.session.user);
            }
        };

        fetchSession();

        // Subscribe to auth state changes
        const { data: authListener, error } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on component unmount
        return () => {
            if (authListener && typeof authListener.unsubscribe === 'function') {
                authListener.unsubscribe();
            } else {
                console.log('Auth listener not found or invalid');
            }
        };
    }, []);

    // Sign up function
    const signUp = async (email, password) => {
        setLoading(true);
        try {
            const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password
            });
            if (error) throw error;
            console.log('User signed up successfully', data);
        } catch (error) {
            console.error('Error signing up:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Sign in function
    const signIn = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          
          if (error) {
            console.error('Error signing in:', error.message);
            return { error }; // Return error object if there's an error
          }
          
          return { data }; // Return data if login is successful
        } catch (err) {
          console.error('Unexpected error:', err);
          return { error: err }; // Handle unexpected errors
        }
      };
      

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

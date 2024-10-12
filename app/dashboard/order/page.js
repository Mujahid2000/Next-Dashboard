'use client';
import { supabase } from '@/app/supabaseAuth';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

const Page = () => {
  const [userData, setUserData] = useState();


async function getCurrentUser() {
  return await supabase.auth.getUser();
}

useEffect(() => {
  const res = getCurrentUser();
  res.then((data) => setUserData(data?.data?.user.email));
}, []);



const insertOrder = async (productName, priceGroup, quantity) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productName,
      priceGroup,
      quantity,
      email: userData, 
    }),
  });

  const data = await response.json();
  if (response.ok) {
    toast.success('Order inserted successfully');
    console.log('Order inserted:', data);
  } else {
    console.error('Error inserting order:', data.message);
  }
};



// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const productName = form.get('productName');
  const quantity = form.get('quantity');
  const priceGroup = form.get('priceGroup');

  // Call insertOrder function
  await insertOrder(productName, priceGroup, quantity);
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Order Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Type Product Name"
            className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            className="mt-1 block w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="priceGroup"
            className="block text-sm font-medium text-gray-700"
          >
            Price Group
          </label>
          <select
            id="priceGroup"
            name="priceGroup"
            className="w-full py-3 px-2 text-gray-700 rounded-md"
            required
          >
            <option value="">Select</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
            <option value="Group C">Group C</option>
            <option value="Group D">Group D</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 hover:duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Order
          </button>
        </div>
      </form>
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

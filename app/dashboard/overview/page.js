'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/provider/AuthContext';
import { supabase } from '@/app/supabaseAuth';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState({});
  const { user } = useAuth();
  const email = user?.email;

  // Fetch orders when the email is available
  useEffect(() => {
    if (email) {
      fetchOrder();
    }
  }, [email]);

  // Function to fetch orders
  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Fetched orders:', data.orders);
        setOrders(data.orders);
        preparePieData(data.orders); // Prepare pie chart data
      } else {
        console.error('Error fetching orders:', data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Prepare pie chart data
  const preparePieData = (orders) => {
    const groupData = orders.reduce((acc, order) => {
      const { priceGroup, quantity } = order;
      acc[priceGroup] = (acc[priceGroup] || 0) + quantity;
      return acc;
    }, {});

    const pieDataArray = Object.entries(groupData).map(([name, value]) => ({ name, value }));
    setPieData(pieDataArray);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('/api/orders', { data: { id } });
      console.log('Deleted order:', response.data);
      await fetchOrder(); // Re-fetch orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error.response?.data?.message || error.message);
    }
  };

  // Function to handle edit action
  const handleEdit = (id) => {
    setEditingOrderId(id);
    const order = orders.find((o) => o.id === id);
    if (order) {
      setEditedQuantity((prev) => ({ ...prev, [id]: order.quantity }));
    }
  };

  // Handle quantity input change
  const handleInputChange = (id, value) => {
    setEditedQuantity((prev) => ({ ...prev, [id]: value }));
  };

  // Update quantity number
  const saveEdit = async (id) => {
    try {
      const response = await axios.put('/api/orders', {
        id,
        quantity: editedQuantity[id],
      });
      console.log('Updated order data:', response.data);
      await fetchOrder(); // Re-fetch orders after update
      setEditingOrderId(null);
    } catch (error) {
      console.error('Error updating order data:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-6">
        {/* Line Chart */}
        <div className="shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Over Time (Line Chart)</h2>
          <ResponsiveContainer width={250} height={250}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue (Bar Chart)</h2>
          <ResponsiveContainer width={250} height={250}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        {
          orders.length > 0 ? 
          (<div className="shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Monthly Orders (Pie Chart)</h2>
          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>):
        (
        <h2 className='text-lg font-semibold py-4'>No Order Available</h2>          
        )
        }
        
      </div>

      <h1 className="text-2xl font-bold mb-4 text-white py-6 text-center">Order List</h1>
      <div className="w-96 scroll-m-1 md:w-full  overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Group</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No orders found</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order.id} className={`border-t hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 text-gray-700">{order.productName}</td>
                  <td className="px-6 py-4 text-gray-700">{order.priceGroup}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {editingOrderId === order.id ? (
                      <input
                        type="number"
                        value={editedQuantity[order.id] || ''}
                        onChange={(e) => handleInputChange(order.id, e.target.value)}
                        className="border px-2 py-1 w-16"
                      />
                    ) : (
                      order.quantity
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-5">
                    {/* Edit Button */}
                    {editingOrderId === order.id ? (
                      <button onClick={() => saveEdit(order.id)} className="text-green-600 hover:text-green-800">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(order.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;

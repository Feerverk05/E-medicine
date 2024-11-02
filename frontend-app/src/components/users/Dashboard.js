import React from 'react';

export default function Dashboard()
{
    return
    (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">E-Medicine (Admin Panel)</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <span className="text-gray-300">Welcome admin</span>
        <a href="#" className="hover:text-gray-300">Medicine Management</a>
        <a href="#" className="hover:text-gray-300">Customer Management</a>
        <a href="#" className="hover:text-gray-300">Order Management</a>
        <button className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded">
          Logout
        </button>
      </div>
    </nav>
    )
}
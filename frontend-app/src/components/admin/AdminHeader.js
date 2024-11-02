// components/admin/AdminHeader.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/admin" className="text-xl font-bold text-gray-800">
                EMedicinesBE Admin
              </Link>
            </div>
            <div className="flex space-x-8 ml-10">
              <Link
                to="/admin/medicines"
                className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
              >
                Medicines
              </Link>
              <Link
                to="/admin/orders"
                className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
              >
                Orders
              </Link>
              <Link
                to="/admin/customers"
                className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-900"
              >
                Customers
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
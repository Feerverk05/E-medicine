// components/admin/Medicine.js
import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    unitPrice: '',
    discount: '',
    quantity: '',
    expiry: '',
    imageUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const resetForm = () => {
    setFormData({
      name: '',
      manufacturer: '',
      unitPrice: '',
      discount: '',
      quantity: '',
      expiry: '',
      imageUrl: ''
    });
    setIsEditing(false);
    setSelectedId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.addUpdateMedicine({
        ...formData,
        id: selectedId,
      });
      
      if (response.data.success) {
        resetForm();
        fetchMedicines();
      }
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const fetchMedicines = async () => {
    try {
      // Assuming there's an endpoint to get medicines list
      const response = await api.getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleEdit = (medicine) => {
    setFormData({
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      unitPrice: medicine.unitPrice,
      discount: medicine.discount,
      quantity: medicine.quantity,
      expiry: medicine.expiry,
      imageUrl: medicine.imageUrl
    });
    setSelectedId(medicine.id);
    setIsEditing(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? 'Edit Medicine' : 'Add New Medicine'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full rounded-md border p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                className="mt-1 block w-full rounded-md border p-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({...formData, discount: e.target.value})}
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                  className="mt-1 block w-full rounded-md border p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="mt-1 block w-full rounded-md border p-2"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 rounded-md bg-blue-600 py-2 text-white hover:bg-blue-500"
              >
                {isEditing ? 'Update' : 'Add'} Medicine
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-md bg-gray-600 py-2 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Medicines List Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Medicines List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${medicine.unitPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{medicine.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5000';

const globalStyles = `
@media (min-width: 1200px){
  body {
    font-size: 16px;
    background-color: #f8f9fa;
  }
  .form-control {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
  .btn {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
  .table {
    font-size: 1.2rem;
  }
  .table th {
    font-size: 1.3rem;
    padding: 1.2rem 1rem;
  }
  .table td {
    padding: 1.2rem 1rem;
    vertical-align: middle;
  }
  .card-title {
    font-size: 1.8rem;
    font-weight: 600;
  }
  .navbar-brand {
    font-size: 1.8rem;
    font-weight: 600;
  }
  .nav-link {
    font-size: 1.3rem;
    padding: 1rem 1.5rem !important;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .nav-link:hover {
    background-color: rgba(255,255,255,0.1);
    border-radius: 4px;
  }
  .header-icon {
    font-size: 1.4rem;
    margin-right: 0.5rem;
  }
  .admin-header {
    padding: 1.5rem 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .card {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border: none;
    border-radius: 8px;
  }
  .card-header {
    background: #fff;
    border-bottom: 2px solid #f0f0f0;
    padding: 1.5rem;
  }
  .table-header {
    background-color: #2a5298 !important;
    color: white;
  }
  .action-buttons .btn {
    padding: 0.8rem 1rem;
    margin: 0 0.3rem;
    font-size: 1.1rem;
  }
  .table-container {
    margin-top: 2rem;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  .table-responsive {
    padding: 1rem;
  }
  .medicine-actions {
    min-width: 150px;
  }
  .empty-table-message {
    padding: 2rem;
    font-size: 1.3rem;
  }
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
    transition: background-color 0.3s ease;
  }
}
`;
const Medicine = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    manufacturer: '',
    unitPrice: '',
    discount: '',
    quantity: '',
    expDate: '',
    image: null,
    type: 'string',
    status: 0
  });

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.type === 'file' 
      ? e.target.files[0] 
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        formDataToSend.append('image', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/products/${formData.id}` : `${API_URL}/products`;

    try {
      const response = await fetch(url, {
        method: method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to save medicine');
      await fetchMedicines();
      handleReset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (medicine) => {
    setFormData({
      ...medicine,
      image: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({
      id: 0,
      name: '',
      manufacturer: '',
      unitPrice: '',
      discount: '',
      quantity: '',
      expDate: '',
      image: null,
      type: 'string',
      status: 0
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete medicine');
      await fetchMedicines();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToCustomerList = () => {
    navigate('/customers');
  };

  const handleNavigateToAdminOrders = () => {
    navigate('/adminorders');
  };

  const handleNavigateToLogin= () => {
    navigate('/'); 
};


  return (
    <div className="min-vh-100 bg-light">
      <style>{globalStyles}</style>
      <nav className="navbar admin-header">
        <div className="container">
          <span className="navbar-brand text-white d-flex align-items-center">
            <i className="bi bi-hospital header-icon"></i>
            E-Medicine Admin Panel
          </span>
          <div className="d-flex align-items-center gap-4">
            <div className="btn-group">
              <a className="nav-link text-white active">
                <i className="bi bi-capsule me-2"></i>
                Medicine
              </a>
              <a 
                className="nav-link text-white-50" 
                onClick={handleNavigateToCustomerList}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-people me-2"></i>
                Statistic
              </a>
              <a className="nav-link text-white-50" 
              onClick={handleNavigateToAdminOrders}
                  style={{ cursor: 'pointer' }}>
                <i className="bi bi-cart me-2"></i>
                Orders
              </a>
              <a className="nav-link text-white-50" 
              onClick={handleNavigateToLogin}
              style={{ cursor: 'pointer' }}>
                <i className="bi bi-cart me-2"></i>
                LogOut
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-capsule me-2"></i>
                Medicine Management
              </h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-download me-2"></i>
                  Export
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Medicine Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Manufacturer"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Manufacturer</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="UnitPrice"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Unit Price</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Discount (%)</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Quantity</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="dd-mm-yyyy"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Expiry Date</label>
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-4">
                <div className="col-md-6">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    <i className="bi bi-save me-2"></i>
                    {formData.id ? 'Update Medicine' : 'Add Medicine'}
                  </button>
                </div>
                <div className="col-md-6">
                  <button 
                    type="button" 
                    className="btn btn-danger w-100"
                    onClick={handleReset}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Reset Form
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <div className="table-responsive mt-4">
              <table className="table table-hover">
                <thead className="table-header">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Exp Date</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td>{index + 1}</td>
                      <td>{medicine.name}</td>
                      <td>{medicine.manufacturer}</td>
                      <td>${medicine.unitPrice}</td>
                      <td>{medicine.discount}%</td>
                      <td>{medicine.quantity}</td>
                      <td>{medicine.expDate}</td>
                      <td>
                        {medicine.image && (
                          <img 
                            src={`${API_URL}/uploads/${medicine.image}`} 
                            alt={medicine.name}
                            className="rounded"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        )}
                      </td>
                      <td className="action-buttons">
                        <button 
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(medicine)}
                        >
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(medicine.id)}
                        >
                          <i className="bi bi-trash"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {medicines.length === 0 && !loading && (
                    <tr>
                      <td colSpan={9} className="text-center text-muted py-4">
                        <i className="bi bi-inbox-fill me-2"></i>
                        No medicines found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
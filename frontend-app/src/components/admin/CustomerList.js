import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const API_URL = 'http://localhost:4000';
const globalStyles = `
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
  }

  .statistics-container {
    min-height: 100vh;
    width: 100vw;
    background: #f8f9fa;
    overflow-x: hidden;
  }

  .navbar-brand {
    font-size: 3rem;
    font-weight: 600;
  }

  .statistics-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 5 rem;
    margin-bottom: 5 rem;
    width: 100%;
  }

  .nav-link {
    font-size: 10 rem;
    padding: 1rem 1.5rem !important;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .nav-link:hover {
    background-color: rgba(255,255,255,0.1);
    border-radius: 4px;
  }

  .header-icon {
    font-size: 10rem;
    margin-right: 1 rem;
  }
  
  .statistics-header {
    width: 100%;
    padding: 1.5rem 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .chart-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2a5298;
  }
  
  .total-sales {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    width: 100%;
  }

  .admin-header {
    padding: 1.5rem 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .total-sales h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .total-sales p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
  }

  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .statistics-card {
      padding: 1rem;
    }
    
    .chart-title {
      font-size: 1.2rem;
    }
  }
`;

const CustomerList = () => {
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
  
    useEffect(() => {
      const fetchSalesData = async () => {
        try {
          const response = await fetch(`${API_URL}/sales/statistics`);
          if (!response.ok) {
            throw new Error('Помилка завантаження даних продажів');
          }
          const data = await response.json();
          setSalesData(data.sales);
          setTotalSales(data.totalSales);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchSalesData();
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        </div>
      );
    }
  
    const handleNavigateToAdminOrders = () => {
      navigate('/adminorders');
    };
  
    const handleNavigateToCustomerList = () => {
      navigate('/customers');
    };

    const handleNavigateToMedicine = () => {
        navigate('/medicine');
      };
    
      const handleNavigateToLogin= () => {
        navigate('/'); 
    };
  
    return (
      <div className="statistics-container">
        <style>{globalStyles}</style>
        
        <nav className="navbar admin-header">
          <div className="container mx-auto px-4 flex justify-between">
            <span className="navbar-brand text-white d-flex align-items-center">
              <i className="bi bi-hospital header-icon"></i>
              E-Medicine Admin Panel
            </span>
            <div className="d-flex align-items-center gap-4">
              <div className="btn-group">
                <a className="nav-link text-white active"
                onClick={handleNavigateToMedicine}
                style={{ cursor: 'pointer' }}>
                  <i className="bi bi-capsule me-10"></i>
                  Medicine
                </a>
                <a 
                  className="nav-link text-white-50" 
                  onClick={handleNavigateToCustomerList}
                  style={{ cursor: 'pointer' }}>
                  <i className="bi bi-people me-2"></i>
                  Statistic
                </a>
                <a 
                  className="nav-link text-white-50" 
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
  
        <div className="container mx-auto px-4">
          <div className="total-sales">
            <h3>Загальні продажі</h3>
            <p>{totalSales} одиниць</p>
          </div>
  
          <div className="statistics-card">
            <h2 className="chart-title">Продажі за типами ліків</h2>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="medicine" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#2a5298" name="Кількість проданих" />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
          <div className="statistics-card">
            <h2 className="chart-title">Тренд продажів</h2>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="quantity" 
                  stroke="#2a5298" 
                  name="Кількість проданих"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          <div className="statistics-card">
            <h2 className="chart-title">Детальні дані продажів</h2>
            <div className="table-container">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-gray-500">Ліки</th>
                    <th className="px-6 py-3 text-left text-gray-500">Кількість</th>
                    <th className="px-6 py-3 text-left text-gray-500">Дата</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {salesData.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{sale.medicine}</td>
                      <td className="px-6 py-4">{sale.quantity}</td>
                      <td className="px-6 py-4">
                        {new Date(sale.date).toLocaleDateString()}
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
  
  export default CustomerList;
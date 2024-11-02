import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:9000';

// Визначаємо CSS стилі окремо
const customStyles = `
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
`;

const globalStyles = {
  container: "container-fluid p-0",
  header: "bg-primary text-white py-4 px-4 mb-4",
  headerContent: "container",
  headerNav: "nav nav-pills gap-2",
  headerButton: (isActive) => `nav-link ${isActive ? 'active' : ''}`,
  navBar: "navbar admin-header",
  navBarContainer: "container mx-auto px-4",
  navBrand: "navbar-brand text-white d-flex align-items-center fs-10",
  statsCard: "card h-100",
  statsCardBody: "card-body",
  statsValue: "display-4 fw-bold",
  filterContainer: "card mb-4",
  filterBody: "card-body",
  filterSelect: "form-select",
  tableContainer: "card",
  tableResponsive: "table-responsive",
  table: "table table-hover align-middle",
  tableStatus: (status) => {
    const statusClasses = {
      completed: 'bg-success',
      pending: 'bg-warning',
      cancelled: 'bg-danger'
    };
    return `badge ${statusClasses[status]} text-white`;
  },
  actionButton: (variant) => `btn btn-${variant} btn-sm`,
  actionButtonGroup: "btn-group",
  loadingSpinner: "spinner-border text-primary",
  errorAlert: "alert alert-danger"
};

const AdminOrders = () => {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activePage, setActivePage] = useState('orders');

  useEffect(() => {
    fetchOrders();
  }, []);

  
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (!response.ok) throw new Error('Помилка завантаження замовлень');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Помилка видалення замовлення');
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Помилка оновлення статусу');
      const updatedOrder = await response.json();
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className={globalStyles.loadingSpinner} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className={globalStyles.errorAlert} role="alert">
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
    <div className="min-vh-100 bg-light">
      <style>{customStyles}</style>
      <nav className="navbar admin-header">
        <div className="container">
          <span className="navbar-brand text-white d-flex ">
            <i className="bi bi-hospital header-icon"></i>
            E-Medicine Admin Panel
          </span>
          <div className="d-flex align-items-center gap-4">
            <div className="nav nav-pills">
              <a 
                className={`nav-link text-white ${activePage === 'medicine' ? 'active' : ''}`}
                onClick={handleNavigateToCustomerList}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-capsule me-2"></i>
                Medicine
              </a>
              <a 
                className={`nav-link text-white ${activePage === 'customers' ? 'active' : ''}`}
                onClick={handleNavigateToCustomerList}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-people me-2"></i>
                Statistic
              </a>
              <a 
                className={`nav-link text-white ${activePage === 'orders' ? 'active' : ''}`}
                onClick={handleNavigateToAdminOrders}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-cart me-2"></i>
                Orders
              </a>
              <a 
                className="nav-link text-white"
                onClick={handleNavigateToLogin}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                LogOut
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row mb-4 g-4">
          <div className="col-md-4">
            <div className={globalStyles.statsCard}>
              <div className={globalStyles.statsCardBody}>
                <h6 className="card-subtitle mb-2 text-muted">Всього замовлень</h6>
                <p className={`${globalStyles.statsValue} text-primary`}>{totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={globalStyles.statsCard}>
              <div className={globalStyles.statsCardBody}>
                <h6 className="card-subtitle mb-2 text-muted">Виконані</h6>
                <p className={`${globalStyles.statsValue} text-success`}>{completedOrders}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={globalStyles.statsCard}>
              <div className={globalStyles.statsCardBody}>
                <h6 className="card-subtitle mb-2 text-muted">В очікуванні</h6>
                <p className={`${globalStyles.statsValue} text-warning`}>{pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={globalStyles.filterContainer}>
          <div className={globalStyles.filterBody}>
            <select
              className={globalStyles.filterSelect}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Всі замовлення</option>
              <option value="pending">В очікуванні</option>
              <option value="completed">Виконані</option>
              <option value="cancelled">Скасовані</option>
            </select>
          </div>
        </div>

        <div className={globalStyles.tableContainer}>
          <div className={globalStyles.tableResponsive}>
            <table className={globalStyles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Клієнт</th>
                  <th>Сума</th>
                  <th>Статус</th>
                  <th>Дата</th>
                  <th className="text-end">Дії</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.total} ₴</td>
                    <td>
                      <span className={globalStyles.tableStatus(order.status)}>
                        {order.status === 'completed' && 'Виконано'}
                        {order.status === 'pending' && 'В очікуванні'}
                        {order.status === 'cancelled' && 'Скасовано'}
                      </span>
                    </td>
                    <td>{new Date(order.date).toLocaleDateString('uk-UA')}</td>
                    <td>
                      <div className={`${globalStyles.actionButtonGroup} float-end`}>
                        {order.status !== 'completed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className={globalStyles.actionButton('success')}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                        )}
                        {order.status !== 'cancelled' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className={globalStyles.actionButton('danger')}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        )}
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className={globalStyles.actionButton('danger')}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
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

export default AdminOrders;
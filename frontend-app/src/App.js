import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/users/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Medicine from './components/admin/Medicine';
import CustomerList from './components/admin/CustomerList';
import AdminOrders from './components/admin/AdminOrders';

class App extends Component {
  render() {
    return (
      <Router>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Login />} />
            <Route path= '/admindashboard' element ={<AdminDashboard />} />
            <Route path= '/medicine' element ={<Medicine />} />
            <Route path= '/customers' element ={<CustomerList />} />
            <Route path= '/adminorders' element ={<AdminOrders />} />

            </Routes>
      </Router>
    );
  }
}

export default App;

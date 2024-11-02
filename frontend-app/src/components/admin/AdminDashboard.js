import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="navbar-brand">
                <h1 className="h5 mb-0">E-Medicine (Admin Panel)</h1>
            </div>

            <div className="d-flex align-items-center ms-auto">
                <span className="text-light me-3">Welcome admin</span>
                <Link to="/medicine" className="nav-link text-light me-3">
                    Medicine Management
                </Link>
                <Link to="/customers" className="nav-link text-light me-3">
                    Customer Management
                </Link>
                <Link to="/myorders" className="nav-link text-light me-3">
                    Order Management
                </Link>
                <button className="btn btn-success">Logout</button>
            </div>
        </nav>
    );
}

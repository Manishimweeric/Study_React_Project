import React from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage items and bids from here.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

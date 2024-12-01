import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/shared/LandingPage';
import ClientLogin from './components/client/ClientLogin';
import ClientSignup from './components/client/ClientSignup';
import ClientHome from './components/client/ClientHome';
import ClientNotifications from './components/client/ClientNotifications';
import ClientBids from './components/client/ClientBids';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminItems from './components/admin/AdminItems';
import AdminBids from './components/admin/AdminBids';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Client Routes */}
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/client-signup" element={<ClientSignup />} />
        <Route path="/client-home" element={<ClientHome />} />
        <Route path="/client-notifications" element={<ClientNotifications />} />
        <Route path="/client-bids" element={<ClientBids />} />
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-items" element={<AdminItems />} />
        <Route path="/admin-bids" element={<AdminBids />} />
      </Routes>
    </Router>
  );
}

export default App;

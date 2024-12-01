import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientNotifications = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Notifications</h2>
        <p>No new notifications at the moment.</p>
      </div>
      <Footer />
    </div>
  );
};

export default ClientNotifications;

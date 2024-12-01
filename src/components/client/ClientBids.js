import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientBids = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your Bids</h2>
        <p>You haven't placed any bids yet!</p>
      </div>
      <Footer />
    </div>
  );
};

export default ClientBids;

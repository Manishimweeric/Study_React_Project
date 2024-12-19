import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('https://backendauca-9b41fc378333.herokuapp.com/api/bidder/bidHistory');
        setBids(response.data);
      } catch (err) {
        setError('Failed to load bids. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Your Bids</h2>
        {loading ? (
          <p>Loading your bids...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : bids.length > 0 ? (
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bid ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bidder ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bid Amount</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.itemId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.bidderId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.bidAmount}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You haven't placed any bids yet!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ClientBids;

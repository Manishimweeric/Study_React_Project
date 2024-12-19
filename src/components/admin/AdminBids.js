import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';

const AdminBids = () => {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bids from the API
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

  // Handle bid approval
  const handleApprove = async (id) => {
    try {
      await axios.post(`https://backendauca-9b41fc378333.herokuapp.com/api/admin/bids/approve/${id}`);
      const updatedBids = bids.map((bid) =>
        bid.id === id ? { ...bid, status: 'Approved' } : bid
      );
      setBids(updatedBids);
      alert(`Bid approved successfully!`);
    } catch (err) {
      alert('Failed to approve bid. Please try again.');
    }
  };

  // Handle bid denial
  const handleDeny = async (id) => {
    try {
      await axios.post(`https://backendauca-9b41fc378333.herokuapp.com/api/admin/bids/deny/${id}`);
      const updatedBids = bids.map((bid) =>
        bid.id === id ? { ...bid, status: 'Denied' } : bid
      );
      setBids(updatedBids);
      alert(`Bid denied successfully!`);
    } catch (err) {
      alert('Failed to deny bid. Please try again.');
    }
  };

  // Handle sorting by status
  const handleSortByStatus = (status) => {
    setSortStatus(status);
  };

  // Handle search by phone number
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter bids based on phone number search and sorting status
  const filteredBids = bids
    .filter((bid) =>
      searchTerm ? bid.phone?.includes(searchTerm) : true
    )
    .filter((bid) =>
      sortStatus ? bid.status === sortStatus : true
    );

  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <div style={styles.mainContent}>
        <h2 style={styles.header}>Manage Bids</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />

        {/* Sort by Status */}
        <div style={styles.sortButtons}>
          <button
            onClick={() => handleSortByStatus('Approved')}
            style={styles.sortButton}
          >
            Show Approved
          </button>
          <button
            onClick={() => handleSortByStatus('Denied')}
            style={styles.sortButtonDeny}
          >
            Show Denied
          </button>
        </div>

        {/* Table with Bid Information */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Bidder ID</th>
              <th>Item ID</th>
              <th>Bid Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBids.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.bidderId}</td>
                <td>{bid.itemId}</td>
                <td>${bid.bidAmount}</td>
                <td>
                  <span style={bid.status === 'Approved' ? styles.approved : bid.status === 'Denied' ? styles.denied : styles.pending}>
                    {bid.status}
                  </span>
                </td>
                <td>
                  {bid.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(bid.id)}
                        style={styles.approveButton}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeny(bid.id)}
                        style={styles.denyButton}
                      >
                        Deny
                      </button>
                    </>
                  ) : (
                    <span style={styles.statusLabel}>{bid.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f9',
    paddingBottom: '50px',
  },
  mainContent: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '30px',
  },
  searchInput: {
    padding: '8px 15px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    marginBottom: '20px',
    transition: 'border 0.3s',
  },
  table: {
    width: '90%',
    margin: '0 auto',
    marginTop: '20px',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  approved: {
    color: 'green',
    fontWeight: 'bold',
  },
  denied: {
    color: 'red',
    fontWeight: 'bold',
  },
  pending: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  approveButton: {
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  denyButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  statusLabel: {
    fontWeight: 'bold',
    color: 'green',
  },
};

export default AdminBids;

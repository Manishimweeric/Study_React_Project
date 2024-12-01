import React, { useState } from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';

const AdminBids = () => {
  // Example bids data, each bid will have a phone number
  const [bids, setBids] = useState([
    { id: 1, client: 'John Doe', item: 'Item 1', amount: 150, status: 'Pending', phone: '123-456-7890' },
    { id: 2, client: 'Jane Smith', item: 'Item 2', amount: 200, status: 'Pending', phone: '987-654-3210' },
    { id: 3, client: 'Mike Johnson', item: 'Item 3', amount: 250, status: 'Approved', phone: '555-555-5555' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStatus, setSortStatus] = useState('');

  // Handle bid approval
  const handleApprove = (id) => {
    const updatedBids = bids.map((bid) =>
      bid.id === id ? { ...bid, status: 'Approved' } : bid
    );
    setBids(updatedBids);
    alert(`Bid on ${bids.find(bid => bid.id === id).item} by ${bids.find(bid => bid.id === id).client} has been approved!`);
  };

  // Handle bid denial
  const handleDeny = (id) => {
    const updatedBids = bids.map((bid) =>
      bid.id === id ? { ...bid, status: 'Denied' } : bid
    );
    setBids(updatedBids);
    alert(`Bid on ${bids.find(bid => bid.id === id).item} by ${bids.find(bid => bid.id === id).client} has been denied.`);
  };

  // Handle sorting by status
  const handleSortByStatus = (status) => {
    setSortStatus(status);
    const filteredBids = bids.filter(bid => bid.status === status);
    setBids(filteredBids);
  };

  // Handle search by phone number
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter bids based on phone number search
  const filteredBids = bids.filter((bid) =>
    bid.phone.includes(searchTerm)
  );

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
              <th>Client</th>
              <th>Item</th>
              <th>Bid Amount</th>
              <th>Status</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBids.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.client}</td>
                <td>{bid.item}</td>
                <td>${bid.amount}</td>
                <td>
                  <span style={bid.status === 'Approved' ? styles.approved : bid.status === 'Denied' ? styles.denied : styles.pending}>
                    {bid.status}
                  </span>
                </td>
                <td>{bid.phone}</td>
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
  sortButtons: {
    marginBottom: '20px',
  },
  sortButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  sortButtonDeny: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  table: {
    width: '90%',
    margin: '0 auto',
    marginTop: '20px',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'center',
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

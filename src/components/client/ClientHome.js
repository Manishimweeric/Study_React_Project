import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientHome = () => {
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to manage bid amounts for each item
  const [bids, setBids] = useState({});

  // Example items data
  const items = [
    { id: 1, name: 'Item 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item 2', price: 150, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item 3', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Item 4', price: 250, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Item 5', price: 300, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Item 6', price: 350, image: 'https://via.placeholder.com/150' },
  ];

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle bid change for each item
  const handleBidChange = (itemId, value) => {
    setBids(prevBids => ({
      ...prevBids,
      [itemId]: value,
    }));
  };

  const handleBidSubmit = (item) => {
    const bidAmount = bids[item.id] || 0;
    if (bidAmount < item.price) {
      alert('Your bid must be greater than or equal to the item price');
    } else {
      alert(`You placed a bid of $${bidAmount} on ${item.name}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
        <h1>Welcome, Client!</h1>
        <p>Search for items to bid on:</p>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '50%',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        {/* Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <h3 style={{ margin: '10px 0' }}>{item.name}</h3>
                <p style={{ margin: '10px 0', fontWeight: 'bold' }}>${item.price}</p>
                
                {/* Bid Input */}
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bids[item.id] || ''}
                  onChange={(e) => handleBidChange(item.id, e.target.value)}
                  style={{
                    padding: '10px',
                    width: '90%',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                  }}
                />
                
                {/* Bid Button */}
                <button
                  onClick={() => handleBidSubmit(item)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Bid
                </button>
              </div>
            ))
          ) : (
            <p>No items match your search.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientHome;

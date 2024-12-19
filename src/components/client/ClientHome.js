import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientHome = () => {
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState('');

  // State to manage items fetched from the backend
  const [items, setItems] = useState([]);

  // State to manage bid amounts for each item
  const [bids, setBids] = useState({});

  // Fetch items from the backend on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://backendauca-9b41fc378333.herokuapp.com/api/admin/items'); // Replace with your API URL
        setItems(response.data); // Store fetched items in the state
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

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

  const handleBidSubmit = async (item) => {
    const bidAmount = bids[item.id] || 0;
  
    if (bidAmount < item.price) {
      alert('Your bid must be greater than or equal to the item price');
      return;
    }
  
    // Retrieve the userId from localStorage
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert('User not logged in. Please log in to place a bid.');
      return;
    }
  
    // Prepare the bid data
    const bidData = {
      itemId: item.id, // Ensure the backend expects this field
      bidAmount: bidAmount,
      bidderId: userId, // Add the userId from localStorage
    };
  
    try {
      // Send the bid data to the backend
      const response = await axios.post('https://backendauca-9b41fc378333.herokuapp.com/api/bidder/bid', bidData);
      alert(`You placed a bid of $${bidAmount} on ${item.name}`);
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('There was an error placing your bid. Please try again.');
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
            placeholder="Search items... by name"
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
              width: '60%',
              marginLeft: '17%',
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
                          src={`https://backendauca-9b41fc378333.herokuapp.com/api/admin/items/${item.id}/image`} 
                          alt={item.name}
                          style={{ width: '100px', height: '100px' }}
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

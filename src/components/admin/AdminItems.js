import React, { useState } from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleAddItem = () => {
    if (newItem.trim() && price.trim() && image) {
      const newItemDetails = {
        name: newItem,
        price,
        image: URL.createObjectURL(image), // Convert image to a URL for display
      };
      setItems([...items, newItemDetails]);
      setNewItem('');
      setPrice('');
      setImage(null);
    } else {
      alert('Please fill in all fields and select an image.');
    }
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Manage Items</h2>

        <input
          type="text"
          placeholder="Enter item name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={styles.inputField}
        />
        <br />

        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.inputField}
        />
        <br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.fileInput}
        />
        <br />

        <button onClick={handleAddItem} style={styles.btnPrimary}>
          Add Item
        </button>

        <h3 style={styles.itemsHeader}>Items Available for Bidding:</h3>
        <div style={styles.itemsDisplay}>
          {items.map((item, index) => (
            <div key={index} style={styles.itemCard}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <h4 style={styles.itemName}>{item.name}</h4>
              <p style={styles.itemPrice}>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Inline styles object
const styles = {
  
  formContainer: {
    textAlign: 'center',
    marginTop: '50px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '30px',
  },
  inputField: {
    padding: '12px',
    width: '100%',
    maxWidth: '400px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '1rem',
  },
  fileInput: {
    padding: '12px',
    margin: '10px 0',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  btnPrimary: {
    padding: '12px 25px',
    fontSize: '1.1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  btnPrimaryHover: {
    backgroundColor: '#2980b9',
  },
  itemsHeader: {
    marginTop: '40px',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  itemsDisplay: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  itemCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  itemCardHover: {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  itemImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  itemName: {
    fontSize: '1.2rem',
    color: '#333',
    margin: '10px 0',
  },
  itemPrice: {
    fontSize: '1.1rem',
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default AdminItems;

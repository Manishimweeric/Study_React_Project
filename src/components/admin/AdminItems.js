import React, { useEffect, useState } from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null); // State for editing an item

  const handleAddItem = async () => {
    if (newItem.trim() && price.trim() && image) {
      const formData = new FormData();
      formData.append('name', newItem);
      formData.append('price', price);
      formData.append('image', image);

      try {
        const response = await fetch('https://backendauca-9b41fc378333.herokuapp.com/api/admin/items', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const message = await response.text();
          setSuccess(message);
          fetchItems();
        } else {
          const errorMessage = await response.text();
          setError(errorMessage);
        }
      } catch (error) {
        setError('An error occurred while adding the item.');
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in all fields and select an image.');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Item deleted successfully.');
        fetchItems();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('An error occurred while deleting the item.');
      console.error('Error:', error);
    }
  };

  const handleUpdateItem = async () => {
    if (newItem.trim() && price.trim()) {
      const formData = new FormData();
      formData.append('id', editingItem.id); // Add ID as a parameter
      formData.append('name', newItem); // Add name as a parameter
      formData.append('price', price); // Add price as a parameter
  
      console.log('Updating item with data:', { id: editingItem.id, name: newItem, price });
  
      try {
        const response = await fetch(`http://localhost:8081/api/admin/items/${editingItem.id}`, {
          method: 'PUT',
          body: formData, // Send FormData
        });
  
        if (response.ok) {
          const message = await response.text();
          console.log('Success:', message);
        } else {
          console.error('Failed to update item:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating item:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };
  

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <div style={styles.formContainer}>
        <h2 style={styles.header}>{editingItem ? 'Edit Item' : 'Manage Items'}</h2>

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

        {editingItem ? (
          <button onClick={handleUpdateItem} style={styles.btnPrimary}>
            Update Item
          </button>
        ) : (
          <>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.fileInput}
            />
            <br />
            <button onClick={handleAddItem} style={styles.btnPrimary}>
              Add Item
            </button>
          </>
        )}

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <h3 style={styles.itemsHeader}>Items Available for Bidding:</h3>
        <table style={styles.itemsTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                 <td>
                 {item.photo ? (
                      <img
                          src={`http://localhost:8081/api/admin/items/${item.id}/image`} // Full URL to the image
                          alt={item.name}
                          style={{ width: '100px', height: '100px' }}
                      />
                  ) : (
                      <p>No image available</p>
                  )}
                  </td> 
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => setEditingItem(item)} style={styles.btnSecondary}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} style={styles.btnDanger}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noItems}>
                  No items available for bidding.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

// Inline styles object (updated to include buttons for actions)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  formContainer: {
    textAlign: 'center',
    marginTop: '50px',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
  btnSecondary: {
    padding: '12px 25px',
    fontSize: '1.1rem',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  btnDanger: {
    padding: '12px 25px',
    fontSize: '1.1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  itemsHeader: {
    marginTop: '40px',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  itemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  itemImage: {
    width: '100px',
    height: 'auto',
    borderRadius: '8px',
  },
  noItems: {
    color: '#999',
    fontSize: '1.2rem',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default AdminItems;

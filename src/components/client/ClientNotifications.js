import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(''); // Filter state

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios
        .post('http://localhost:8081/bidders/notifications_view')
        .then((response) => {
          // Filter notifications based on the userId
          const filteredNotifications = response.data.filter(
            (notification) => notification.bidder == userId
          );
          setNotifications(filteredNotifications);
          setFilteredNotifications(filteredNotifications); // Set filtered notifications
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching notifications');
          setLoading(false);
        });
    } else {
      setError('User ID not found');
      setLoading(false);
    }
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    // Filter notifications based on the filter input
    const filtered = notifications.filter((notification) =>
      notification.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNotifications(filtered);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f7fc',
      padding: '40px 20px',
      minHeight: '100vh',
    },
    contentContainer: {
      maxWidth: '900px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    title: {
      textAlign: 'center',
      color: '#007bff',
      fontSize: '2rem',
      marginBottom: '20px',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    filterInput: {
      padding: '10px',
      fontSize: '1rem',
      width: '80%',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
    },
    spinner: {
      border: '4px solid #f3f3f3',
      width: '40px',
      height: '40px',
      animation: 'spin 2s linear infinite',
      marginRight: '10px',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      fontSize: '1.2rem',
      marginTop: '20px',
    },
    notificationsList: {
      listStyleType: 'none',
      padding: 0,
    },
    notificationCard: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
    },
    notificationTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    notificationMessage: {
      fontSize: '1rem',
      color: '#555',
    },
    noNotifications: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#6c757d',
      marginTop: '20px',
    },
  };


  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    <div style={styles.container}>
        
      <div style={styles.contentContainer}>
        <h2 style={styles.title}>Notifications</h2>

        {/* Filter Input */}
        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search notifications..."
            value={filter}
            onChange={handleFilterChange}
            style={styles.filterInput}
          />
        </div>

        {filteredNotifications.length === 0 ? (
          <div style={styles.noNotifications}>No notifications available</div>
        ) : (
          <ul style={styles.notificationsList}>
            {filteredNotifications.map((notification) => (
              <li key={notification.id} style={styles.notificationCard}>
                <h5 style={styles.notificationTitle}>Notification</h5>
                <p style={styles.notificationMessage}>{notification.message}</p>
                <p style={styles.notificationMessage}>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ClientNotifications;

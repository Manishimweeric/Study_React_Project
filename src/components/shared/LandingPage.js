import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Define inline styles within the component
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #325d9b, #f79)',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    
    heading: {
      fontSize: '3rem',
      marginBottom: '20px',
      fontWeight: 700,
    },
    paragraph: {
      fontSize: '1.2rem',
      marginBottom: '40px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    button: {
      padding: '17px 25px',
      width: '170px',
      fontSize: '1rem',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
    },
    clientButton: {
      backgroundColor: '#3a3a3b',
      color: 'white',
    },
    clientButtonHover: {
      backgroundColor: '#000000',
    },
    adminButton: {
      backgroundColor: '#014494',
      color: 'white',
    },
    adminButtonHover: {
      backgroundColor: '#012f66',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Auction Bidding System</h1>
        <p style={styles.paragraph}>Select your path:</p>
        <div style={styles.buttonContainer}>
          <Link to="/client-login">
            <button
              style={{ ...styles.button, ...styles.clientButton }}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.clientButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.clientButton.backgroundColor)}
            >
              Client
            </button>
          </Link>
          <Link to="/admin-login">
            <button
              style={{ ...styles.button, ...styles.adminButton }}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.adminButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.adminButton.backgroundColor)}
            >
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

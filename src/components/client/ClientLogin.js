import React, { useState } from 'react';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login functionality here
    alert('Login functionality to be integrated!');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #325d9b, #f79)', // Gradient background
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '8px',
      padding: '40px 30px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
      width: '400px',
      color: '#fff',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      fontWeight: '700',
      textAlign: 'center',
    },
    input: {
      width: '90%',
      padding: '12px 15px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#333',
      color: '#fff',
      fontSize: '1rem',
      transition: '0.3s',
    },
    inputFocus: {
      borderColor: '#007bff',
      backgroundColor: '#444',
    },
    button: {
      width: '98%',
      marginTop: '15px',
      padding: '12px 15px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '1px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    footer: {
      marginTop: '15px',
      textAlign: 'center',
      color: '#fff',
    },
  };

  const handleFocus = (e) => {
    e.target.style.backgroundColor = '#444';
    e.target.style.borderColor = '#007bff';
  };

  const handleBlur = (e) => {
    e.target.style.backgroundColor = '#333';
    e.target.style.borderColor = '#ccc';
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Client Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
        <div style={styles.footer}>
          <p>Don't have an account? <a href="/client-signup" style={{ color: '#007bff' }}>Click here</a></p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;

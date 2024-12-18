import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null); // Reset previous error messages

    const clientData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8081/api/clients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        const data = await response.json(); // Parse response data
        const userId = data.id; // Extract user ID (assuming the API returns it as `userId`)

        // Store user ID in localStorage
        localStorage.setItem('userId', userId);

        // Navigate to client home page on successful login
        navigate('/client-home'); // Use navigate instead of window.location.href
      } else if (response.status === 401) {
        // If status is 401 Unauthorized, show invalid credentials error
        setError('Invalid email or password');
      } else {
        // Handle other errors, if any
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.footer}>
          <p>Don't have an account? <Link to="/client-signup" style={{ color: '#007bff' }}>Click here</Link></p>
        </div>

        <div style={styles.footer}>
          <p>If you're an admin, <Link to="/" style={{ color: '#007bff' }}>Login as Admin</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;

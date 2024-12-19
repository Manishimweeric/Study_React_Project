import React, { useState } from 'react';

const ClientSignup = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleSignup = async () => {
    const clientData = {
      fullname,
      phone,
      email, // Include email in the client data
      password,
    };

    // Make API call to backend
    try {
      const response = await fetch('https://backendauca-9b41fc378333.herokuapp.com/api/clients/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      if (response.ok) {
        alert('Signup successful!');
        setEmail('');
        setFullname('');
        setPhone('');
        setPassword('');
        setIsSubmitted(true); // Mark the form as submitted
      } else {
        alert('Error signing up!');
      }
    } catch (error) {
      alert('Error signing up!');
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
      backgroundColor: '#fafafa',
      fontSize: '1rem',
      transition: '0.3s',
    },
    inputFocus: {
      borderColor: '#007bff',
      backgroundColor: '#f1f1f1',
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

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Client Signup</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        {!isSubmitted && (  // Conditionally render the email input only before submission
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignup} style={styles.button}>
          Sign Up
        </button>
        {isSubmitted && (
          <div style={styles.footer}>
            <p>Signup Successful! You can <a href="/client-login" style={{ color: '#007bff' }}>Login here</a></p>
          </div>
        )}
        {!isSubmitted && (
          <div style={styles.footer}>
            <p>Already have an account? <a href="/client-login" style={{ color: '#007bff' }}>Login here</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSignup;

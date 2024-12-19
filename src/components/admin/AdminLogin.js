import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link and useNavigate

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Use this for programmatic navigation

  const handleLogin = async () => {
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("https://backendauca-9b41fc378333.herokuapp.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email, // Assuming email serves as the username
          password: password,
        }),
      });
  
      if (response.ok) {
        const message = await response.text();
        setSuccess(message);
  
        // Navigate to /admin-dashboard upon successful login
        navigate("/admin-dashboard");
      } else if (response.status === 401) {
        const errorMessage = await response.text();
        setError(errorMessage || "Incorrect username or password.");
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.error("Error:", error);
    }
  };
  
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0062cc, #003366)",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "8px",
      padding: "40px 30px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
      width: "400px",
      color: "#fff",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
      fontWeight: "700",
      textAlign: "center",
    },
    input: {
      width: "90%",
      padding: "12px 15px",
      margin: "7px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "#333",
      color: "#fff",
      fontSize: "1rem",
    },
    button: {
      width: "98%",
      marginTop: "12px",
      padding: "12px 15px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    message: {
      textAlign: "center",
      marginTop: "10px",
    },
    success: {
      color: "green",
    },
    error: {
      color: "red",
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
        <h2 style={styles.heading}>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {success && (
          <div style={{ ...styles.message, ...styles.success }}>{success}</div>
        )}
        {error && <div style={{ ...styles.message, ...styles.error }}>{error}</div>}

        <div style={styles.footer}>
          <p>If you are a client, <Link to="/" style={{ color: '#007bff' }}>Login as Client</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState, useEffect } from 'react';
import AdminNavbar from '../admin/AdminNavbar';
import Footer from '../shared/Footer';
const NotificationForm = () => {
    const [message, setMessage] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [clients, setClients] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch clients when the component mounts
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/clients/client');
                if (response.ok) {
                    const data = await response.json();
                    setClients(data); // Store the list of clients
                } else {
                    setError('Failed to fetch clients');
                }
            } catch (error) {
                setError('Error: ' + error.message);
            }
        };

        fetchClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Message is required');
            return;
        }

        if (!selectedClient) {
            setError('Client is required');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/bidders/notifications?clientId=${selectedClient}&message=${encodeURIComponent(message)}`, {
                method: 'POST',
            });

            if (response.ok) {
                setSuccess('Notification created successfully');
                setMessage('');
                setSelectedClient('');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create notification');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f7fc',
            padding: '50px 0',
            minHeight: '100vh',
        },
        formContainer: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginTop: '50px',
        },
        title: {
            textAlign: 'center',
            color: '#007bff',
            fontSize: '2rem',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'block',
        },
        input: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            marginBottom: '10px',
        },
        select: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
            fontSize: '1.1rem',
            marginTop: '10px',
        },
        successMessage: {
            color: 'green',
            textAlign: 'center',
            fontSize: '1.1rem',
            marginTop: '10px',
        },
    };

    return (
        <div>
             <AdminNavbar />
        <div style={styles.container}>
           
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Create Notification</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Message:</label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={styles.input}
                            placeholder="Enter notification message"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Client:</label>
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            style={styles.select}
                        >
                            <option value="">-- Select a Client --</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.fullname}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <div style={styles.errorMessage}>{error}</div>}
                    {success && <div style={styles.successMessage}>{success}</div>}
                    <div>
                        <button type="submit" style={styles.button}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
        <Footer />
        </div>
    );
};

export default NotificationForm;

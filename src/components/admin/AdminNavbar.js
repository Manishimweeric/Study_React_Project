import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          Auction Bid
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/admin-dashboard" style={styles.link}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin-items" style={styles.link}>
            Manage Items
          </Link>
        </li>
        <li>
          <Link to="/admin-bids" style={styles.link}>
            Manage Bids
          </Link>
        </li>
        <li>
          <Link to="/" style={styles.link}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#012e6f',
    padding: '10px 20px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
  },
};

export default AdminNavbar;

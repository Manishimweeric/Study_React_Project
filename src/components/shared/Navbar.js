import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          AuctionBidding
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/client-home" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/client-notifications" style={styles.link}>
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/client-bids" style={styles.link}>
            My Bids
          </Link>
        </li>
        <li>
          <Link to="/client-login" style={styles.link}>
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
    backgroundColor: '#333',
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

export default Navbar;

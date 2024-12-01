import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Auction Bidding System. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default Footer;

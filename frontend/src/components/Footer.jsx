import React from 'react';

export function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '16px 24px',
      textAlign: 'center',
      borderTop: '1px solid #334155',
      fontSize: '14px',
      marginTop: 'auto',
    },
  };

  return (
    <footer style={styles.footer} data-testid="footer">
      <p style={{ margin: 0 }}>
        RNA Mining System &copy; 2026 - Hexagonal AI Pipeline
      </p>
    </footer>
  );
}

export default Footer;
import React from 'react';

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '30px',
      borderRadius: '10px',
      zIndex: 101,
      width: '60%',
      maxHeight: '80%',
      overflowY: 'auto',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
    }}>
      <h2>Contact Me</h2>
      <p>You can reach me via:</p>
      <ul>
        <li>Email: your.email@example.com</li>
        <li>LinkedIn: <a href="#" style={{ color: '#007bff' }}>Your LinkedIn Profile</a></li>
        <li>GitHub: <a href="#" style={{ color: '#007bff' }}>Your GitHub Profile</a></li>
      </ul>
      <button onClick={onClose} style={{
        marginTop: '20px',
        padding: '10px 20px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>Close</button>
    </div>
  );
};

export default Contact;
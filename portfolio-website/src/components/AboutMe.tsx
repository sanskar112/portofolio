import React from 'react';

interface AboutMeProps {
  onClose: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onClose }) => {
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
      <h2>About Me</h2>
      <p>This is where your "About Me" content will go. You can talk about your skills, experience, and what you're passionate about.</p>
      <p>Feel free to customize this with your actual information!</p>
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

export default AboutMe;
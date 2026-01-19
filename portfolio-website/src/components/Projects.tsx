import React from 'react';

interface ProjectsProps {
  onClose: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onClose }) => {
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
      <h2>My Projects</h2>
      <p>This section will showcase your projects. You can list them with descriptions, links, and even images or videos.</p>
      <ul>
        <li>Project 1: A brief description.</li>
        <li>Project 2: Another cool project.</li>
        <li>Project 3: Yet another awesome creation.</li>
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

export default Projects;
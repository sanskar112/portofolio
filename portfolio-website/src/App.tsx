import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import Character from './Character'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import Contact from './components/Contact'

export function App() {
  const [activeInteractivePoint, setActiveInteractivePoint] = useState<string | null>(null);
  const [interactionActive, setInteractionActive] = useState<boolean>(false);

  const interactivePoints = [
    { id: 'about', position: [-10, 0, -10], color: 'blue' },
    { id: 'projects', position: [0, 0, -10], color: 'green' },
    { id: 'contact', position: [10, 0, -10], color: 'red' },
  ];

  const handleInteract = () => {
    if (activeInteractivePoint) {
      setInteractionActive(true);
    }
  };

  const handleCloseInteraction = () => {
    setInteractionActive(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Character interactivePoints={interactivePoints} onProximityChange={setActiveInteractivePoint} onInteract={handleInteract} />
        {!interactionActive && <OrbitControls />}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {interactivePoints.map((point) => (
          <Box key={point.id} position={point.position as [number, number, number]} args={[5, 2, 5]}>
            <meshStandardMaterial color={point.color} />
          </Box>
        ))}
      </Canvas>

      {activeInteractivePoint && !interactionActive && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 100,
        }}>
          <h2>{activeInteractivePoint.toUpperCase()} Section</h2>
          <p>Press 'E' to interact!</p>
        </div>
      )}

      {interactionActive && activeInteractivePoint === 'about' && (
        <AboutMe onClose={handleCloseInteraction} />
      )}
      {interactionActive && activeInteractivePoint === 'projects' && (
        <Projects onClose={handleCloseInteraction} />
      )}
      {interactionActive && activeInteractivePoint === 'contact' && (
        <Contact onClose={handleCloseInteraction} />
      )}
    </div>
  );
}

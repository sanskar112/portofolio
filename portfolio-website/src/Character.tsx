import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

const Character: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const [keysPressed, setKeysPressed] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({
        ...prev,
        [event.key]: true,
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({
        ...prev,
        [event.key]: false,
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 0.1;
    if (meshRef.current) {
      const { position } = meshRef.current;
      const halfSize = 0.25; // Half of the character's box geometry size (0.5 / 2)
      const bounds = 49.75; // Half of the plane size (100 / 2) - halfSize

      if (keysPressed['w'] || keysPressed['W']) {
        position.z -= speed;
      }
      if (keysPressed['s'] || keysPressed['S']) {
        position.z += speed;
      }
      if (keysPressed['a'] || keysPressed['A']) {
        position.x -= speed;
      }
      if (keysPressed['d'] || keysPressed['D']) {
        position.x += speed;
      }

      // Clamp position within bounds
      position.x = Math.max(-bounds, Math.min(bounds, position.x));
      position.z = Math.max(-bounds, Math.min(bounds, position.z));
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Character

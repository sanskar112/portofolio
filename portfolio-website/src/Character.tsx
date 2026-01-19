import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'

interface InteractivePoint {
  id: string;
  position: [number, number, number];
  color: string;
}

interface CharacterProps {
  interactivePoints: InteractivePoint[];
  onProximityChange: (pointId: string | null) => void;
  onInteract: () => void;
}

const Character: React.FC<CharacterProps> = ({ interactivePoints, onProximityChange, onInteract }) => {
  const meshRef = useRef<Mesh>(null);
  const [keysPressed, setKeysPressed] = useState<{
    [key: string]: boolean;
  }>({});
  const prevActivePoint = useRef<string | null>(null);

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

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'e' || event.key === 'E') {
        // Only trigger interaction if near an interactive point
        const isInProximity = interactivePoints.some((point) => {
          if (meshRef.current) {
            const pointVec = new Vector3(point.position[0], point.position[1], point.position[2]);
            const distance = meshRef.current.position.distanceTo(pointVec);
            const interactionRadius = 3;
            return distance < interactionRadius;
          }
          return false;
        });
        if (isInProximity) {
          onInteract();
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [interactivePoints, onInteract, meshRef]);

  useFrame(() => {
    const speed = 0.1;
    if (meshRef.current) {
      const { position } = meshRef.current;
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

      // Proximity detection
      let newActivePoint: string | null = null;
      interactivePoints.forEach((point) => {
        const pointVec = new Vector3(point.position[0], point.position[1], point.position[2]);
        const distance = position.distanceTo(pointVec);
        const interactionRadius = 3;

        if (distance < interactionRadius) {
          newActivePoint = point.id;
        }
      });

      if (newActivePoint !== prevActivePoint.current) {
        onProximityChange(newActivePoint);
        prevActivePoint.current = newActivePoint;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Character

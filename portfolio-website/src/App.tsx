import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Character from './Character'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Character />
        <OrbitControls />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App

import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text, Html, Environment, PerspectiveCamera, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Loader = () => {
  const { progress } = useProgress();
  const [image, setImage] = useState('');

  useState(() => {
    const images = [
      '/src/assets/rain-rainy-day.gif',
      '/src/assets/pokemon-anime.gif',
      '/src/assets/snorlax-roll.gif',
      '/src/assets/wild-snorlax-appeared.gif',
      '/src/assets/snorlax-crawling.gif',
      '/src/assets/sleepy-snorlax.gif',
    ];
    setImage(images[Math.floor(Math.random() * images.length)]);
  });

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg p-8">
        <img src={image} alt="Loading asset" className="w-68 h-68 mb-4" />
        <div className="w-64 bg-gray-700 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-green-400 mt-2 text-sm">{Math.round(progress)}% loaded</div>
      </div>
    </Html>
  );
};

const ForestModel = () => {
  // Try to load the GLB model, with fallback if it doesn't exist
  let model;
  try {
    model = useGLTF('/forest_camping.glb');
  } catch (error) {
    console.log('GLB model not found, using fallback scene');
    model = null;
  }

  if (model && model.scene) {
    return (
      <primitive 
        object={model.scene} 
        scale={[2, 2, 2]} 
        position={[0, 0, 0]} 
      />
    );
  }

};

interface Forest3DSceneProps {
  onNavigate: (section: string) => void;
}

const Forest3DScene: React.FC<Forest3DSceneProps> = ({ onNavigate }) => {
  
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [3, 6, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 2, 0]} intensity={0.8} color="#ff4500" />

          {/* Environment */}
          <Environment preset="forest" />

          {/* 3D Model/Scene */}
          <ForestModel />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={200}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-green-400 rounded-lg p-4 text-green-400"
        >
          <h3 className="text-lg font-bold mb-2">🌲 Welcome to Vaibhav's World</h3>
          <p className="text-sm text-gray-400">Click on the glowing orbs to explore different sections!</p>
          <div className="mt-2 text-xs">
            <div>🖱️ Drag to rotate • 🔍 Scroll to zoom</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Forest3DScene;

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text, Html, Environment, PerspectiveCamera, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Loader = () => {
  const { progress } = useProgress();
  const [image, setImage] = useState('');
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isMinimumTimeMet, setIsMinimumTimeMet] = useState(false);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const minLoadingTime = 4000; // 4 seconds minimum

  useEffect(() => {
    const images = [
      '/rain-rainy-day.gif',
      '/pokemon-anime.gif',
      '/snorlax-roll.gif',
      '/wild-snorlax-appeared.gif',
      '/snorlax-crawling.gif',
      '/sleepy-snorlax.gif',
    ];
    setImage(images[Math.floor(Math.random() * images.length)]);
    startTimeRef.current = Date.now();
    
    // Always enforce minimum time, regardless of actual loading speed
    const minimumTimeTimer = setTimeout(() => {
      setIsMinimumTimeMet(true);
    }, minLoadingTime);

    return () => clearTimeout(minimumTimeTimer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const timeProgress = Math.min((elapsedTime / minLoadingTime) * 100, 100);
      
      // If actual loading is fast, use time-based progress
      // If actual loading is slow, use actual progress
      let combinedProgress;
      if (progress >= 100 && elapsedTime < minLoadingTime) {
        // Loading is complete but minimum time not met - use time-based progress
        combinedProgress = timeProgress;
      } else {
        // Use the higher of the two progresses
        combinedProgress = Math.max(progress, timeProgress);
      }
      
      setDisplayProgress(combinedProgress);

      // Hide loader only when both conditions are met
      if (progress >= 100 && isMinimumTimeMet) {
        setTimeout(() => {
          setShowLoader(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }, 300);
      }
    };

    intervalRef.current = setInterval(updateProgress, 50);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [progress, isMinimumTimeMet]);

  if (!showLoader) {
    return null;
  }

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg p-8">
        <img src={image} alt="Loading asset" className="w-68 h-68 mb-4" />
        <div className="w-64 bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-green-500 h-2.5 rounded-full"
            animate={{ width: `${displayProgress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>
        <div className="text-green-400 mt-2 text-sm">
          {Math.round(displayProgress)}% loaded
        </div>
        <div className="text-gray-400 mt-1 text-xs">
          Preparing your forest adventure...
        </div>
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
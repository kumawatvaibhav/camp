import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import Loader from './Loader';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ForestModel = () => {
  const { scene } = useGLTF('/forest_camping.glb');
  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const CameraController = ({ isAnimating, onAnimationComplete }: { isAnimating: boolean, onAnimationComplete: () => void }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>();
  
  // Starting position (zoomed out)
  const startPosition = new THREE.Vector3(15, 30, 100);
  // Final position (your desired position)
  const endPosition = new THREE.Vector3(3, 6, 25);
  
  const animationProgress = useRef(0);
  const animationDuration = 3000; // 3 seconds

  useEffect(() => {
    if (isAnimating) {
      // Set initial camera position (zoomed out)
      camera.position.copy(startPosition);
      camera.lookAt(0, 0, 0);
      animationProgress.current = 0;
      
      // Disable controls during animation
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
    }
  }, [isAnimating, camera]);

  useFrame((state, delta) => {
    if (isAnimating && animationProgress.current < 1) {
      // Update animation progress
      animationProgress.current += delta / (animationDuration / 1000);
      
      if (animationProgress.current >= 1) {
        animationProgress.current = 1;
        // Re-enable controls when animation is complete
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
        onAnimationComplete();
      }
      
      // Smooth easing function (ease-out)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const progress = easeOut(animationProgress.current);
      
      // Interpolate camera position
      camera.position.lerpVectors(startPosition, endPosition, progress);
      
      // Keep camera looking at the center
      camera.lookAt(0, 0, 0);
      
      // Update controls target if they exist
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={200}
      maxPolarAngle={Math.PI / 2}
      target={[0, 0, 0]}
    />
  );
};

interface Forest3DSceneProps {
  onNavigate: (section: string) => void;
}

const Forest3DScene: React.FC<Forest3DSceneProps> = ({ onNavigate }) => {
  const [showScene, setShowScene] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const handleExploreClick = () => {
    setShowScene(true);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setShowUI(true);
  };

  return (
    <div className="w-full h-screen relative">
      {/* Loader */}
      {!showScene && (
        <Canvas>
          <Suspense fallback={null}>
            <Loader onFinish={handleExploreClick} />
          </Suspense>
        </Canvas>
      )}

      {/* 3D Scene with zoom animation */}
      {showScene && (
        <Canvas
          shadows
          camera={{ position: [15, 30, 100], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[0, 2, 0]} intensity={0.8} color="#ff4500" />
            <Environment preset="forest" />
            <ForestModel />
            <CameraController 
              isAnimating={isAnimating} 
              onAnimationComplete={handleAnimationComplete}
            />
          </Suspense>
        </Canvas>
      )}

      {/* UI overlay - only show after zoom animation completes */}
      {showScene && showUI && (
        <div className="absolute top-6 left-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-white-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-700/50 max-w-sm"
          >
            {/* Header with animated icon */}
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  Welcome to Vaibhav's World
                </h3>
                <div className="w-16 h-0.5 bg-emerald-400 mt-1 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
               Explore every corner of this art.
            </p>

            {/* Interactive hints */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                ></motion.div>
                <img src="/snorlax.png" alt="" className='h-6 w-6'></img>Click Snorlax to explore sections
              </div>
            </div>

            {/* Subtle bottom accent */}
            <div className="mt-4 pt-3 border-t border-slate-700/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Interactive Experience</span>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex gap-1"
                >
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Forest3DScene;
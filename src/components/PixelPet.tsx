import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { use3DNavigation } from '@/hooks/use3DNavigation';
import { ChevronRight, Sparkles, Zap, Settings, Bell, Home } from 'lucide-react';

const Model = () => {
  const { scene } = useGLTF('/pokemon_snorlax_2023.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={[2, 2, 2]} 
      position={[0, 0, 0]}
      rotation={[0, 6, 0]}
    />
  );
};

const PixelPet = () => {
  const [position, setPosition] = useState({ x: 150, y: window.innerHeight - 250 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [quickActions, setQuickActions] = useState({ notifications: 3, energy: 85 });
  const [menuStyle, setMenuStyle] = useState('expanded');
  
  const { enterSection, returnTo3D, isIn3DMode } = use3DNavigation();

  const petRef = useRef(null);
  const menuRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Liquid glass effect transforms
  const backgroundX = useTransform(mouseX, [-300, 300], [-20, 20]);
  const backgroundY = useTransform(mouseY, [-300, 300], [-20, 20]);
  const glowIntensity = useTransform(mouseX, [-300, 300], [0.3, 0.8]);

  useEffect(() => {
    const handleResize = () => {
      setPosition((pos) => ({ ...pos, y: window.innerHeight - 120 }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (menuRef.current && isMenuOpen) {
        const rect = menuRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    if (isMenuOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMenuOpen, mouseX, mouseY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        petRef.current && !petRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handlePetClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === 'forest') {
      returnTo3D();
    } else {
      enterSection(section);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Smooth close animation
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  const navItems = [
    { 
      label: 'About', 
      section: 'about', 
      icon: '👨‍💻',
      color: 'from-blue-400 via-blue-500 to-blue-600',
      description: 'Learn about me',
      badge: null
    },
    { 
      label: 'Projects', 
      section: 'projects', 
      icon: '🚀',
      color: 'from-emerald-400 via-emerald-500 to-emerald-600',
      description: 'Latest builds',
      badge: '12'
    },
    { 
      label: 'Tech Stack', 
      section: 'stack', 
      icon: '🛠️',
      color: 'from-orange-400 via-orange-500 to-orange-600',
      description: 'Skills & tools',
      badge: null
    },
    { 
      label: 'Achievements', 
      section: 'achievements', 
      icon: '🏆',
      color: 'from-yellow-400 via-yellow-500 to-yellow-600',
      description: 'Milestones',
      badge: 'New'
    },
    { 
      label: 'Testimonials', 
      section: 'testimonials', 
      icon: '💬',
      color: 'from-purple-400 via-purple-500 to-purple-600',
      description: 'What others say',
      badge: null
    },
    { 
      label: 'Contact', 
      section: 'contact', 
      icon: '📬',
      color: 'from-pink-400 via-pink-500 to-pink-600',
      description: 'Get in touch',
      badge: null
    },
    { 
      label: 'Chat', 
      section: 'chat', 
      icon: '🤖',
      color: 'from-cyan-400 via-cyan-500 to-cyan-600',
      description: 'Talk to my AI assistant',
      badge: 'Beta'
    },
  ];

  const quickActionItems = [
    { icon: <Bell size={14} />, label: 'Notifications', value: quickActions.notifications, color: 'text-blue-400' },
    { icon: <Zap size={14} />, label: 'Quick Nav', value: null, color: 'text-yellow-400' },
    { icon: <Settings size={14} />, label: 'Settings', value: null, color: 'text-gray-400' },
  ];

  return (
    <>
      {/* Snorlax Pet */}
      <motion.div
        ref={petRef}
        className="fixed z-40 cursor-pointer select-none"
        style={{
          left: position.x,
          top: position.y,
          width: 125,
          height: 125
        }}
        onClick={handlePetClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        // drag
        // dragConstraints={{
        //   left: 0,
        //   right: window.innerWidth - 100,
        //   top: 0,
        //   bottom: window.innerHeight - 100,
        // }}
        // dragMomentum={false}
        // onDrag={(event, info) => {
        //   setPosition({ x: info.point.x, y: info.point.y });
        // }}
      >
        <div className="relative w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          
          {/* Interaction indicator */}
          {isMenuOpen && (
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* iOS Liquid Glass Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed z-50"
            style={{
              left: Math.max(10, Math.min(position.x - 120, window.innerWidth - 250)),
              top: Math.max(10, position.y - 350),
              width: 240,
            }}
          >
            {/* Main Liquid Glass Container */}
            <motion.div 
              className="relative backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background: `radial-gradient(circle at ${backgroundX}px ${backgroundY}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)`
              }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
                  filter: `blur(${glowIntensity}px)`,
                }}
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
                    'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Header with Quick Actions */}
              <div className="relative p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-white font-semibold text-sm">Navigation</span>
                  </motion.div>
                  <motion.div
                    className="text-xs text-white/60 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Quick Menu
                  </motion.div>
                </div>
                
                {/* Quick Action Pills */}
                <div className="flex space-x-2">
                  {quickActionItems.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all duration-200 backdrop-blur-sm"
                    >
                      <span className={item.color}>{item.icon}</span>
                      {item.value && (
                        <span className="text-xs text-white font-medium min-w-[16px] text-center">
                          {item.value}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation Items */}
              <div className="relative p-2">
                {!isIn3DMode && (
                    <motion.button
                     key="return-to-camp"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                     onClick={() => handleNavClick('forest')}
                     className="group relative w-full p-3 rounded-2xl transition-all duration-300 mb-1 overflow-hidden bg-white/5"
                     whileTap={{ scale: 0.98 }}
                   >
                    <div className="relative flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <motion.div className="text-2xl">
                           <Home size={20} className="text-white/80" />
                         </motion.div>
                         <div className="text-left">
                           <div className="text-white font-medium text-sm leading-tight">
                             Return to Camp
                           </div>
                           <div className="text-white/60 text-xs">
                             Back to the 3D experience
                           </div>
                         </div>
                       </div>
                       <ChevronRight size={16} className="text-white/60" />
                     </div>
                   </motion.button>
                )}
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.15 + index * 0.08,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                    onClick={() => handleNavClick(item.section)}
                    className="group relative w-full p-3 rounded-2xl transition-all duration-300 mb-1 overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Item Background with Liquid Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/5"
                      animate={{
                        background: activeSection === item.section 
                          ? `linear-gradient(135deg, ${item.color.replace('from-', 'rgba(').replace('via-', ', rgba(').replace('to-', ', rgba(').replace(/\w+-(\d+)/g, (match, num) => {
                              const colors = {
                                'blue': `59, 130, 246, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'emerald': `16, 185, 129, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'orange': `251, 146, 60, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'yellow': `251, 191, 36, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'purple': `147, 51, 234, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'pink': `236, 72, 153, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`,
                                'cyan': `59, 130, 246, 0.${num === '400' ? '2' : num === '500' ? '25' : '3'}`
                              };
                              const colorKey = match.split('-')[0];
                              return colors[colorKey] || '255, 255, 255, 0.1';
                            })})`
                          : 'rgba(255, 255, 255, 0.05)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="text-2xl"
                          animate={{ 
                            scale: activeSection === item.section ? 1.1 : 1,
                            rotateZ: activeSection === item.section ? 5 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="text-left">
                          <div className="text-white font-medium text-sm leading-tight">
                            {item.label}
                          </div>
                          <div className="text-white/60 text-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium"
                          >
                            {item.badge}
                          </motion.div>
                        )}
                        <motion.div
                          animate={{ 
                            x: activeSection === item.section ? 2 : 0,
                            opacity: activeSection === item.section ? 1 : 0.5
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight size={16} className="text-white/60" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <motion.div 
                className="relative p-3 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-center text-xs text-white/50">
                  Swipe up for more options
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PixelPet;
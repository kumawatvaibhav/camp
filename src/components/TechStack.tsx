
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techStack = [
    { name: 'React', icon: '⚛️', level: 95, color: '#61DAFB' },
    { name: 'Next.js', icon: '🚀', level: 90, color: '#000000' },
    { name: 'TypeScript', icon: '📘', level: 85, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: '🎨', level: 90, color: '#06B6D4' },
    { name: 'Framer Motion', icon: '🎭', level: 80, color: '#FF0055' },
    { name: 'Spline 3D', icon: '🎪', level: 75, color: '#9333EA' },
    { name: 'Node.js', icon: '🟢', level: 80, color: '#339933' },
    { name: 'MongoDB', icon: '🍃', level: 75, color: '#47A248' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My <span className="text-blue-400">Tech Stack</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -10 }}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className="relative group"
            >
              <div className="bg-gray-900 border border-green-400/20 rounded-lg p-6 text-center hover:border-green-400 transition-all duration-300">
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    scale: hoveredTech === tech.name ? 1.2 : 1,
                    rotate: hoveredTech === tech.name ? [0, -10, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.icon}
                </motion.div>
                
                <h3 className="text-white font-bold mb-3">{tech.name}</h3>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: tech.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
                
                <span className="text-green-400 text-sm font-bold">{tech.level}%</span>

                {/* Pixel glow effect on hover */}
                {hoveredTech === tech.name && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: `0 0 20px ${tech.color}40`,
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)',
                      backgroundSize: '6px 6px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>

              {/* Tooltip */}
              {hoveredTech === tech.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-green-400 text-green-400 text-xs rounded whitespace-nowrap z-10"
                >
                  Proficiency: {tech.level}%
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-green-400"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

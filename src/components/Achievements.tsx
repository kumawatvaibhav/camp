
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Full-Stack Builder',
      description: 'Built complete applications with frontend and backend',
      icon: '🛠️',
      earned: true,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Team Leader',
      description: 'Led technical teams and conducted interviews',
      icon: '🎯',
      earned: true,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: '3D Interface Creator',
      description: 'Integrated 3D models and animations',
      icon: '🖼️',
      earned: true,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Website Launcher',
      description: 'Deployed multiple live websites',
      icon: '🚀',
      earned: true,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Code Warrior',
      description: 'Organized coding events and competitions',
      icon: '⚔️',
      earned: true,
      color: 'bg-red-500'
    },
    {
      id: 6,
      title: 'Pixel Master',
      description: 'Created pixel-perfect designs',
      icon: '🎨',
      earned: true,
      color: 'bg-pink-500'
    }
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
          <span className="text-green-400">Achievements</span> Unlocked
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="relative group"
            >
              <div className={`${achievement.color} rounded-lg p-6 text-center relative overflow-hidden`}>
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{achievement.title}</h3>
                {achievement.earned && (
                  <Badge className="bg-yellow-400 text-black text-xs">
                    ✓ Earned
                  </Badge>
                )}
                
                {/* Pixel glow effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ 
                       backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
                       backgroundSize: '8px 8px'
                     }} 
                />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-green-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {achievement.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

import React, { useEffect, useRef, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

interface LoaderProps {
  onFinish: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const { progress } = useProgress();
  const [image, setImage] = useState('');
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const fakeTimerRef = useRef<NodeJS.Timeout | null>(null);

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
  }, []);

  useEffect(() => {
    if (progress >= 100 && !showExplore) {
      let stage = 0;
      const fakeProgressInterval = setInterval(() => {
        stage++;
        const newProgress = 50 + stage * 15;
        setDisplayProgress(Math.min(newProgress, 100));

        if (newProgress >= 100) {
          clearInterval(fakeProgressInterval);
          setTimeout(() => setShowExplore(true), 800);
        }
      }, 1000);

      fakeTimerRef.current = fakeProgressInterval;
    } else {
      setDisplayProgress(Math.min((progress / 100) * 50, 50));
    }

    return () => {
      if (fakeTimerRef.current) clearInterval(fakeTimerRef.current);
    };
  }, [progress, showExplore]);

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-lg p-8 max-w-lg text-center h-screen w-screen">
        <h1 className="text-white text-4xl font-bold mb-8 tracking-tight">
          WELCOME TO MY WORLD!
        </h1>
        
        {image ? (
          <img
            src={image}
            alt="Loading"
            className="w-80 h-80 mb-8 rounded-lg object-cover"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <div className="w-80 h-80 mb-8 bg-gray-800 rounded-lg flex items-center justify-center text-8xl">
            🎮
          </div>
        )}
        
        <motion.button
          className={`
            relative w-48 h-12 rounded-lg font-medium text-sm
            transition-all duration-300 backdrop-blur-sm
            ${showExplore 
              ? 'bg-white bg-opacity-90 text-gray-800 hover:bg-opacity-100 cursor-pointer shadow-sm border border-gray-200' 
              : 'bg-gray-800 bg-opacity-50 text-gray-300 cursor-not-allowed border border-gray-600'
            }
          `}
          onClick={showExplore ? onFinish : undefined}
          whileHover={showExplore ? { scale: 1.02 } : {}}
          whileTap={showExplore ? { scale: 0.98 } : {}}
        >
          {!showExplore && (
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-500 bg-opacity-60 rounded-lg"
              initial={{ width: '0%' }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
            />
          )}
          
          <div className="relative z-10 flex items-center justify-center h-full gap-2">
            {showExplore ? (
              <>
                <span>Explore World</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🌲
                </motion.span>
              </>
            ) : (
              <>
                <span>{Math.round(displayProgress)}%</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="w-3 h-3 border border-current border-t-transparent rounded-full"
                />
              </>
            )}
          </div>
        </motion.button>
        
        {!showExplore && (
          <div className="text-gray-400 mt-3 text-sm">Preparing your world...</div>
        )}
      </div>
    </Html>
  );
};

export default Loader;
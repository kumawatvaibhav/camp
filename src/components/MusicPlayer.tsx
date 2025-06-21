
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated waveform data
  const waveformData = Array.from({ length: 20 }, () => Math.random() * 100);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 right-4 bg-black/90 border border-green-400 rounded-lg p-4 backdrop-blur-sm z-50"
    >
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/misc/sounds/8bit_music.mp3"
        loop
      />
      
      <div className="flex items-center space-x-3">
        <Button
          size="sm"
          onClick={togglePlay}
          className="bg-green-400 hover:bg-green-500 text-black w-8 h-8 p-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        <div className="flex space-x-1 items-end h-6">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              className="w-1 bg-green-400"
              style={{ height: isPlaying ? `${height}%` : '20%' }}
              animate={{ height: isPlaying ? `${height}%` : '20%' }}
              transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse' }}
            />
          ))}
        </div>

        <Button
          size="sm"
          onClick={toggleMute}
          variant="ghost"
          className="text-green-400 hover:text-green-300 w-8 h-8 p-0"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 accent-green-400"
        />
      </div>

      <div className="text-xs text-green-400 mt-2 text-center pixel-font">
        🎵 Chiptune Vibes
      </div>
    </motion.div>
  );
};

export default MusicPlayer;

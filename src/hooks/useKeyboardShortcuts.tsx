
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseKeyboardShortcutsProps {
  onToggleMusic?: () => void;
  onJumpToProjects?: () => void;
  onOpenTerminal?: () => void;
}

export const useKeyboardShortcuts = ({
  onToggleMusic,
  onJumpToProjects,
  onOpenTerminal
}: UseKeyboardShortcutsProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl key combinations
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'm':
            event.preventDefault();
            if (onToggleMusic) {
              onToggleMusic();
              toast({
                title: "🎵 Music Toggle",
                description: "Background music toggled!",
                duration: 2000,
              });
            }
            break;
            
          case 'p':
            event.preventDefault();
            if (onJumpToProjects) {
              onJumpToProjects();
              toast({
                title: "🚀 Jumped to Projects",
                description: "Scrolled to projects section!",
                duration: 2000,
              });
            }
            break;
            
          case 't':
            event.preventDefault();
            if (onOpenTerminal) {
              onOpenTerminal();
              toast({
                title: "💻 Terminal Activated",
                description: "Terminal testimonials opened!",
                duration: 2000,
              });
            }
            break;
            
          default:
            break;
        }
      }

      // Easter egg: Konami code
      if (event.key === 'ArrowUp') {
        // Could implement Konami code here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleMusic, onJumpToProjects, onOpenTerminal, toast]);

  return null;
};


import { create } from 'zustand';

interface Navigation3DState {
  currentSection: string;
  isIn3DMode: boolean;
  setCurrentSection: (section: string) => void;
  enterSection: (section: string) => void;
  returnTo3D: () => void;
}

export const use3DNavigation = create<Navigation3DState>((set) => ({
  currentSection: 'forest',
  isIn3DMode: true,
  setCurrentSection: (section) => set({ currentSection: section }),
  enterSection: (section) => set({ currentSection: section, isIn3DMode: false }),
  returnTo3D: () => set({ currentSection: 'forest', isIn3DMode: true }),
}));

import { create } from 'zustand';

interface UserProgress {
  aptitudeScore: number;
  englishScore: number;
  codingScore: number;
  questionsCompleted: number;
  streak: number;
}

interface AppState {
  userProgress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

export const useStore = create<AppState>((set) => ({
  userProgress: {
    aptitudeScore: 0,
    englishScore: 0,
    codingScore: 0,
    questionsCompleted: 0,
    streak: 0,
  },
  updateProgress: (progress) =>
    set((state) => ({
      userProgress: { ...state.userProgress, ...progress },
    })),
}));
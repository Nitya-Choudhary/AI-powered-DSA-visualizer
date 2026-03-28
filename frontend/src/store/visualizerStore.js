import { create } from 'zustand';

export const useVisualizerStore = create((set) => ({
  // Code & Editor State
  code: '',
  language: 'python',
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),

  // Visualization State
  arrayValues: [],
  isAnimating: false,
  isPaused: false,
  currentStep: 0,
  speed: 500,
  algorithm: null,

  setArrayValues: (values) => set({ arrayValues: values }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setSpeed: (speed) => set({ speed }),
  setAlgorithm: (algorithm) => set({ algorithm }),

  // Test Cases
  testCases: [],
  currentTestCase: 0,
  addTestCase: (testCase) =>
    set((state) => ({
      testCases: [...state.testCases, testCase],
    })),
  setCurrentTestCase: (index) => set({ currentTestCase: index }),

  // Output & Console
  output: '',
  logs: [],
  setOutput: (output) => set({ output }),
  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, { message: log, timestamp: new Date() }],
    })),
  clearLogs: () => set({ logs: [] }),

  // User Sessions
  user: null,
  setUser: (user) => set({ user }),

  // Saved Codebases
  savedCodes: [],
  addSavedCode: (codeData) =>
    set((state) => ({
      savedCodes: [...state.savedCodes, codeData],
    })),

  // Reset all
  reset: () =>
    set({
      code: '',
      arrayValues: [],
      isAnimating: false,
      isPaused: false,
      currentStep: 0,
      speed: 500,
      output: '',
      logs: [],
    }),
}));

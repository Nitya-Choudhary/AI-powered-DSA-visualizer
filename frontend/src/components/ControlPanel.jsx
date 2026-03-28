import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { useVisualizerStore } from '../store/visualizerStore';

export default function ControlPanel({ totalSteps }) {
  const {
    isAnimating,
    setIsAnimating,
    isPaused,
    setIsPaused,
    currentStep,
    setCurrentStep,
    speed,
    setSpeed,
    reset,
  } = useVisualizerStore();

  const handlePlayPause = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPaused(false);
    reset();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="space-y-4">
        {/* Speed Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Speed Control
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex gap-2 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="p-3 glass-card rounded-lg disabled:opacity-50 transition-smooth hover-lift"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover-lift"
          >
            {isPaused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="p-3 glass-card rounded-lg disabled:opacity-50 transition-smooth hover-lift"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="p-3 glass-card rounded-lg transition-smooth hover-lift"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Step Counter */}
        <div className="text-center py-4 border-t border-white/10">
          <p className="text-lg font-semibold gradient-text">
            Step {currentStep + 1} / {totalSteps}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
            }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
      </div>
    </motion.div>
  );
}

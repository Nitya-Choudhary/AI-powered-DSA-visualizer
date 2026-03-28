import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useVisualizerStore } from '../store/visualizerStore';

export default function VisualizationPanel({ steps }) {
  const {
    currentStep,
    setCurrentStep,
    isAnimating,
    speed,
    arrayValues,
    setArrayValues,
  } = useVisualizerStore();

  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  useEffect(() => {
    if (steps && steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setArrayValues(step.array);
      setComparingIndices(step.indices || []);

      if (step.type === 'sorted') {
        setSortedIndices((prev) => [...new Set([...prev, ...step.indices])]);
      }
    }
  }, [currentStep, steps]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const barVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
      },
    }),
    compare: {
      fill: '#60a5fa',
      transition: { duration: 0.2 },
    },
    swap: {
      fill: '#ec4899',
      x: [0, 5, -5, 0],
      transition: { duration: 0.3 },
    },
    sorted: {
      fill: '#10b981',
      transition: { duration: 0.3 },
    },
  };

  const maxValue = Math.max(...arrayValues, 100);
  const barHeight = Math.min((400 / arrayValues.length) * 0.7, 40);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-screen flex flex-col gap-4 p-4"
    >
      {/* Header */}
      <div className="glass-card p-4 rounded-xl">
        <h2 className="text-lg font-semibold gradient-text mb-2">
          Visualization Panel
        </h2>
        <p className="text-sm text-gray-400">
          Step {currentStep + 1} / {steps?.length || 0}
        </p>
      </div>

      {/* Visualization Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-8 rounded-xl flex-1 flex flex-col items-center justify-center"
      >
        {arrayValues.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">No data to visualize</p>
            <p className="text-gray-500 text-sm">
              Run an algorithm from the code editor to see visualization
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-flex-end justify-center gap-1 h-80 w-full"
          >
            {arrayValues.map((value, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={barVariants}
                animate={
                  comparingIndices.includes(idx)
                    ? 'compare'
                    : sortedIndices.includes(idx)
                      ? 'sorted'
                      : 'visible'
                }
                style={{
                  height: `${(value / maxValue) * 300}px`,
                  width: `${100 / arrayValues.length}%`,
                  maxWidth: '40px',
                }}
                className="rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 origin-bottom transition-smooth"
                onAnimationComplete={() => {
                  if (currentStep < steps.length - 1) {
                    setTimeout(
                      () => setCurrentStep(currentStep + 1),
                      1000 - speed
                    );
                  }
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Step Info */}
      {steps && steps.length > 0 && currentStep < steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 rounded-xl"
        >
          <p className="text-sm text-gray-300">
            <span className="font-semibold gradient-text">
              {steps[currentStep].type.toUpperCase()}
            </span>
            : {steps[currentStep].description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

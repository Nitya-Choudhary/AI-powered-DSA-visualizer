import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditorPanel from '../components/EditorPanel';
import VisualizationPanel from '../components/VisualizationPanel';
import ControlPanel from '../components/ControlPanel';
import OutputConsole from '../components/OutputConsole';
import TestCases from '../components/TestCases';
import CodeExplanationModal from '../components/CodeExplanationModal';
import CodeAnalysisPanel from '../components/CodeAnalysisPanel';
import { useVisualizerStore } from '../store/visualizerStore';
import { bubbleSort, quickSort, mergeSort, generateExplanation } from '../utils/algorithms';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { AlertCircle, Lightbulb } from 'lucide-react';

export default function EditorPage() {
  const [steps, setSteps] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const {
    code,
    algorithm,
    currentStep,
    setCurrentStep,
    setIsAnimating,
    addLog,
    setOutput,
    testCases,
    currentTestCase,
  } = useVisualizerStore();

  const handleRunVisualization = () => {
    if (!code.trim()) {
      addLog('Error: Please write or paste code first');
      return;
    }

    try {
      // Parse array from input
      const currentTest = testCases[currentTestCase] || {
        input: '5 3 7 1 9 2',
      };
      const array = currentTest.input
        .split(' ')
        .map((x) => parseInt(x))
        .filter((x) => !isNaN(x));

      if (array.length === 0) {
        addLog('Error: Invalid array input');
        return;
      }

      let generatedSteps = [];

      if (algorithm === 'Bubble Sort') {
        generatedSteps = bubbleSort(array);
      } else if (algorithm === 'Quick Sort') {
        generatedSteps = quickSort(array);
      } else if (algorithm === 'Merge Sort') {
        generatedSteps = mergeSort(array);
      } else {
        generatedSteps = bubbleSort(array);
      }

      setSteps(generatedSteps);
      setCurrentStep(0);
      setIsAnimating(true);
      setOutput(`Sorting ${array.length} elements...`);
      addLog(`Started ${algorithm} visualization`);
    } catch (error) {
      addLog(`Error: ${error.message}`);
    }
  };

  const explanation = algorithm ? generateExplanation(algorithm) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="flex mt-20 gap-4 p-4 max-w-7xl mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <EditorPanel onRun={handleRunVisualization} />

            {/* Code Analysis Panel */}
            {code && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm font-medium transition-smooth mb-3 flex items-center justify-center gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  AI Code Analysis
                </motion.button>

                <AnimatePresence>
                  {showAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <CodeAnalysisPanel code={code} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Test Cases */}
            <div className="mt-4">
              <TestCases />
            </div>
          </motion.div>

          {/* Right Panel - Visualization & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Visualization Panel */}
            {steps.length > 0 ? (
              <VisualizationPanel steps={steps} />
            ) : (
              <div className="glass-card p-8 rounded-xl flex items-center justify-center h-96">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No visualization running</p>
                  <p className="text-sm text-gray-500">
                    Click "Run Visualization" to start
                  </p>
                </div>
              </div>
            )}

            {/* Controls */}
            {steps.length > 0 && <ControlPanel totalSteps={steps.length} />}

            {/* Output Console */}
            <div className="space-y-4">
              <OutputConsole />

              {/* Additional Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-4 rounded-xl flex gap-2 flex-wrap"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExplanation(true)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm font-medium transition-smooth"
                >
                  💡 Explain Algorithm
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm font-medium transition-smooth"
                >
                  📊 Compare Algos
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Explanation Modal */}
      <CodeExplanationModal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        algorithm={algorithm}
        code={code}
      />
    </div>
  );
}

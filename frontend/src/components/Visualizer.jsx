import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Copy,
  Trash2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useVisualizerStore } from '../store/visualizerStore';
import { bubbleSort, quickSort, mergeSort, detectAlgorithm } from '../utils/algorithms';
import MonacoEditor from 'react-monaco-editor';

export default function Visualizer() {
  const [steps, setSteps] = useState([]);
  const [activeTab, setActiveTab] = useState('output');
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const {
    code,
    setCode,
    language,
    setLanguage,
    currentStep,
    setCurrentStep,
    isAnimating,
    setIsAnimating,
    isPaused,
    setIsPaused,
    speed,
    setSpeed,
    arrayValues,
    setArrayValues,
    algorithm,
    setAlgorithm,
    output,
    setOutput,
    logs,
    clearLogs,
    addLog,
  } = useVisualizerStore();

  const languages = ['python', 'cpp', 'javascript'];

  // Handle running visualization
  const handleRun = () => {
    if (!code.trim()) {
      addLog('❌ Error: Please enter code first');
      return;
    }

    try {
      const detected = detectAlgorithm(code);
      setAlgorithm(detected);

      const input = '5 3 7 1 9 2 8 4 6';
      const array = input.split(' ').map(Number);

      let generatedSteps = [];
      if (detected.includes('Bubble')) {
        generatedSteps = bubbleSort(array);
      } else if (detected.includes('Quick')) {
        generatedSteps = quickSort(array);
      } else if (detected.includes('Merge')) {
        generatedSteps = mergeSort(array);
      } else {
        generatedSteps = bubbleSort(array);
      }

      setSteps(generatedSteps);
      setCurrentStep(0);
      setArrayValues(array);
      setIsAnimating(true);
      setIsPaused(false);
      setOutput(`🚀 Running ${detected} on ${array.length} elements`);
      addLog(`✅ Started ${detected} visualization`);
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };

  // Handle step updates
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setArrayValues(step.array || []);
      setComparingIndices(step.indices || []);

      if (step.type === 'sorted') {
        setSortedIndices((prev) => [...new Set([...prev, ...step.indices])]);
      }
    }
  }, [currentStep, steps]);

  // Auto-play
  useEffect(() => {
    if (!isAnimating || isPaused || steps.length === 0) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsAnimating(false);
        addLog('✨ Visualization complete!');
      }
    }, 1100 - speed);

    return () => clearTimeout(timer);
  }, [isAnimating, isPaused, currentStep, steps, speed]);

  const handlePlayPause = () => {
    if (!isAnimating) setIsAnimating(true);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAnimating(false);
    setIsPaused(false);
    setSortedIndices([]);
    setComparingIndices([]);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    addLog('📋 Code copied to clipboard');
  };

  const handleClearCode = () => {
    setCode('');
    setSteps([]);
    setCurrentStep(0);
    clearLogs();
  };

  // Visualization rendering
  const maxValue = Math.max(...arrayValues, 100);
  const barHeight = Math.min((300 / arrayValues.length) * 0.8, 50);

  const editorOptions = {
    theme: 'vs-dark',
    fontSize: 13,
    lineNumbers: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    fontFamily: 'Fira Code, monospace',
    padding: { top: 12, bottom: 12 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* TOP NAVBAR */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto w-full">
          <motion.div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DSA Visualizer
            </h1>
          </motion.div>

          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-sm text-white hover:border-white/20 transition-colors focus:outline-none focus:border-blue-400"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.nav>

      {/* MAIN CONTENT GRID - Mt to account for navbar */}
      <div className="flex-1 mt-20 px-4 pb-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-full">
          {/* LEFT SIDEBAR - STATS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-2 space-y-4"
          >
            {/* Algorithm Info Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 hover:border-blue-400/30 transition-colors">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Algorithm
              </h3>
              <p className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                {algorithm || 'Not detected'}
              </p>
              <p className="text-xs text-gray-400">
                Step {currentStep + 1} / {steps.length}
              </p>
            </div>

            {/* Complexity Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 hover:border-purple-400/30 transition-colors">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Complexity
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-blue-400 font-semibold">O(n²)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Space:</span>
                  <span className="text-purple-400 font-semibold">O(1)</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 hover:border-green-400/30 transition-colors">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Progress
              </h3>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: steps.length ? `${((currentStep + 1) / steps.length) * 100}%` : '0%',
                  }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                {steps.length ? Math.round(((currentStep + 1) / steps.length) * 100) : 0}%
              </p>
            </div>
          </motion.div>

          {/* CENTER - CODE EDITOR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 lg:col-span-5 flex flex-col rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 hover:border-blue-400/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Code Editor
              </h2>
            </div>

            {/* Editor Container */}
            <div className="flex-1 editor-container rounded-lg overflow-hidden mb-3 border border-white/10 bg-slate-900/50 min-h-[400px]">
              <MonacoEditor
                language={language}
                value={code}
                onChange={setCode}
                options={editorOptions}
                height="100%"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRun}
                className="flex-1 min-w-[120px] px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Run
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyCode}
                className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCode}
                className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT - VISUALIZATION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-5 flex flex-col rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 hover:border-purple-400/30 transition-colors"
          >
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Visualization
            </h2>

            {/* Visualization Area */}
            <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-900/50 border border-white/10 min-h-[350px] mb-3">
              {arrayValues.length === 0 ? (
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 mb-1">No visualization</p>
                  <p className="text-sm text-gray-500">Click "Run" to start</p>
                </div>
              ) : (
                <motion.div className="flex items-flex-end justify-center gap-1 h-72 w-full px-4">
                  {arrayValues.map((value, idx) => (
                    <motion.div
                      key={idx}
                      layoutId={`bar-${idx}`}
                      animate={{
                        height: `${(value / maxValue) * 280}px`,
                        backgroundColor: sortedIndices.includes(idx)
                          ? '#10b981'
                          : comparingIndices.includes(idx)
                            ? '#60a5fa'
                            : '#8b5cf6',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex-1 rounded-t-md origin-bottom"
                      style={{
                        minWidth: `${Math.max(12, 100 / arrayValues.length)}%`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Step Info */}
            {steps.length > 0 && currentStep < steps.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-slate-800/50 border border-white/10 text-sm text-gray-300 mb-3"
              >
                <span className="font-semibold text-blue-400">{steps[currentStep].type.toUpperCase()}</span>: {steps[currentStep].description}
              </motion.div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="p-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="flex-1 p-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {isPaused ? 'Play' : 'Pause'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep >= steps.length - 1}
                  className="p-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="p-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Speed Control */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 block">Speed Control</label>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM PANEL - OUTPUT & TEST CASES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-white/10 bg-white/5 backdrop-blur-md px-4 py-3"
      >
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-3 border-b border-white/10 pb-3">
            {['output', 'console'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ color: '#60a5fa' }}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400 pb-3 -mb-3'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'output' ? '📊 Output' : '📋 Console'}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'output' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-300 font-mono h-24 overflow-y-auto"
            >
              <p>{output || 'Output appears here...'}</p>
            </motion.div>
          )}

          {activeTab === 'console' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-300 font-mono h-24 overflow-y-auto space-y-1"
            >
              {logs.length === 0 ? (
                <p className="text-gray-500">Console is empty...</p>
              ) : (
                logs.map((log, idx) => (
                  <p key={idx} className="text-gray-400">
                    <span className="text-gray-600">[{log.timestamp.toLocaleTimeString()}]</span> {log.message}
                  </p>
                ))
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

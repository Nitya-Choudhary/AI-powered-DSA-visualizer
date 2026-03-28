import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Copy, Play, RotateCcw, Zap } from 'lucide-react';
import MonacoEditor from 'react-monaco-editor';
import { useVisualizerStore } from '../store/visualizerStore';
import { detectAlgorithm } from '../utils/algorithms';

export default function EditorPanel({ onRun }) {
  const { code, setCode, language, setLanguage, setAlgorithm } =
    useVisualizerStore();
  const editorRef = useRef(null);

  const languages = ['python', 'cpp', 'javascript'];

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRunVisualization = () => {
    const detectedAlgo = detectAlgorithm(code);
    setAlgorithm(detectedAlgo);
    onRun();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleClear = () => {
    setCode('');
  };

  const editorOptions = {
    theme: 'vs-dark',
    fontSize: 14,
    lineNumbers: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: { enabled: true },
    fontFamily: 'Fira Code, monospace',
    padding: { top: 16, bottom: 16 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-screen flex flex-col gap-4 p-4"
    >
      {/* Header */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold gradient-text">Code Editor</h2>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm hover-lift focus:outline-none focus:border-blue-400"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="editor-container h-96 mb-4 rounded-lg overflow-hidden">
          <MonacoEditor
            ref={editorRef}
            language={language}
            value={code}
            onChange={handleEditorChange}
            options={editorOptions}
            height={400}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunVisualization}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover-lift"
          >
            <Play className="w-4 h-4" />
            Run Visualization
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-smooth"
          >
            <Copy className="w-4 h-4" />
            Copy
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-smooth"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-smooth"
          >
            <Zap className="w-4 h-4" />
            Explain Code
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

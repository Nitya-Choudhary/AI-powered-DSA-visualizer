import { motion } from 'framer-motion';
import { Trash2, Copy } from 'lucide-react';
import { useVisualizerStore } from '../store/visualizerStore';

export default function OutputConsole() {
  const { output, logs, clearLogs } = useVisualizerStore();

  const handleCopyOutput = () => {
    const fullOutput = [output, ...logs.map((l) => l.message)].join('\n');
    navigator.clipboard.writeText(fullOutput);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-xl h-48"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold gradient-text text-sm">Output Console</h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyOutput}
            className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
          >
            <Copy className="w-4 h-4 text-blue-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearLogs}
            className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </motion.button>
        </div>
      </div>

      <div className="font-mono text-xs text-gray-300 h-40 overflow-y-auto space-y-1">
        {output && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-green-400">Output:</span> {output}
          </motion.div>
        )}
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-gray-500">[{log.timestamp.toLocaleTimeString()}]</span>{' '}
            <span className="text-blue-400">{log.message}</span>
          </motion.div>
        ))}
        {!output && logs.length === 0 && (
          <p className="text-gray-500">Console output will appear here...</p>
        )}
      </div>
    </motion.div>
  );
}

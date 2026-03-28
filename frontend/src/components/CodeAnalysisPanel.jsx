import { motion } from 'framer-motion';
import { Zap, Code2, AlertCircle, Lightbulb } from 'lucide-react';
import { analyzeCode } from '../utils/aiAnalyzer';

export default function CodeAnalysisPanel({ code }) {
  const analysis = analyzeCode(code);

  const MetricCard = ({ label, value, icon: Icon }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-3 bg-slate-800/50 rounded-lg border border-white/5"
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-blue-400" />
        <p className="text-xs text-gray-400">{label}</p>
      </div>
      <p className="text-lg font-bold gradient-text">{value}</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Algorithm Detection */}
      <motion.div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Algorithm Detection
        </h3>
        <p className="text-lg font-bold gradient-text mb-2">
          {analysis.detectedAlgorithm}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-800/50 p-2 rounded">
            <p className="text-gray-400">Time</p>
            <p className="text-blue-400 font-semibold">
              {analysis.complexity.timeComplexity}
            </p>
          </div>
          <div className="bg-slate-800/50 p-2 rounded">
            <p className="text-gray-400">Space</p>
            <p className="text-purple-400 font-semibold">
              {analysis.complexity.spaceComplexity}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Code Metrics */}
      <motion.div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Code Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard label="Lines" value={analysis.metrics.lines} icon={Code2} />
          <MetricCard
            label="Functions"
            value={analysis.metrics.functions}
            icon={Code2}
          />
          <MetricCard label="Loops" value={analysis.metrics.loops} icon={Code2} />
          <MetricCard
            label="Recursive"
            value={analysis.metrics.recursion ? '✓' : '✗'}
            icon={Code2}
          />
        </div>
      </motion.div>

      {/* Issues */}
      {analysis.issues.length > 0 && (
        <motion.div className="glass-card p-4 rounded-xl border-red-500/30 border">
          <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Issues Found
          </h3>
          <ul className="space-y-2">
            {analysis.issues.map((issue, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 text-sm text-red-300"
              >
                <span className="text-red-400 mt-1">•</span>
                <span>{issue}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <motion.div className="glass-card p-4 rounded-xl border-yellow-500/30 border">
          <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Suggestions
          </h3>
          <ul className="space-y-2">
            {analysis.suggestions.map((suggestion, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-2 text-sm text-yellow-300"
              >
                <span className="text-yellow-400 mt-1">→</span>
                <span>{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

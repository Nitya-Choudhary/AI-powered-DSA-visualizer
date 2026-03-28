import { motion } from 'framer-motion';
import { Plus, Trash2, Play } from 'lucide-react';
import { useState } from 'react';
import { useVisualizerStore } from '../store/visualizerStore';

export default function TestCases() {
  const { testCases, currentTestCase, setCurrentTestCase, addTestCase } =
    useVisualizerStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTestCase, setNewTestCase] = useState({
    name: '',
    input: '',
    expected: '',
  });

  const defaultTestCases = [
    {
      name: 'Small Array',
      input: '5 3 7 1 9 2',
      expected: '1 2 3 5 7 9',
    },
    {
      name: 'Already Sorted',
      input: '1 2 3 4 5',
      expected: '1 2 3 4 5',
    },
    {
      name: 'Reverse Sorted',
      input: '5 4 3 2 1',
      expected: '1 2 3 4 5',
    },
    {
      name: 'Duplicates',
      input: '3 1 3 1 3',
      expected: '1 1 3 3 3',
    },
  ];

  const handleAddTestCase = () => {
    if (newTestCase.name && newTestCase.input) {
      addTestCase(newTestCase);
      setNewTestCase({ name: '', input: '', expected: '' });
      setShowAddForm(false);
    }
  };

  const allTestCases = [...defaultTestCases, ...testCases];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card p-4 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold gradient-text">Test Cases</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
        >
          <Plus className="w-4 h-4 text-blue-400" />
        </motion.button>
      </div>

      {/* Add Test Case Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-4 bg-slate-800/50 rounded-lg space-y-2"
        >
          <input
            type="text"
            placeholder="Test case name"
            value={newTestCase.name}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, name: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-700 border border-white/10 rounded text-sm focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Input"
            value={newTestCase.input}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, input: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-700 border border-white/10 rounded text-sm focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Expected output (optional)"
            value={newTestCase.expected}
            onChange={(e) =>
              setNewTestCase({ ...newTestCase, expected: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-700 border border-white/10 rounded text-sm focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleAddTestCase}
            className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-medium transition-smooth"
          >
            Add Test Case
          </button>
        </motion.div>
      )}

      {/* Test Cases List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {allTestCases.map((testCase, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => setCurrentTestCase(idx)}
            className={`p-3 rounded-lg cursor-pointer transition-smooth ${
              currentTestCase === idx
                ? 'bg-blue-500/20 border border-blue-500/50'
                : 'bg-slate-800/30 border border-white/5 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{testCase.name}</p>
                <p className="text-xs text-gray-400">
                  Input: {testCase.input}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 hover:bg-white/10 rounded transition-smooth"
              >
                <Play className="w-4 h-4 text-blue-400" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

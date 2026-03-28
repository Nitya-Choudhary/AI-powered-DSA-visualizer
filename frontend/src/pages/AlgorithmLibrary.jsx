import { motion } from 'framer-motion';
import { BookOpen, Play, Code2, BarChart3 } from 'lucide-react';

const algorithms = [
  {
    name: 'Bubble Sort',
    difficulty: 'Beginner',
    color: 'from-blue-500 to-blue-600',
    description: 'Simple sorting with adjacent element comparison',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'Quick Sort',
    difficulty: 'Intermediate',
    color: 'from-purple-500 to-purple-600',
    description: 'Fast divide-and-conquer sorting algorithm',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
  },
  {
    name: 'Merge Sort',
    difficulty: 'Intermediate',
    color: 'from-pink-500 to-pink-600',
    description: 'Stable sorting with guaranteed performance',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  {
    name: 'Binary Search',
    difficulty: 'Beginner',
    color: 'from-green-500 to-green-600',
    description: 'Efficient search in sorted arrays',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    name: 'BFS Traversal',
    difficulty: 'Intermediate',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Level-by-level graph traversal',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    name: 'DFS Traversal',
    difficulty: 'Intermediate',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Depth-first graph exploration',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
];

export default function AlgorithmLibrary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold gradient-text">Algorithm Library</h1>
        </div>
        <p className="text-gray-400">
          Explore and practice fundamental algorithms with visual demonstrations
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 mb-8 flex-wrap"
      >
        {['All', 'Sorting', 'Searching', 'Graphs', 'Greedy'].map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
              filter === 'All'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'glass-card hover:border-white/30'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      {/* Algorithm Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {algorithms.map((algo, idx) => (
          <motion.div
            key={algo.name}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-xl overflow-hidden group cursor-pointer"
          >
            {/* Header with Color */}
            <div
              className={`h-24 bg-gradient-to-br ${algo.color} p-6 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">{algo.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(algo.difficulty)}`}>
                  {algo.difficulty}
                </span>
              </div>
              <div className="absolute inset-0 opacity-10">
                <BarChart3 className="w-32 h-32 text-white absolute bottom-0 right-0" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-sm">{algo.description}</p>

              {/* Complexity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Time</p>
                  <p className="text-blue-400 font-semibold text-sm">
                    {algo.timeComplexity}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Space</p>
                  <p className="text-purple-400 font-semibold text-sm">
                    {algo.spaceComplexity}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-smooth text-sm"
                >
                  <Play className="w-4 h-4" />
                  Visualize
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-smooth text-sm"
                >
                  <Code2 className="w-4 h-4" />
                  Code
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Learning Paths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 glass-card p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold gradient-text mb-6">Recommended Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Beginner',
              algos: ['Bubble Sort', 'Binary Search'],
            },
            {
              title: 'Intermediate',
              algos: ['Quick Sort', 'Merge Sort', 'BFS Traversal'],
            },
            {
              title: 'Advanced',
              algos: ['Dynamic Programming', 'Advanced Graphs'],
            },
          ].map((path) => (
            <motion.div key={path.title} className="bg-slate-800/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">{path.title}</h3>
              <ul className="space-y-2">
                {path.algos.map((algo) => (
                  <li key={algo} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {algo}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

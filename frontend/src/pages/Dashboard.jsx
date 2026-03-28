import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Clock, Code2, Eye, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const recentVisualizations = [
    {
      id: 1,
      algorithm: 'Bubble Sort',
      date: '2 hours ago',
      status: 'completed',
      views: 3,
    },
    {
      id: 2,
      algorithm: 'Quick Sort',
      date: '5 hours ago',
      status: 'completed',
      views: 1,
    },
    {
      id: 3,
      algorithm: 'Merge Sort',
      date: '1 day ago',
      status: 'saved',
      views: 5,
    },
    {
      id: 4,
      algorithm: 'Binary Search',
      date: '2 days ago',
      status: 'completed',
      views: 2,
    },
  ];

  const quickStats = [
    { label: 'Total Visualizations', value: '24', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Time', value: '12h 45m', color: 'from-purple-500 to-purple-600' },
    { label: 'Algorithms Learned', value: '8', color: 'from-pink-500 to-pink-600' },
    { label: 'Current Streak', value: '7 days', color: 'from-green-500 to-green-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="flex mt-20 gap-4 p-4">
        <Sidebar />

        <div className="flex-1 max-w-6xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-xl mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Welcome Back!
            </h1>
            <p className="text-gray-300 mb-6">
              Continue learning data structures and algorithms with interactive visualizations
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/visualizer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover-lift"
            >
              Start New Visualization
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {quickStats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glass-card p-6 rounded-xl`}
              >
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <motion.h3
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Visualizations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-xl"
          >
            <h2 className="text-2xl font-bold gradient-text mb-6">
              Recent Visualizations
            </h2>

            <div className="space-y-3">
              {recentVisualizations.map((viz, idx) => (
                <motion.div
                  key={viz.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-white/5 hover:border-white/20 transition-smooth cursor-pointer group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {viz.algorithm}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {viz.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {viz.views} views
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          viz.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {viz.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass-card p-6 rounded-xl"
          >
            <h2 className="text-2xl font-bold gradient-text mb-6">
              Recommended Next Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Binary Search Trees', 'Graph Algorithms', 'Dynamic Programming'].map(
                (topic, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-4 bg-slate-800/30 border border-white/10 rounded-lg hover:border-white/30 transition-smooth cursor-pointer"
                  >
                    <p className="font-medium text-blue-400 mb-2">{topic}</p>
                    <p className="text-sm text-gray-400">
                      Master advanced algorithms
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

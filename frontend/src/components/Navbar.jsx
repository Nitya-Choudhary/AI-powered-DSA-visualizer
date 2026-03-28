import { motion } from 'framer-motion';
import { Code2, LogOut, User } from 'lucide-react';
import { useVisualizerStore } from '../store/visualizerStore';

export default function Navbar() {
  const user = useVisualizerStore((state) => state.user);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glassmorphism fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">DSA Visualizer</h1>
              <p className="text-xs text-gray-400">AI-Powered Learning</p>
            </div>
          </motion.div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              whileHover={{ color: '#60a5fa' }}
              href="/editor"
              className="text-gray-300 hover:text-blue-400 transition-smooth"
            >
              Editor
            </motion.a>
            <motion.a
              whileHover={{ color: '#60a5fa' }}
              href="/dashboard"
              className="text-gray-300 hover:text-blue-400 transition-smooth"
            >
              Dashboard
            </motion.a>
            <motion.a
              whileHover={{ color: '#60a5fa' }}
              href="/docs"
              className="text-gray-300 hover:text-blue-400 transition-smooth"
            >
              Docs
            </motion.a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <motion.div className="flex items-center gap-2 px-4 py-2 glass-card">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-blue-400 hover:text-blue-300 transition-smooth"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover-lift"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

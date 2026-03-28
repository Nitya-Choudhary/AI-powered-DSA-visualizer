import { motion } from 'framer-motion';
import { BarChart3, BookOpen, History, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: BarChart3, label: 'Visualizer', href: '/visualizer' },
    { icon: BookOpen, label: 'Learn', href: '/learn' },
    { icon: History, label: 'History', href: '/history' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="hidden lg:block w-64 glass-card m-4 rounded-xl p-4"
    >
      <nav className="space-y-2">
        {menuItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-blue-400 transition-smooth group"
          >
            <item.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10"
      >
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Quick Stats
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Algorithms</span>
            <span className="text-blue-400 font-semibold">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Visited</span>
            <span className="text-purple-400 font-semibold">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time Saved</span>
            <span className="text-green-400 font-semibold">2h 15m</span>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import AlgorithmLibrary from './pages/AlgorithmLibrary';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Main Routes */}
          <Route path="/visualizer" element={<EditorPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/algorithms" element={<AlgorithmLibrary />} />

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/visualizer" replace />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
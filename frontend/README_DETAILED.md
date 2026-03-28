# 🚀 AI-Powered DSA Visualizer

A modern, production-level web application for visualizing and learning Data Structures and Algorithms with interactive animations, AI-powered code analysis, and step-by-step execution.

## ✨ Features

### Core Visualization
- **Interactive Algorithm Visualizer** - Watch algorithms execute step-by-step with smooth animations
- **Multiple Algorithms** - Bubble Sort, Quick Sort, Merge Sort, Binary Search, BFS, DFS
- **Real-time Animation** - Smooth transitions using Framer Motion
- **Step-by-step Execution** - Play, pause, reset, and navigate through execution

### Code Editor
- **Monaco Editor Integration** - Full VS Code-like code editor with syntax highlighting
- **Language Support** - Python, C++, JavaScript
- **Auto-detection** - Automatically detects algorithm type from code
- **Code Formatting** - Syntax highlighting and beautification

### AI Features
- **Code Analysis** - AI-powered code analysis detecting algorithms, complexity, and issues
- **Algorithm Explanation** - Detailed explanations of each algorithm with complexity analysis
- **Smart Suggestions** - Get recommendations to improve your code
- **Issue Detection** - Identifies potential bugs and optimization opportunities

### Control Panel
- **Playback Controls** - Play, pause, skip, and reset animations
- **Speed Control** - Adjustable speed slider for animation
- **Progress Indicator** - Visual progress bar and step counter
- **Keyboard Support** - Keyboard shortcuts for controls

### Test Cases
- **Pre-loaded Examples** - Sample test cases for each algorithm
- **Custom Test Cases** - Add your own test inputs
- **Expected Output** - Verify results against expected outputs
- **Test Management** - Save and manage test cases

### Dashboard
- **Visualization History** - View previously run code visualizations
- **Quick Stats** - See your progress and learning statistics
- **Learning Path** - Recommended algorithms to learn next
- **Saved Sessions** - Access your previous work

### Authentication
- **User Registration** - Secure sign-up and login
- **Session Management** - Save your progress across sessions
- **Code Snippets** - Save and organize your code snippets
- **Settings** - Personalization and preferences

### UI/UX
- **Dark Theme** - Eye-friendly dark mode (default)
- **Glassmorphism Design** - Modern glass-effect cards with blur
- **Gradient Highlights** - Blue-purple gradient accents
- **Smooth Animations** - Framer Motion for all transitions
- **Responsive Design** - Works on desktop and tablet
- **Premium Feel** - SaaS-level design quality

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM

### Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Left sidebar with menu
│   │   ├── EditorPanel.jsx         # Code editor component
│   │   ├── VisualizationPanel.jsx  # Animation visualization
│   │   ├── ControlPanel.jsx        # Playback controls
│   │   ├── OutputConsole.jsx       # Output display
│   │   ├── TestCases.jsx           # Test case management
│   │   ├── CodeExplanationModal.jsx # Algorithm explanation modal
│   │   ├── CodeAnalysisPanel.jsx   # AI code analysis
│   │   └── Layout.jsx              # Main layout wrapper
│   ├── pages/
│   │   ├── EditorPage.jsx          # Main editor page
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   ├── AuthPage.jsx            # Login/Signup page
│   │   └── AlgorithmLibrary.jsx    # Algorithm library page
│   ├── store/
│   │   └── visualizerStore.js      # Zustand state store
│   ├── utils/
│   │   ├── algorithms.js           # Algorithm implementations
│   │   └── aiAnalyzer.js           # AI code analysis utilities
│   ├── styles/
│   │   └── globals.css             # Global styles and custom utilities
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Base styles
├── public/                         # Static assets
└── tailwind.config.js              # Tailwind configuration
```

## 🎯 Algorithms Included

### Sorting Algorithms
1. **Bubble Sort**
   - Time: O(n²) | Space: O(1)
   - Simple and beginner-friendly

2. **Quick Sort**
   - Time: O(n log n) avg | Space: O(log n)
   - Fast divide-and-conquer approach

3. **Merge Sort**
   - Time: O(n log n) | Space: O(n)
   - Stable and guaranteed performance

### Searching Algorithms
4. **Binary Search**
   - Time: O(log n) | Space: O(1)
   - Efficient search in sorted data

### Graph Algorithms
5. **BFS (Breadth-First Search)**
   - Time: O(V + E) | Space: O(V)
   - Level-by-level traversal

6. **DFS (Depth-First Search)**
   - Time: O(V + E) | Space: O(V)
   - Deep exploration with backtracking

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Production-ready files will be in the `dist/` folder.

## 📖 Usage Guide

### Visualizing an Algorithm

1. **Navigate to Editor** - Go to `/editor` or `/visualizer`
2. **Select Language** - Choose your preferred language (Python, C++, JavaScript)
3. **Paste/Write Code** - Input or paste your algorithm code
4. **Select Test Case** - Choose from pre-loaded or custom test cases
5. **Run Visualization** - Click "Run Visualization" button
6. **Control Playback** - Use play/pause/skip controls
7. **Adjust Speed** - Use the speed slider for animation tempo

### Using Code Analysis

1. **Write Code** - Enter your algorithm code
2. **Click AI Code Analysis** - Opens the analysis panel
3. **Review Insights** - See algorithm detection, complexity analysis, and suggestions

### Exploring Algorithm Library

1. **Visit Algorithm Library** - Navigate to `/algorithms`
2. **Browse Algorithms** - View all available algorithms with details
3. **View Complexity** - See time and space complexity for each
4. **Quick Actions** - Visualize or view code for any algorithm

## 🎨 Design Features

### Color Scheme
- **Background**: Dark gradient (Slate 900 → 800)
- **Primary**: Blue (#60a5fa)
- **Secondary**: Purple (#a78bfa)
- **Accent**: Pink (#ec4899)
- **Text**: Gray (100-400)

### Components
- **Glassmorphism Cards**: Semi-transparent with backdrop blur
- **Gradient Text**: Blue-purple-pink gradient
- **Smooth Animations**: 300ms transitions
- **Hover Effects**: Lift effect with purple shadow

## ⚙️ Configuration

### Tailwind CSS
Configured in `tailwind.config.js` with:
- Custom color palette
- Animation keyframes
- Extended spacing
- Dark mode enabled

### Vite Configuration
Optimized in `vite.config.js` for:
- React plugin
- Fast development
- Optimized builds

### Monaco Editor
Configured with:
- VS Dark theme
- Syntax highlighting
- Line numbers
- Code minimap
- Monospace font (Fira Code)

## 📊 State Management

Using Zustand for global state:
- Code and language selection
- Visualization state (array, steps, timing)
- Test cases management
- User sessions
- Output and logs

## 🔄 Development Workflow

### Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style
- ESLint configured for React
- Tailwind CSS utility-first approach
- Component-driven architecture
- Functional components with hooks

## 🐛 Debugging

### Browser DevTools
- React DevTools for component inspection
- Network tab for API calls
- Console for error messages

### Common Issues

**Issue**: Algorithm not being detected
- **Solution**: Ensure code contains recognizable patterns

**Issue**: Animations stuttering
- **Solution**: Reduce array size or adjust speed

**Issue**: Monaco Editor not loading
- **Solution**: Check browser console for CDN errors

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Zustand](https://github.com/pmndrs/zustand)

## 🎓 Algorithm Complexity Guide

### Time Complexity
- **O(1)** - Constant
- **O(log n)** - Logarithmic (Binary Search)
- **O(n)** - Linear
- **O(n log n)** - Linearithmic (Merge Sort, Quick Sort)
- **O(n²)** - Quadratic (Bubble Sort)
- **O(2ⁿ)** - Exponential

### Space Complexity
- **O(1)** - In-place sorting
- **O(log n)** - Call stack for recursion
- **O(n)** - Additional arrays or maps

## 🚀 Performance Tips

1. **Use smaller arrays** for smooth animations (< 50 elements)
2. **Adjust speed slider** if animations lag
3. **Close unused tabs** for better performance
4. **Use modern browsers** (Chrome, Firefox, Safari)

## 🔐 Security

- User authentication (JWT or Firebase)
- Secure code storage
- Input validation
- XSS protection
- CSRF protection (to be implemented)

## 📱 Responsive Design

- **Desktop**: Full-featured interface
- **Tablet**: Adjusted layout with sidebar collapse
- **Mobile**: Stack layout with mobile navigation

## 🎯 Future Enhancements

- [ ] More algorithms (Tree, Graph, DP)
- [ ] Code execution in sandbox
- [ ] Collaborative features
- [ ] Algorithm comparison mode
- [ ] Advanced analytics
- [ ] Community sharing
- [ ] Mobile app (React Native)

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review algorithm explanations

---

**Built with ❤️ for algorithm enthusiasts and learners**
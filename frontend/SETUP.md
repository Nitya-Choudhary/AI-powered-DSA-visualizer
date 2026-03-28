# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173/ in your browser

### 3. Access the App
- **Editor/Visualizer**: http://localhost:5173/visualizer
- **Dashboard**: http://localhost:5173/dashboard
- **Algorithm Library**: http://localhost:5173/algorithms
- **Login/Signup**: http://localhost:5173/auth

## Main Features

### Editor Page Features
1. **Code Editor** (Left Panel)
   - Language selection (Python, C++, JavaScript)
   - Syntax highlighting
   - Copy / Clear buttons
   - Paste sample code

2. **Visualization** (Right Panel)
   - Step-by-step animation
   - Color-coded bars (comparing, swapping, sorted)
   - Array values as bars

3. **Controls** (Bottom Right)
   - Play/Pause button
   - Step forward/backward
   - Reset button
   - Speed slider

4. **Test Cases** (Left Panel Bottom)
   - Pre-loaded test cases
   - Add custom test cases
   - Select active test case

5. **Output Console** (Right Panel Bottom)
   - Execution logs
   - Clear / Copy buttons

### Additional Features
- **AI Code Analysis** - Analyzes your code for algorithm type, complexity, issues
- **Algorithm Explanation** - Detailed explanation modal
- **Code Comparison** - Compare different algorithms

## Building for Production

```bash
npm run build
```

Output files go to `dist/` folder

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Module Not Found
Clear node_modules and reinstall:
```bash
rm -r node_modules
npm install
```

### Build Fails
Check for TypeScript errors and resolve them

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Full page components
├── store/          # Zustand state management
├── utils/          # Utility functions & algorithms
└── styles/         # Global styles
```

## Key Technologies

- **React 19** - UI Framework
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Monaco Editor** - Code editor
- **Zustand** - State management
- **Vite** - Build tool

## Next Steps

1. Explore the Editor page
2. Try different algorithms
3. Customize test cases
4. Add more algorithms
5. Implement backend API

Happy Learning! 🎓
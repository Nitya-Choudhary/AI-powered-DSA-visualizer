/**
 * AI Algorithm Detection & Analysis
 * Uses code patterns to detect algorithms and provide insights
 */

export const analyzeCode = (code) => {
  const lowerCode = code.toLowerCase();
  const lines = code.split('\n');

  const analysis = {
    detectedAlgorithm: detectAlgorithmType(code),
    complexity: estimateComplexity(code),
    issues: findCommonIssues(code),
    suggestions: provideSuggestions(code),
    metrics: {
      lines: lines.length,
      functions: countFunctions(code),
      loops: countLoops(code),
      recursion: hasRecursion(code),
    },
  };

  return analysis;
};

const detectAlgorithmType = (code) => {
  const lowerCode = code.toLowerCase();

  const patterns = [
    {
      name: 'Bubble Sort',
      patterns: ['bubble', 'adjacent', 'swap', 'i<n', 'j<n-i'],
    },
    {
      name: 'Quick Sort',
      patterns: ['quick', 'partition', 'pivot', 'quickSort'],
    },
    {
      name: 'Merge Sort',
      patterns: ['merge', 'divide', 'mid', 'mergeSort', 'left', 'right'],
    },
    {
      name: 'Binary Search',
      patterns: ['binary', 'mid', 'left', 'right', 'target', 'bsearch'],
    },
    { name: 'BFS', patterns: ['bfs', 'queue', 'level', 'neighbor'] },
    { name: 'DFS', patterns: ['dfs', 'stack', 'recursion', 'visited'] },
  ];

  for (const pattern of patterns) {
    const matches = pattern.patterns.filter((p) => lowerCode.includes(p)).length;
    if (matches >= 2) return pattern.name;
  }

  return 'Custom Algorithm';
};

const estimateComplexity = (code) => {
  let timeComplexity = 'O(n)';
  let spaceComplexity = 'O(1)';

  const lowerCode = code.toLowerCase();

  // Time Complexity Detection
  if (lowerCode.includes('nested') || (lowerCode.match(/for/g) || []).length >= 2) {
    timeComplexity = 'O(n²)';
  }
  if (lowerCode.includes('log')) {
    timeComplexity = 'O(n log n)';
  }
  if (lowerCode.includes('factorial') || lowerCode.includes('.**')) {
    timeComplexity = 'O(2ⁿ)';
  }

  // Space Complexity Detection
  if (lowerCode.includes('array') || lowerCode.includes('list')) {
    spaceComplexity = 'O(n)';
  }
  if (lowerCode.includes('recursive')) {
    spaceComplexity = 'O(n) - Stack';
  }

  return { timeComplexity, spaceComplexity };
};

const findCommonIssues = (code) => {
  const issues = [];

  // Check for infinite loops
  if (!hasBreakStatement(code) && hasWhileLoop(code)) {
    issues.push('Potential infinite loop detected');
  }

  // Check for off-by-one errors
  if (code.includes('i <= n') || code.includes('j <= len')) {
    issues.push('Possible off-by-one error');
  }

  // Check for uninitialized variables
  if (code.match(/var\s+\w+\s*[;,]/)) {
    issues.push('Uninitialized variables detected');
  }

  return issues;
};

const provideSuggestions = (code) => {
  const suggestions = [];

  if (!code.includes('//') && !code.includes('/*')) {
    suggestions.push('Add comments to explain algorithm logic');
  }

  if (!code.includes('error') && !code.includes('try')) {
    suggestions.push('Consider adding error handling');
  }

  if (code.split('\n').some((line) => line.length > 100)) {
    suggestions.push('Some lines are too long, consider breaking them up');
  }

  if (!code.includes('test') && !code.includes('assert')) {
    suggestions.push('Add test cases to verify algorithm');
  }

  return suggestions;
};

const countFunctions = (code) => {
  return (code.match(/def\s|\bfunction\s|=>/g) || []).length;
};

const countLoops = (code) => {
  return (
    (code.match(/\bfor\b|\bwhile\b/g) || []).length +
    (code.match(/\.forEach\(|\.map\(/g) || []).length
  );
};

const hasRecursion = (code) => {
  const lines = code.split('\n');
  const functionNames = (code.match(/function\s+(\w+)/g) || []).map((m) =>
    m.replace(/function\s+/, '')
  );
  return functionNames.some((name) =>
    lines.some((line) =>
      new RegExp(`\\b${name}\\s*\\(`).test(line) && !line.trim().startsWith('//'),
    ),
  );
};

const hasBreakStatement = (code) => {
  return /\bbreak\b/.test(code);
};

const hasWhileLoop = (code) => {
  return /\bwhile\b/.test(code);
};

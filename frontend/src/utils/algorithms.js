/**
 * Algorithm Step Generator for Visualization
 * Each algorithm returns steps for animation
 */

export const bubbleSort = (arr) => {
  const steps = [];
  const n = arr.length;
  let array = [...arr];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...array],
        description: `Comparing arr[${j}] and arr[${j + 1}]`,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...array],
          description: `Swapped arr[${j}] and arr[${j + 1}]`,
        });
      }
    }
    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      array: [...array],
      description: `Element at position ${n - i - 1} is sorted`,
    });
  }

  return steps;
};

export const quickSort = (arr) => {
  const steps = [];

  const partition = (low, high, array) => {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: 'compare',
        indices: [j, high],
        array: [...array],
        description: `Comparing arr[${j}] with pivot ${pivot}`,
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          type: 'swap',
          indices: [i, j],
          array: [...array],
          description: `Swapped arr[${i}] and arr[${j}]`,
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      array: [...array],
      description: `Pivot placed at position ${i + 1}`,
    });

    return i + 1;
  };

  const quickSortHelper = (low, high, array) => {
    if (low < high) {
      let pi = partition(low, high, array);
      quickSortHelper(low, pi - 1, array);
      quickSortHelper(pi + 1, high, array);
    }
  };

  const array = [...arr];
  quickSortHelper(0, array.length - 1, array);

  return steps;
};

export const mergeSort = (arr) => {
  const steps = [];

  const merge = (left, right, array) => {
    let result = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      steps.push({
        type: 'compare',
        indices: [i, j],
        array: [...array],
        description: `Comparing ${left[i]} and ${right[j]}`,
      });

      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    result = result.concat(left.slice(i)).concat(right.slice(j));
    steps.push({
      type: 'merge',
      array: [...array],
      description: 'Merging arrays',
    });

    return result;
  };

  const mergeSortHelper = (array) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = mergeSortHelper(array.slice(0, mid));
    const right = mergeSortHelper(array.slice(mid));

    return merge(left, right, array);
  };

  mergeSortHelper([...arr]);
  return steps;
};

export const detectAlgorithm = (code) => {
  const lowerCode = code.toLowerCase();

  if (
    lowerCode.includes('bubble') ||
    (lowerCode.includes('for') && lowerCode.includes('swap'))
  ) {
    return 'Bubble Sort';
  }
  if (
    lowerCode.includes('quick') ||
    lowerCode.includes('partition') ||
    lowerCode.includes('pivot')
  ) {
    return 'Quick Sort';
  }
  if (
    lowerCode.includes('merge') ||
    (lowerCode.includes('divide') && lowerCode.includes('conquer'))
  ) {
    return 'Merge Sort';
  }
  if (lowerCode.includes('bfs') || lowerCode.includes('queue')) {
    return 'BFS Traversal';
  }
  if (lowerCode.includes('dfs') || lowerCode.includes('stack')) {
    return 'DFS Traversal';
  }

  return 'Unknown Algorithm';
};

export const generateExplanation = (algorithm) => {
  const explanations = {
    'Bubble Sort': `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. This process continues until no more swaps are needed.\n\nTime Complexity: O(n²)\nSpace Complexity: O(1)`,
    'Quick Sort': `Quick Sort is a divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it. Elements smaller than the pivot go to the left, larger elements go to the right. This process repeats for subarray.\n\nTime Complexity: O(n log n) average, O(n²) worst\nSpace Complexity: O(log n)`,
    'Merge Sort': `Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.\n\nTime Complexity: O(n log n)\nSpace Complexity: O(n)`,
    'BFS Traversal': `Breadth-First Search explores a graph level by level, starting from a source node. Uses a queue data structure to process nodes in FIFO order.\n\nTime Complexity: O(V + E)\nSpace Complexity: O(V)`,
    'DFS Traversal': `Depth-First Search explores as far as possible along each branch before backtracking. Uses a stack or recursion.\n\nTime Complexity: O(V + E)\nSpace Complexity: O(V)`,
  };

  return explanations[algorithm] || `Algorithm: ${algorithm}\n\nThis algorithm performs data structure operations with controlled step-by-step execution.`;
};

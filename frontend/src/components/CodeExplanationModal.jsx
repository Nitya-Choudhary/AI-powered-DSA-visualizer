import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download } from 'lucide-react';

export default function CodeExplanationModal({ isOpen, onClose, algorithm, code }) {
  if (!isOpen) return null;

  const explanations = {
    'Bubble Sort': `
# Bubble Sort Algorithm

## Overview
Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.

## How it works:
1. Start from the beginning of the array
2. Compare two adjacent elements
3. If the first is greater than the second, swap them
4. Move to the next pair and repeat
5. Continue until the array is sorted

## Key Points:
- **Time Complexity**: O(n²) in worst/average case, O(n) in best case
- **Space Complexity**: O(1) - sorts in place
- **Stability**: Yes - maintains relative order of equal elements
- **Use Case**: Small datasets, nearly sorted data, or learning purposes

## Advantages:
✓ Simple to understand and implement
✓ No extra space required
✓ Efficient for small datasets
✓ Good for detecting if array is sorted

## Disadvantages:
✗ Very inefficient for large datasets
✗ Much slower than advanced algorithms
✗ Not suitable for real-world applications with big data
    `,
    'Quick Sort': `
# Quick Sort Algorithm

## Overview
Quick Sort is a divide-and-conquer algorithm that divides the array into smaller subarrays and sorts them recursively.

## How it works:
1. Select a pivot element
2. Partition array into three parts: < pivot, = pivot, > pivot
3. Recursively sort the partitions
4. Combine the results

## Key Points:
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n) due to recursion
- **Stability**: Depends on implementation
- **Use Case**: General-purpose sorting, large datasets

## Advantages:
✓ Very efficient for large datasets
✓ In-place sorting
✓ Cache-friendly
✓ Average case is much better than worst case

## Disadvantages:
✗ Worst-case performance can be O(n²)
✗ Unstable in many implementations
✗ Recursive (uses stack space)
    `,
    'Merge Sort': `
# Merge Sort Algorithm

## Overview
Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves.

## How it works:
1. Divide the array into halves
2. Recursively sort left half
3. Recursively sort right half
4. Merge the two sorted halves

## Key Points:
- **Time Complexity**: O(n log n) in all cases
- **Space Complexity**: O(n) for merging
- **Stability**: Yes - maintains relative order
- **Use Case**: Large datasets, guaranteed performance

## Advantages:
✓ Guaranteed O(n log n) performance
✓ Stable sorting
✓ Good for external sorting
✓ Predictable performance

## Disadvantages:
✗ Requires O(n) extra space
✗ Slower than Quick Sort in practice
✗ Not in-place
✗ More complex to implement
    `,
  };

  const content = explanations[algorithm] || 'Algorithm details not available.';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto"
        >
          <div className="p-6 sticky top-0 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">{algorithm}</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>

          <div className="p-6 prose prose-invert max-w-none">
            <pre className="bg-slate-800/50 p-4 rounded-lg text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
              {content}
            </pre>
          </div>

          <div className="p-6 border-t border-white/10 flex gap-3 sticky bottom-0 bg-slate-900/80">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(content)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-smooth"
            >
              <Copy className="w-4 h-4" />
              Copy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-smooth"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

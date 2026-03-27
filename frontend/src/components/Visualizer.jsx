import React, { useEffect, useMemo, useState } from "react";

const sortingAlgorithms = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
};

const searchingAlgorithms = {
  linear: "Linear Search",
  binary: "Binary Search",
};

const graphAlgorithms = {
  bfs: "Breadth-First Search (BFS)",
  dfs: "Depth-First Search (DFS)",
  dijkstra: "Dijkstra's Algorithm",
};

const treeAlgorithms = {
  inorder: "Inorder Traversal",
  preorder: "Preorder Traversal",
  postorder: "Postorder Traversal",
  bstInsert: "BST Insert",
};

const arrayAlgorithms = {
  insert: "Insert Element",
  delete: "Delete Element",
  search: "Search Element",
};

const stringAlgorithms = {
  kmp: "KMP Pattern Matching",
  palindrome: "Palindrome Check",
};

const trieAlgorithms = {
  insert: "Trie Insert",
  search: "Trie Search",
  delete: "Trie Delete",
};

const dsAlgorithms = {
  push: "Stack Push",
  pop: "Stack Pop",
  enqueue: "Queue Enqueue",
  dequeue: "Queue Dequeue",
  insertHead: "LinkedList Insert Head",
  removeHead: "LinkedList Remove Head",
};

const topicToAlgorithms = {
  Sorting: sortingAlgorithms,
  Searching: searchingAlgorithms,
  Graph: graphAlgorithms,
  Tree: treeAlgorithms,
  Arrays: arrayAlgorithms,
  Strings: stringAlgorithms,
  Tries: trieAlgorithms,
  "Data Structures": dsAlgorithms,
  "Custom Code": {},
};

const topicDetails = {
  Sorting: "Sort data in order using classic algorithms with visual comparison and swap phases.",
  Searching: "Search data in arrays with linear and binary techniques, with highlight-driven steps.",
  Graph: "Traverse graph nodes using BFS or DFS to learn shortest reachability and backtracking.",
  Tree: "Explore binary tree traversals in order, preorder, and postorder in real-time.",
  Arrays: "Perform array operations like insert, delete, and search with step-by-step visualization.",
  Strings: "Visualize string algorithms such as pattern matching and palindrome checks.",
  Tries: "Interact with Trie data structure for insert, search, and delete operations.",
  "Data Structures": "Interactively manipulate Stack, Queue, and Linked List operations and watch structure changes.",
  "Custom Code": "Paste your code and visualize supported algorithms automatically.",
};

const chooseAIAlgorithm = (topic, size) => {
  if (topic === "Sorting") {
    if (size <= 20) return "insertion";
    if (size <= 60) return "bubble";
    if (size <= 150) return "merge";
    return "quick";
  }
  if (topic === "Searching") return "linear";
  if (topic === "Graph") return "bfs";
  if (topic === "Tree") return "inorder";
  if (topic === "Arrays") return "insert";
  if (topic === "Strings") return "palindrome";
  if (topic === "Tries") return "insert";
  if (topic === "Data Structures") return "push";
  return "";
};

const generateSortingSteps = (arr, algorithm) => {
  const steps = [];
  const array = [...arr];
  const capture = (type, indices, message) => {
    steps.push({ type, indices, array: [...array], message });
  };

  if (algorithm === "bubble") {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        capture("compare", [j, j + 1], `Compare index ${j} and ${j + 1}`);
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          capture("swap", [j, j + 1], `Swap index ${j} and ${j + 1}`);
        }
      }
      capture("sorted", [array.length - i - 1], `Position ${array.length - i - 1} sorted`);
    }
  } else if (algorithm === "selection") {
    for (let i = 0; i < array.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < array.length; j++) {
        capture("compare", [min, j], `Compare index ${min} and ${j}`);
        if (array[j] < array[min]) min = j;
      }
      if (min !== i) {
        [array[i], array[min]] = [array[min], array[i]];
        capture("swap", [i, min], `Swap index ${i} and ${min}`);
      }
      capture("sorted", [i], `Position ${i} sorted`);
    }
    if (array.length) capture("sorted", [array.length - 1], "Final item sorted");
  } else if (algorithm === "insertion") {
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        capture("compare", [j, j + 1], `Compare ${j} and ${j + 1}`);
        array[j + 1] = array[j];
        capture("swap", [j, j + 1], `Shift ${j} to ${j + 1}`);
        j -= 1;
      }
      array[j + 1] = key;
      capture("insertion", [j + 1], `Insert key at ${j + 1}`);
    }
    array.forEach((_, index) => capture("sorted", [index], `Position ${index} sorted`));
  } else if (algorithm === "merge") {
    const merge = (left, mid, right) => {
      const leftArr = array.slice(left, mid + 1);
      const rightArr = array.slice(mid + 1, right + 1);
      let i = 0;
      let j = 0;
      let k = left;
      while (i < leftArr.length && j < rightArr.length) {
        capture("compare", [left + i, mid + 1 + j], `Compare ${left + i} and ${mid + 1 + j}`);
        if (leftArr[i] <= rightArr[j]) {
          array[k++] = leftArr[i++];
        } else {
          array[k++] = rightArr[j++];
        }
        capture("swap", [k - 1], `Set position ${k - 1}`);
      }
      while (i < leftArr.length) {
        array[k++] = leftArr[i++];
        capture("swap", [k - 1], `Write point ${k - 1}`);
      }
      while (j < rightArr.length) {
        array[k++] = rightArr[j++];
        capture("swap", [k - 1], `Write point ${k - 1}`);
      }
    };
    const mergeSort = (left, right) => {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    };
    mergeSort(0, array.length - 1);
    capture("sorted-all", [], "All sorted");
  } else if (algorithm === "quick") {
    const quickSort = (low, high) => {
      if (low >= high) return;
      const pivot = array[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        capture("compare", [j, high], `Compare ${j} to pivot ${high}`);
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          capture("swap", [i, j], `Swap ${i} and ${j}`);
        }
      }
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      capture("swap", [i + 1, high], `Pivot place ${i + 1}`);
      const p = i + 1;
      quickSort(low, p - 1);
      quickSort(p + 1, high);
    };
    quickSort(0, array.length - 1);
    capture("sorted-all", [], "All sorted");
  }

  return steps;
};

const generateSearchingSteps = (arr, algorithm, target) => {
  const steps = [];
  const array = [...arr];
  const capture = (type, indices, message, found = false) => {
    steps.push({ type, indices, array: [...array], message, found });
  };

  if (algorithm === "linear") {
    for (let i = 0; i < array.length; i++) {
      capture("compare", [i], `Compare index ${i}`);
      if (array[i] === target) {
        capture("found", [i], `Found at index ${i}`, true);
        return steps;
      }
    }
    capture("not-found", [], `${target} not in array`, false);
  } else if (algorithm === "binary") {
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      capture("compare", [mid], `Check middle ${mid}`);
      if (array[mid] === target) {
        capture("found", [mid], `Found at index ${mid}`, true);
        return steps;
      }
      if (array[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    capture("not-found", [], `No match for ${target}`, false);
  }

  return steps;
};

const defaultGraph = {
  nodes: ["A", "B", "C", "D", "E", "F", "G"],
  edges: [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
    ["C", "F"],
    ["E", "G"],
  ],
};

const generateGraphSteps = (graph, algorithm, start = "A") => {
  const steps = [];
  const visited = new Set();
  const adj = {};
  graph.nodes.forEach((n) => (adj[n] = []));
  graph.edges.forEach(([u, v]) => {
    adj[u].push(v);
    adj[v].push(u);
  });

  const capture = (type, current, where, message) => {
    steps.push({ type, current, where, visited: [...visited], graph, message });
  };

  if (algorithm === "bfs") {
    const queue = [start];
    visited.add(start);
    capture("visit", start, "queue", `Start BFS from ${start}`);
    while (queue.length) {
      const node = queue.shift();
      capture("dequeue", node, "queue", `Dequeue ${node}`);
      adj[node].forEach((next) => {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
          capture("visit", next, "queue", `Visit ${next} from ${node}`);
        }
      });
    }
  } else if (algorithm === "dfs") {
    const stack = [start];
    while (stack.length) {
      const node = stack.pop();
      if (visited.has(node)) continue;
      visited.add(node);
      capture("visit", node, "stack", `Visit ${node}`);
      [...adj[node]].sort().reverse().forEach((next) => {
        if (!visited.has(next)) {
          stack.push(next);
          capture("push", next, "stack", `Push ${next}`);
        }
      });
    }
  }

  steps.push({ type: "done", current: null, where: null, visited: [...visited], graph, message: "Traversal complete" });
  return steps;
};

const defaultTree = [
  { id: 1, value: 8, left: 2, right: 3 },
  { id: 2, value: 4, left: 4, right: 5 },
  { id: 3, value: 12, left: 6, right: 7 },
  { id: 4, value: 2, left: null, right: null },
  { id: 5, value: 6, left: null, right: null },
  { id: 6, value: 10, left: null, right: null },
  { id: 7, value: 14, left: null, right: null },
];

const generateTreeSteps = (nodes, algorithm) => {
  const steps = [];
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const visit = (id, msg) => {
    if (!id) return;
    steps.push({ type: "visit", id, message: msg, nodes, history: [] });
  };

  const inorder = (id) => {
    if (!id) return;
    const node = map[id];
    inorder(node.left);
    visit(id, `Inorder visit ${node.value}`);
    inorder(node.right);
  };

  const preorder = (id) => {
    if (!id) return;
    const node = map[id];
    visit(id, `Preorder visit ${node.value}`);
    preorder(node.left);
    preorder(node.right);
  };

  const postorder = (id) => {
    if (!id) return;
    const node = map[id];
    postorder(node.left);
    postorder(node.right);
    visit(id, `Postorder visit ${node.value}`);
  };

  if (algorithm === "inorder") inorder(1);
  if (algorithm === "preorder") preorder(1);
  if (algorithm === "postorder") postorder(1);

  steps.push({ type: "done", message: `${algorithm} complete` });
  return steps;
};

const generateArraySteps = (arr, algorithm, value, index) => {
  const steps = [];
  let array = [...arr];
  const capture = (type, indices, message) => {
    steps.push({ type, indices, array: [...array], message });
  };

  if (algorithm === "insert") {
    array.splice(index, 0, value);
    capture("insert", [index], `Inserted ${value} at index ${index}`);
  } else if (algorithm === "delete") {
    array.splice(index, 1);
    capture("delete", [index], `Deleted element at index ${index}`);
  } else if (algorithm === "search") {
    for (let i = 0; i < array.length; i++) {
      capture("compare", [i], `Check index ${i}`);
      if (array[i] === value) {
        capture("found", [i], `Found ${value} at index ${i}`, true);
        return steps;
      }
    }
    capture("not-found", [], `${value} not found`);
  }

  return steps;
};

const generateStringSteps = (str, algorithm, pattern) => {
  const steps = [];
  const capture = (type, indices, message) => {
    steps.push({ type, indices, string: str, message });
  };

  if (algorithm === "palindrome") {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      capture("compare", [left, right], `Compare ${str[left]} and ${str[right]}`);
      if (str[left] !== str[right]) {
        capture("not-palindrome", [], "Not a palindrome");
        return steps;
      }
      left++;
      right--;
    }
    capture("palindrome", [], "Is a palindrome");
  } else if (algorithm === "kmp") {
    // Simplified KMP
    const n = str.length;
    const m = pattern.length;
    for (let i = 0; i <= n - m; i++) {
      let j;
      for (j = 0; j < m; j++) {
        capture("compare", [i + j], `Check ${str[i + j]} vs ${pattern[j]}`);
        if (str[i + j] !== pattern[j]) break;
      }
      if (j === m) {
        capture("found", [i], `Pattern found at ${i}`);
        return steps;
      }
    }
    capture("not-found", [], "Pattern not found");
  }

  return steps;
};

const generateTrieSteps = (algorithm, word) => {
  const steps = [];
  const trie = {};
  const capture = (type, node, message) => {
    steps.push({ type, node, trie: { ...trie }, message });
  };

  if (algorithm === "insert") {
    let node = trie;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
      capture("insert", node, `Insert ${char}`);
    }
    node.isEnd = true;
    capture("end", node, `Mark end for ${word}`);
  } else if (algorithm === "search") {
    let node = trie;
    for (const char of word) {
      if (!node[char]) {
        capture("not-found", node, `${word} not found`);
        return steps;
      }
      node = node[char];
      capture("search", node, `Search ${char}`);
    }
    if (node.isEnd) {
      capture("found", node, `${word} found`);
    } else {
      capture("not-found", node, `${word} not found`);
    }
  }

  return steps;
};

const Visualizer = () => {
  const [topic, setTopic] = useState("Sorting");
  const [algorithm, setAlgorithm] = useState("auto");
  const [aiAlgorithm, setAiAlgorithm] = useState("auto");
  const [speed, setSpeed] = useState(210);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [message, setMessage] = useState("Ready");
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [targetValue, setTargetValue] = useState(42);
  const [insertValue, setInsertValue] = useState(50);
  const [insertIndex, setInsertIndex] = useState(0);
  const [stringInput, setStringInput] = useState("radar");
  const [pattern, setPattern] = useState("dar");
  const [trieWord, setTrieWord] = useState("hello");
  const [code, setCode] = useState("// Paste your code here\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}");

  const [array, setArray] = useState([]);
  const [graph, setGraph] = useState(defaultGraph);
  const [tree, setTree] = useState(defaultTree);
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [linkedList, setLinkedList] = useState([]);

  useEffect(() => {
    initArray();
    setStack([5, 4, 3]);
    setQueue([10, 20, 30]);
    setLinkedList([15, 25, 35]);
  }, []);

  useEffect(() => {
    if (!isRunning && topic === "Sorting") {
      setAlgorithm("auto");
      setAiAlgorithm("auto");
    }
  }, [topic, isRunning]);

  const initArray = (size = 28) => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 6);
    setArray(arr);
    setActive([]);
    setCompleted([]);
    setSteps([]);
    setStepIndex(0);
    setMessage("Ready");
  };

  const getAvailableAlgo = () => {
    const opts = topicToAlgorithms[topic];
    if (!opts) return [];
    return Object.entries(opts);
  };

  const chosenAlgorithm = useMemo(() => {
    if (algorithm !== "auto") return algorithm;
    if (aiAlgorithm !== "auto") return aiAlgorithm;
    return chooseAIAlgorithm(topic, array.length);
  }, [topic, algorithm, aiAlgorithm, array.length]);

  const generateSteps = () => {
    if (topic === "Sorting") return generateSortingSteps(array, chosenAlgorithm);
    if (topic === "Searching") {
      const sorted = [...array].sort((a, b) => a - b);
      setArray(sorted);
      return generateSearchingSteps(sorted, chosenAlgorithm, Number(targetValue));
    }
    if (topic === "Graph") return generateGraphSteps(graph, chosenAlgorithm);
    if (topic === "Tree") return generateTreeSteps(tree, chosenAlgorithm);
    if (topic === "Arrays") return generateArraySteps(array, chosenAlgorithm, Number(insertValue), Number(insertIndex));
    if (topic === "Strings") return generateStringSteps(stringInput, chosenAlgorithm, pattern);
    if (topic === "Tries") return generateTrieSteps(chosenAlgorithm, trieWord);
    if (topic === "Data Structures") {
      const steps = [];
      const stampStep = (type, payload) => {
        steps.push({ type, payload, stack: [...stack], queue: [...queue], linkedList: [...linkedList] });
      };
      if (chosenAlgorithm === "push") {
        stampStep("push", Math.floor(Math.random() * 100));
      } else if (chosenAlgorithm === "pop") {
        stampStep("pop", null);
      } else if (chosenAlgorithm === "enqueue") {
        stampStep("enqueue", Math.floor(Math.random() * 100));
      } else if (chosenAlgorithm === "dequeue") {
        stampStep("dequeue", null);
      } else if (chosenAlgorithm === "insertHead") {
        stampStep("insertHead", Math.floor(Math.random() * 100));
      } else if (chosenAlgorithm === "removeHead") {
        stampStep("removeHead", null);
      }
      steps.push({ type: "done", message: "DS action complete" });
      return steps;
    }
    if (topic === "Custom Code") {
      // Simple detection
      if (code.includes("bubbleSort")) return generateSortingSteps(array, "bubble");
      if (code.includes("selectionSort")) return generateSortingSteps(array, "selection");
      // Add more detections
      return [];
    }
    return [];
  };

  const applyStep = (step) => {
    if (!step) return;
    setMessage(step.message || "");

    if (topic === "Sorting" || topic === "Searching" || topic === "Arrays") {
      if (step.array) setArray(step.array);
      setActive(step.indices ? [...step.indices] : []);
      if (step.type === "sorted") {
        setCompleted((prev) => [...new Set([...prev, ...step.indices])]);
      }
      if (step.type === "sorted-all") {
        setCompleted(Array.from({ length: array.length }, (_, i) => i));
      }
      if (step.type === "found") {
        setCompleted(step.indices);
      }
    } else if (topic === "Graph") {
      setActive(step.current ? [graph.nodes.indexOf(step.current)] : []);
      setMessage(step.message || "");
    } else if (topic === "Tree") {
      setActive(step.id ? [step.id] : []);
    } else if (topic === "Strings") {
      setActive(step.indices || []);
    } else if (topic === "Data Structures") {
      let nextStack = [...stack];
      let nextQueue = [...queue];
      let nextList = [...linkedList];
      if (step.type === "push") {
        nextStack.push(step.payload);
        setMessage(`Stack push ${step.payload}`);
      }
      if (step.type === "pop") {
        nextStack.pop();
        setMessage("Stack pop");
      }
      if (step.type === "enqueue") {
        nextQueue.push(step.payload);
        setMessage(`Queue enqueue ${step.payload}`);
      }
      if (step.type === "dequeue") {
        nextQueue.shift();
        setMessage("Queue dequeue");
      }
      if (step.type === "insertHead") {
        nextList.unshift(step.payload);
        setMessage(`LinkedList insert ${step.payload}`);
      }
      if (step.type === "removeHead") {
        nextList.shift();
        setMessage("LinkedList remove head");
      }
      setStack(nextStack);
      setQueue(nextQueue);
      setLinkedList(nextList);
    }
  };

  const start = async () => {
    if (isRunning) return;
    const planned = generateSteps();
    setSteps(planned);
    setStepIndex(0);
    setIsRunning(true);
    setIsPaused(false);
    setCompleted([]);

    for (let i = 0; i < planned.length; i++) {
      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      if (!isRunning) break;
      const step = planned[i];
      applyStep(step);
      setStepIndex(i + 1);
      await new Promise((resolve) => setTimeout(resolve, Math.max(20, 400 - speed)));
    }
    setIsRunning(false);
    setActive([]);
  };

  const pause = () => {
    if (!isRunning) return;
    setIsPaused((current) => !current);
    setMessage(isPaused ? "Resumed" : "Paused");
  };

  const reset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStepIndex(0);
    setSteps([]);
    setActive([]);
    setCompleted([]);
    setMessage("Reset");
    initArray();
  };

  const suggestAlgorithm = () => {
    const suggestion = chooseAIAlgorithm(topic, array.length);
    setAiAlgorithm(suggestion);
    setAlgorithm("auto");
    setMessage(`AI Suggests: ${topicToAlgorithms[topic][suggestion] || suggestion}`);
  };

  const renderMainDisplay = () => {
    if (topic === "Sorting" || topic === "Searching" || topic === "Arrays") {
      return (
        <div className="flex items-end h-80 gap-1 overflow-x-auto p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          {array.map((value, idx) => {
            const isActive = active.includes(idx);
            const isCompleted = completed.includes(idx);
            return (
              <div
                key={idx}
                className={`flex-1 rounded transition-all duration-300 min-w-5 relative ${
                  isActive ? 'bg-yellow-500' : isCompleted ? 'bg-green-500' : 'bg-blue-500'
                } ${isActive ? 'scale-110' : ''}`}
                style={{
                  height: `${value * 2.2}px`,
                  width: `${Math.max(8, 520 / array.length)}px`,
                }}
                title={`Index ${idx}: ${value}`}
              >
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs">{value}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (topic === "Graph") {
      return (
        <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {graph.nodes.map((node, idx) => {
              const isActive = active.includes(idx);
              const isVisited = steps[stepIndex - 1]?.visited?.includes(node);
              return (
                <div
                  key={node}
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all duration-300 ${
                    isActive ? 'bg-yellow-500 scale-110' : isVisited ? 'bg-green-500' : 'bg-blue-600'
                  } text-white`}
                >
                  {node}
                </div>
              );
            })}
          </div>
          <div className="text-center text-gray-300">Edges: {graph.edges.map((edge) => edge.join("-")).join(", ")}</div>
        </div>
      );
    }

    if (topic === "Tree") {
      const currentId = active[0] || null;
      return (
        <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          <div className="flex flex-wrap justify-center gap-4">
            {tree.map((node) => {
              const selected = node.id === currentId;
              return (
                <div
                  key={node.id}
                  className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg font-bold transition-all duration-300 ${selected ? 'bg-yellow-500 scale-110' : 'bg-blue-600'} text-white`}
                >
                  {node.value}
                  <small className="text-xs text-gray-300">{node.id}</small>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (topic === "Strings") {
      return (
        <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          <div className="text-center">
            {stringInput.split("").map((char, idx) => (
              <span
                key={idx}
                className={`inline-block mx-1 px-2 py-1 rounded ${
                  active.includes(idx) ? 'bg-yellow-500 text-gray-900' : 'text-gray-200'
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (topic === "Tries") {
      return (
        <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(steps[stepIndex - 1]?.trie || {}).map((key) => (
              <div
                key={key}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold"
              >
                {key}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (topic === "Data Structures") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Stack</h3>
            {stack.length ? stack.slice().reverse().map((value, index) => (
              <div key={`${value}-${index}`} className="p-2 mb-2 bg-blue-600 text-white rounded text-center">
                {value}
              </div>
            )) : <div className="p-4 text-gray-500 text-center">Empty</div>}
          </div>
          <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Queue</h3>
            {queue.length ? queue.map((value, index) => (
              <div key={`${value}-${index}`} className="p-2 mb-2 bg-blue-600 text-white rounded text-center">
                {value}
              </div>
            )) : <div className="p-4 text-gray-500 text-center">Empty</div>}
          </div>
          <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Linked List</h3>
            {linkedList.length ? linkedList.map((value, index) => (
              <div key={`${value}-${index}`} className="p-2 mb-2 bg-blue-600 text-white rounded text-center">
                {value}
              </div>
            )) : <div className="p-4 text-gray-500 text-center">Empty</div>}
          </div>
        </div>
      );
    }

    if (topic === "Custom Code") {
      return (
        <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl mb-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={20}
            cols={80}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <button
            onClick={start}
            disabled={isRunning}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Visualize Code
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-2 text-indigo-400">🚀 DSA AI Visualizer</h1>
      <p className="text-center mb-6 text-gray-300">Multi-topic interactive algorithm suite with live stage animation.</p>

      <div className="flex flex-wrap justify-center mb-6 border-b border-gray-600">
        {Object.keys(topicToAlgorithms).map((name) => (
          <button
            key={name}
            className={`px-5 py-2 mx-1 mb-2 border-none rounded-t-lg transition-all duration-300 ${
              topic === name
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setTopic(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 mb-6">
        {topicDetails[topic]}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 p-5 bg-gray-800 border border-gray-600 rounded-xl">
        <div className="flex flex-col gap-2">
          <button
            onClick={initArray}
            disabled={isRunning || topic !== "Sorting"}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            New Array
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={start}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Start
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={pause}
            disabled={!isRunning}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={suggestAlgorithm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            AI Suggest
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-200">
            <span>Algorithm:</span>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="auto">Auto</option>
              {getAvailableAlgo().map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
        </div>

        {topic === "Searching" && (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-200">Target:</span>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        )}

        {topic === "Arrays" && (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-200">Value:</span>
              <input
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-200">Index:</span>
              <input
                type="number"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </>
        )}

        {topic === "Strings" && (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-200">String:</span>
              <input
                type="text"
                value={stringInput}
                onChange={(e) => setStringInput(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-200">Pattern:</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </>
        )}

        {topic === "Tries" && (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-200">Word:</span>
            <input
              type="text"
              value={trieWord}
              onChange={(e) => setTrieWord(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-200">Speed: {speed}</span>
          <input
            type="range"
            min="10"
            max="380"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 text-gray-200 border border-gray-600 rounded-xl p-4 text-center"><strong>Topic:</strong> {topic}</div>
        <div className="bg-gray-700 text-gray-200 border border-gray-600 rounded-xl p-4 text-center"><strong>Algorithm:</strong> {chosenAlgorithm || "-"}</div>
        <div className="bg-gray-700 text-gray-200 border border-gray-600 rounded-xl p-4 text-center"><strong>Step:</strong> {stepIndex}/{steps.length}</div>
        <div className="bg-gray-700 text-gray-200 border border-gray-600 rounded-xl p-4 text-center"><strong>Messages:</strong> {message}</div>
      </div>

      {renderMainDisplay()}

      <div className="flex justify-center gap-8 mb-6">
        <div className="flex items-center gap-2 text-gray-200">
          <span className="w-4 h-4 bg-yellow-500 rounded-full"></span> Active
        </div>
        <div className="flex items-center gap-2 text-gray-200">
          <span className="w-4 h-4 bg-green-500 rounded-full"></span> Completed
        </div>
      </div>

      <div className="p-5 bg-gray-800 border border-gray-600 rounded-xl">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Step Preview</h3>
        {steps.slice(Math.max(0, stepIndex - 5), stepIndex).map((step, index) => (
          <div key={index} className="py-1 border-b border-gray-600 text-gray-300 last:border-b-0">
            [{index + 1}] {step.message || step.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;

export function bubbleSortSteps(arr) {
  let steps = [];
  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ type: "compare", i: j, j: j + 1 });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ type: "swap", i: j, j: j + 1 });
      }
    }
  }

  return steps;
}
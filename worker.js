const { parentPort, workerData } = require("worker_threads");

// Optimized Fibonacci (Recursive with Memoization)
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}

// Artificial High Memory Load (Stores results in memory)
const memoryCache = new Array(10000000).fill("WorkerData");

// Compute Fibonacci and send result back
parentPort.postMessage(fibonacci(workerData));


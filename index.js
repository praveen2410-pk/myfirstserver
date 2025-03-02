const express = require("express");
const { Worker } = require("worker_threads");
const client = require("prom-client");

const app = express();
const port = 3000;

// Create a Prometheus Registry for Monitoring
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Artificially Allocate Memory for Testing
const memoryLoad = new Array(10000000).fill("X"); // 10 million elements

// Function to Run a Worker Thread
function runWorker(num) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js", { workerData: num });
        worker.on("message", resolve);
        worker.on("error", reject);
    });
}

// 🏠 Root API
app.get("/", (req, res) => {
    res.send("Hello, World! This is your Express.js Performance API.");
});

// 🔥 High CPU + High Memory Fibonacci API
app.get("/api/fibonacci/:num", async (req, res) => {
    const num = parseInt(req.params.num);
    if (num < 0) {
        return res.status(400).json({ error: "Number must be positive" });
    }
    try {
        let results = [];
        for (let i = 0; i < 10; i++) { // Run Fibonacci 10 times
            results.push(await runWorker(num));
        }
        res.json({ number: num, fibonacci: results });
    } catch (error) {
        res.status(500).json({ error: "Error calculating Fibonacci" });
    }
});

// 🛑 High Memory API (Consumes 50 Million Elements)
app.get("/api/memory", (req, res) => {
    let tempArray = new Array(50000000).fill("M"); // Allocate 50 million elements
    res.json({ message: "Memory allocated", size: tempArray.length });
});

// ⚡ High CPU API (Consumes 100% CPU)
app.get("/api/cpu", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) { // Billion iterations
        sum += i;
    }
    res.json({ message: "CPU intensive task done", result: sum });
});

// 📄 Sample Data API 1
app.get("/api/data", (req, res) => {
    res.json({ message: "This is /api/data endpoint", timestamp: Date.now() });
});

// 📄 Sample Data API 2
app.get("/api/data2", (req, res) => {
    res.json({ message: "This is /api/data2 endpoint", timestamp: Date.now() });
});

// 📊 Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// 🚀 Start Express Server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});


Node.js API Performance Testing & Monitoring on Oracle Cloud

Overview

This project deploys a Node.js API Server on Oracle Cloud with monitoring using Prometheus & Grafana. Performance testing is conducted using Apache JMeter, and metrics are stored in InfluxDB Cloud.

Architecture Diagram



Tech Stack

Oracle Cloud – VM Instances & Load Balancer

Node.js – API Server

Prometheus – Metrics Collection

Grafana Cloud – Monitoring & Visualization

Apache JMeter – Performance Testing

InfluxDB Cloud – Metrics Storage

Linux (Ubuntu) – VM OS

Setup Instructions

1. Deploy Node.js API Server

# Install Node.js
sudo apt update && sudo apt install -y nodejs npm

# Clone the repository
git clone https://github.com/your-repo.git && cd your-repo

# Install dependencies
npm install

# Start the server
node server.js

2. Install & Configure Prometheus

# Install Prometheus
sudo apt update && sudo apt install -y prometheus

# Edit Prometheus config
sudo nano /etc/prometheus/prometheus.yml
# Add scrape job for Node.js API

3. Set Up Grafana Cloud

Sign up for Grafana Cloud

Add InfluxDB as a data source

Create dashboards for monitoring

4. Load Testing with JMeter

# Run JMeter tests
jmeter -n -t test-plan.jmx -l results.jtl

Monitoring

Prometheus scrapes metrics from Node.js API.

InfluxDB stores JMeter test results.

Grafana visualizes system performance.

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m 'Add feature')

Push to branch (git push origin feature-name)

Open a Pull Request

License

MIT License © 2025 Your Name

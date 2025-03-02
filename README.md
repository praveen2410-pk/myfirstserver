# Oracle Cloud Hosted Free Instance and API Deployment using Node.js with Monitoring & Performance Testing

## 📌 Overview
This project demonstrates the creation of a new infra on Oracle Free Tier and deploying APIs using Node.js. High CPU and memory-intensive logic have been implemented to understand performance testing. A simple architecture has been created for free-tier environments to understand trial applications and performance monitoring.

## Architecture Diagram
![Simple Architecture](https://github.com/user-attachments/assets/312a653f-014b-460b-95e3-5da36564d2f5)

Please refer to the `draw.io` file for the source design.

## 🚀 Deployment Steps

### 1️⃣ **Setup Oracle Cloud VM**
- Create two **Oracle Free Tier VMs** and an Oracle Cloud Load Balancer (LB) to enable communication between both instances.
- Install **Node.js**, **Nginx**, and **PM2** for running the API, along with related dependencies on both instances.

### 2️⃣ **Configure Load Balancer**
Set up an Oracle Load Balancer to distribute traffic between the instances.

🔗 [Oracle Load Balancer Documentation](https://docs.oracle.com/en-us/iaas/Content/Balance/Tasks/managingloadbalancer_topic-Creating_Load_Balancers.htm)

### 3️⃣ **Deploy Node.js API**
- Clone the repository and navigate to the API folder:
  ```sh
  git clone https://github.com/your-repo.git
  cd your-repo
  npm install
  ```
- Start the server using PM2:
  ```sh
  pm2 start server.js
  ```
- Run the API server in the background manually:
  ```sh
  cd /express-api
  nohup node index.js > output.log 2>&1 &
  ```
- Test the API locally or via browser:
  ```sh
  curl http://localhost:3000/
  ```
  Browser: `http://<your-vm-public-ip>:3000/api/data`

#### API Endpoints
| HTTP Method | Endpoint                | Description |
|------------|------------------------|-------------|
| GET        | `/`                    | Root API – Returns a welcome message. |
| GET        | `/api/fibonacci/:num`   | Calculates Fibonacci for the given number using worker threads (runs 10 times). |
| GET        | `/api/memory`           | Allocates a large array (50 million elements) to test memory usage. |
| GET        | `/api/cpu`              | Performs a CPU-intensive task (1 billion iterations) to stress CPU. |
| GET        | `/api/data`             | Returns a simple JSON response with a timestamp. |
| GET        | `/api/data2`            | Returns another simple JSON response with a timestamp. |
| GET        | `/metrics`              | Exposes Prometheus metrics for monitoring. |

### 4️⃣ **Monitoring with Prometheus & Grafana**
#### Install Prometheus on each instance
```sh
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.51.2/prometheus-2.51.2.linux-amd64.tar.gz

tar -xvzf prometheus-2.51.2.linux-amd64.tar.gz # Unzip
cd prometheus-2.51.2.linux-amd64
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo useradd --no-create-home --shell /bin/false prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
prometheus --version
sudo systemctl start prometheus
sudo systemctl status prometheus
```
#### Configure Prometheus
Find the `prometheus.yml` file and update it:
```sh
find / -name prometheus.yml 2>/dev/null
```
Add the following configuration:
```yaml
# Scrape Node.js API
  - job_name: "nodejs-api"
    metrics_path: /metrics
    static_configs:
      - targets: ["VM_PublicIP:3000"]
```
Now, Prometheus will send data to Grafana Cloud for visualization.

### 5️⃣ **Performance Testing with JMeter**
- Download JMeter and create a test plan based on your API.
- Use the provided `sample.jmx` file.

![JMeter Test Plan](https://github.com/praveen2410-pk/myfirstserver/blob/main/Jmeter_sample_testplan.png)

- Backend Listener pushes the metrics to your cloud InfluxDB, then configure the data source in Grafana Cloud.

🔗 [JMeter InfluxDB Plugin](https://github.com/mderevyankoaqa/jmeter-influxdb2-listener-plugin)

### 6️⃣ **Analyze Results in Grafana Cloud**

1. **Oracle Infra Monitoring** - Monitor VM health ([Grafana OCI Plugin](https://grafana.com/grafana/plugins/oci-metrics-datasource/))
2. **Prometheus Dashboard** - Monitor VM CPU, Memory and other metrics ([*Prometheus Dashboard]https://grafana.com/grafana/dashboards/3662-prometheus-2-0-overview/)
3. **Node.js API Monitoring** - Track API performance
4. **JMeter Load Testing Dashboard** - ([Grafana JMeter Dashboard](https://grafana.com/grafana/dashboards/13644-jmeter-load-test-org-md-jmeter-influxdb2-visualizer-influxdb-v2-0-flux/))

---

## 📜 License
This project is open-source under the **MIT License**.

## 💡 Have Questions?
Feel free to raise an **Issue** or reach out!
📩 praveenmathi2410@gmail.com

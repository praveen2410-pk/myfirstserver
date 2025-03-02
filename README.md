# Oracle Cloud hosted Free instance and API deployment using Node.js with Monitoring & Performance Testing

## 📌 Overview
This project demonstrates created new infra on orcale free tier and the deployment the API,s using the node.js, high CPU and Mem intensive logis has been created to understand the performcaen testing.created simple architecture for free and undrand the tratial application and permonace opartical underdtanding. 

## 🏗️ Architecture Diagram
![simple architecture](https://github.com/user-attachments/assets/312a653f-014b-460b-95e3-5da36564d2f5)
Please refren the draw.io file the souce of design

## 🚀 Deployment Steps
### 1️⃣ **Setup Oracle Cloud VM**
- Create two **Oracle Free Tier VMs**. and Oracle cloud Load balancer (LB) to set both instance commincaiote
- Install **Node.js**, **Nginx**, and **PM2** for running the API, related dependencies on both instances
  ### 2️⃣ **Configure Load Balancer**
Set up an Oracle Load Balancer to distribute traffic between the instances.https://docs.oracle.com/en-us/iaas/Content/Balance/Tasks/managingloadbalancer_topic-Creating_Load_Balancers.htm
### 3️⃣ **Deploy Node.js API**
- Clone the repository and navigate to the API folder:
  ```sh
  git clone https://github.com/your-repo.git
  cd your-repo
  npm install
Start the server using PM2:
sh
Copy
Edit
pm2 start server.js

### 4️⃣ **Monitoring with Prometheus & Grafana**
Install Prometheus on each instance.
# Based on the Promorus installl
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.51.2/prometheus-2.51.2.linux-amd64.tar.gz
tar -xvzf prometheus-2.51.2.linux-amd64.tar.gz ##Unzip
cd prometheus-2.51.2.linux-amd64
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo useradd --no-create-home --shell /bin/false prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
prometheus --version
sudo systemctl start prometheus
sudo systemctl status prometheus
# upload fire wall rules to forward the traffice with port
sudo firewall-cmd --list-all
sudo firewall-cmd --add-port=9090/tcp --permanent
sudo firewall-cmd --reload
Configure Prometheus to scrape Node.js API metrics.




Send Prometheus data to Grafana Cloud for visualization.
### 5️⃣ **Performance Testing with JMeter**
Run a JMeter test:
sh
Copy
Edit
jmeter -n -t test-plan.jmx -l results.jtl
![simple architecture](https://github.com/praveen2410-pk/myfirstserver/blob/main/Jmeter_sample_testplan.png)
Analyze results in InfluxDB and Grafana.
📊 Monitoring Stack
Prometheus: Collects API metrics.
InfluxDB: Stores performance test results.
Grafana: Visualizes real-time data.
📜 License
This project is open-source under the MIT License.

💡 Have Questions?
Feel free to raise an Issue or reach out!
🚀 Happy Testing & Monitoring! 🚀

sql
Copy
Edit

### 🔹 Notes:
- Replace `https://github.com/your-repo.git` with your actual GitHub repo.
- Update `path/to/your/image.png` with the correct link to your architecture diagram.
- Add any additional setup steps specific to your project.

Let me know if you need any modifications! 🚀

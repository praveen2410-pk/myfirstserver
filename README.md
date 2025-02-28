README.md File:
md
Copy
Edit
# Express.js REST API Deployment on Oracle Free Tier VM

## Overview
This project demonstrates how to deploy a simple Express.js REST API on an Oracle Free Tier VM and test it using JMeter.

## Features
- 🌐 **Endpoints**
  - `GET /` → Returns a basic welcome message.
  - `GET /api/data` → Returns sample JSON data with a timestamp.
  - `GET /api/data2` → Returns a success message with an ISO timestamp.
- 🚀 **Deployment**
  - Hosted on an Oracle Free Tier VM with Ubuntu.
  - Accessible via public IP and configured with firewall rules.
- ⚡ **Performance Testing**
  - API tested using JMeter.

---

## 🚀 **Setup & Installation**
### 1️⃣ **Install Node.js & Express.js**
```sh
sudo dnf install nodejs -y   # (For Oracle Linux)
node -v                      # Check Node.js version
npm -v                       # Check npm version
2️⃣ Create Express.js App
sh
Copy
Edit
mkdir express-api && cd express-api
npm init -y
npm install express
3️⃣ Create index.js
javascript
Copy
Edit
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World! This is your Express.js REST API.');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is sample API data', timestamp: new Date() });
});

app.get('/api/data2', (req, res) => {
    res.json({
        message: "Welcome to my Express API!",
        status: "Success",
        time: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
4️⃣ Run the Server
sh
Copy
Edit
node index.js   # Start the server
OR run in the background:nohup node index.js > output.log 2>&1 &


sh
Copy
Edit
nohup node index.js &
🔥 Allow External Access
1️⃣ Check if Server is Running
sh
Copy
Edit
ss -tlnp | grep 3000
Expected Output:

nginx
Copy
Edit
LISTEN  0  511  0.0.0.0:3000  0.0.0.0:*  users:(("node",pid,fd))
2️⃣ Open Port 3000 in Firewall
sh
Copy
Edit
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
3️⃣ Allow Port 3000 in Oracle Cloud Security Rules
Go to Oracle Cloud Console.
Navigate to Compute > Instances.
Click on your instance and open Virtual Cloud Network (VCN).
Click Subnet > Security List.
Add an Ingress Rule:
Protocol: TCP
Port Range: 3000
Source CIDR: 0.0.0.0/0 (for public access)
Save the rule.
🔍 Test the API
1️⃣ From a Web Browser
http://your-server-ip:3000/
http://your-server-ip:3000/api/data
http://your-server-ip:3000/api/data2
2️⃣ From cURL
sh
Copy
Edit
curl http://your-server-ip:3000/api/data
3️⃣ Using JMeter
Load test using JMeter by sending requests to /api/data.

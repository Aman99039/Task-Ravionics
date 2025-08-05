# Order Management System

This project is a complete **Order Management System** built using:

- **Node.js** (Backend)
- **MongoDB** (Database)
- **Cloudinary** (Invoice PDF storage)
- **Firebase Cloud Messaging (FCM)** (Push notifications)
- **React.js + Bootstrap** (Frontend)
- **Recharts** (Dashboard analytics)

---

## 🔧 Features

### ✅ Admin Features

- Admin login/logout with JWT
- Create new order with invoice PDF upload
- View all orders
- Monthly order stats chart (Recharts)
- Receive notifications for new orders (via FCM)

---

## 📦 Backend Tech Stack

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| Node.js            | Runtime environment          |
| Express.js         | Backend framework            |
| MongoDB (Atlas)    | Cloud database               |
| Mongoose           | ODM for MongoDB              |
| Cloudinary         | File storage for invoices    |
| Multer             | Handle file uploads          |
| dotenv             | Manage environment variables |
| Firebase Admin SDK | Send FCM notifications       |
| JWT                | Secure user authentication   |

---

## 🖼️ Frontend Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| React.js         | Frontend UI                  |
| React Router DOM | Client-side routing          |
| Bootstrap        | UI components and layout     |
| Recharts         | Display monthly sales chart  |
| Axios            | HTTP requests                |
| jwt-decode       | Decode JWT token in frontend |

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/order-management-system.git
cd order-management-system
```

### 2. Setup Backend

```bash
cd order-service
npm install
```

Create a `.env` file in `order-service/` with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd ../order-ui
npm install
npm start
```

App runs on [http://localhost:3000](http://localhost:3000)

---

## 📊 Dashboard

The dashboard shows monthly sales analytics using Recharts.

---

## 📁 Folder Structure

```
order-management-system/
├── order-service/     # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
├── order-ui/          # React frontend
│   ├── src/
│   └── public/
└── README.md
```

---

## 📡 Deployment

- Frontend & backend can be deployed using **Render**
- MongoDB hosted on **MongoDB Atlas**
- Files stored via **Cloudinary**
- Notifications sent using **Firebase FCM**

---

## 👤 Author

Aman Thakur

---

## 📃 License

This project is licensed for educational/demo use.

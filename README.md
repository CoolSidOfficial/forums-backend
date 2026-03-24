# 🚀 Forums Backend API

A scalable backend for a category-based forums platform with authentication, built using Node.js, Express, and MongoDB.

---

## 📌 Overview

This backend powers a forum-style application where:

* Users can register and login securely
* Authenticated users can create posts inside categories
* Posts are fetched dynamically using category-based routes
* Cookies + JWT are used for authentication

---

## 🧠 Core Features

* 🔐 User Authentication (Login/Register)
* 🍪 Cookie-based auth with JWT
* 📝 Create posts by category
* 📂 Fetch posts category-wise
* 🧱 Clean MVC architecture
* ⚡ RESTful API design
* 🌐 CORS configured for frontend integration

---

## 🏗️ Project Structure

```id="8mgh2d"
forums-backend/
│
├── controllers/
│   ├── authController.js
│   ├── PostController.js
│   └── showPosts.js
│
├── middleware/
│   └── verifyToken.js
│
├── models/
│   ├── Post.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   └── postRoutes.js
│
├── db.js
├── server.js
├── .env
└── README.md
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* Cookie Parser
* CORS

---

## 🔐 Authentication Flow

* User registers → account created in DB
* User logs in → JWT token generated
* Token stored in cookies
* Protected routes verify token using middleware

---

## 🔌 API Endpoints

### 🔐 Auth Routes

#### ➕ Register

```id="y9o3bb"
POST /api/auth/register
```

#### 🔑 Login

```id="2ux7w4"
POST /api/auth/login
```

#### 🚪 Logout

```id="g1s7wr"
POST /api/auth/logout
```

---

### 📝 Posts

#### ➕ Create Post (Protected)

```id="jclm8o"
POST /api/posts/:category
```

Example:

```id="gkqz0p"
/api/posts/smartphones
```

---

#### 📥 Get Posts by Category

```id="kqk91t"
GET /api/posts/:category
```

---

## 🧩 Data Models

### 📄 Post

```js id="cl8a3q"
{
  title: String,
  author: String,
  content: String,
  category: String
}
```

---

### 👤 User

```js id="yrg7m1"
{
  username: String,
  email: String,
  password: String (hashed)
}
```

---

## 🔐 Middleware

* `verifyToken.js` → protects routes by validating JWT

---

## 🌐 CORS Configuration

```js id="x2n5cb"
app.use(cors({
  origin: "https://forums-self.vercel.app",
  credentials: true
}));
```

---

## 🚀 Getting Started

### 1. Install dependencies

```id="xq9y2l"
npm install
```

---

### 2. Setup environment variables

Create `.env` file:

```id="4y8a0k"
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=4000
```

---

### 3. Run server

```id="e9z9xk"
npm run dev
```

---

## 🔗 Base URL

```id="jcm5g1"
http://localhost:4000/api
```

---

## 🧠 Architecture

* **Models** → Database structure
* **Controllers** → Business logic
* **Routes** → API endpoints
* **Middleware** → Auth & request validation

---

## ⚡ Future Improvements

* 💬 Comments & replies (threaded discussions)
* 👍 Likes system
* 🔍 Search posts
* 📄 Pagination
* 🏷️ Dynamic categories
* 👤 User profiles

---


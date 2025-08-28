# 🛍️ Ecommerce Backend API (Node.js + Express + MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen)
![Docker](https://img.shields.io/badge/Docker-ready-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

An **Express.js backend server** for a scalable Ecommerce platform, containerized with Docker.  
This backend powers core ecommerce functionalities such as authentication, product management, order processing, and payment integration.

---

## 🚀 Features

- **User Authentication**: Secure login & signup with JWT + bcrypt  
- **Product Management**: Add, update, delete, and fetch products  
- **Order Management**: Handle cart, checkout, and orders  
- **Payment Gateway Integration**: Razorpay for seamless payments  
- **Environment Configurations**: `.env` support for secrets and configs  
- **CORS Enabled**: Secure cross-origin requests  
- **MongoDB Integration**: Mongoose for schema-based database management  
- **Hot Reload**: Nodemon for development  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT, bcrypt  
- **Payments**: Razorpay API  
- **Containerization**: Docker  

---

## 📂 Project Structure

```
ecommerce-Backend/
├── src/
│   ├── server.js         # Entry point
│   ├── routes/           # API routes
│   ├── models/           # Mongoose models
│   ├── controllers/      # Business logic
│   └── middleware/       # Auth, error handling
├── package.json
├── Dockerfile
└── README.md
```

---

## ⚙️ Installation & Setup

### Local Development

```bash
# Clone repo
git clone https://github.com/tanmaydhelia/ecommerce-Backend.git
cd ecommerce-Backend

# Install dependencies
npm install

# Create .env file
touch .env
# Add your environment variables (Mongo URI, JWT secret, Razorpay keys, etc.)

# Run locally
npm run dev
```

Server runs on:  
👉 http://localhost:5454

---

### Docker Setup

```bash
# Build image
docker build -t ecommerce-backend .

# Run container
docker run -p 5454:5454 ecommerce-backend
```

Or with Docker Compose:

```bash
npm run in_container
```

---

## 📜 API Endpoints (Sample)

### Auth

- `POST /api/auth/register` → Register user
- `POST /api/auth/login` → Login & receive JWT

### Products

- `GET /api/products` → Get all products
- `POST /api/products` → Add new product (admin only)

### Orders

- `POST /api/orders` → Place an order
- `GET /api/orders/:id` → Get order details

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```ini
PORT=5454
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
RAZORPAY_KEY=your-razorpay-key
RAZORPAY_SECRET=your-razorpay-secret
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit changes (`git commit -m "Added feature xyz"`)
4. Push branch (`git push origin feature-xyz`)
5. Open a Pull Request

---

## 📌 Future Enhancements

- ✅ Admin Dashboard API
- ✅ Wishlist & Cart APIs
- ✅ Improved error handling & logging
- ✅ Swagger API Documentation

---

## 👨‍💻 Author

**Tanmay Dhelia**  
📌 B.Tech CSE @ VIT | MERN Stack Developer

[LinkedIn](https://www.linkedin.com/in/tanmaydhelia/) | [GitHub](https://github.com/tanmaydhelia)

⭐ If you found this project useful, don’t forget to star the repo!
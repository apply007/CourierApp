# Courier Parcel MERN Project

This is a **Courier/Parcel Booking System** built with the **MERN stack (MongoDB, Express, React, Node.js)**. It includes authentication, parcel booking, user dashboard, and admin panel.

---

## Features

✅ User Registration & Login (JWT-based authentication)
✅ Role-based Access (User / Admin)
✅ Book Parcels with details (weight, pickup, destination, etc.)
✅ Track Parcel Status (Pending, Picked, Delivered, Cancelled)
✅ User Dashboard → Manage own parcels
✅ Admin Dashboard → Manage all parcels, update status
✅ Secure APIs with protected routes

---

## Tech Stack

* **Frontend:** React + Vite, Tailwind CSS, Axios, React Router DOM
* **Backend:** Node.js, Express.js, JWT, Bcrypt, Mongoose
* **Database:** MongoDB (Mongoose ORM)

---

## Installation Guide

### 1️⃣ Clone Repository

```bash
 git clone https://github.com/your-repo/courier-parcel-mern.git
 cd courier-parcel-mern
```

### 2️⃣ Backend Setup

```bash
 cd backend
 npm install
```

Create a **.env** file inside `backend` with the following:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
 npm start
```

### 3️⃣ Frontend Setup

```bash
 cd frontend
 npm install
```

Run frontend:

```bash
 npm run dev
```

Now open → `http://localhost:5173`

---

## API Endpoints

### Auth

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login & get token

### Parcels

* `POST /api/parcels` → Book new parcel (User only)
* `GET /api/parcels` → Get all parcels (Admin)
* `GET /api/parcels/my` → Get user’s own parcels
* `PUT /api/parcels/:id` → Update parcel (Admin/User restrictions)
* `DELETE /api/parcels/:id` → Cancel parcel (User)

---

## Scripts

**Backend:**

```bash
 npm start
```

**Frontend:**

```bash
 npm run dev
```

---

## Future Enhancements

* 📦 Payment Integration (Stripe/Paypal)
* 📍 Google Maps API for live tracking
* 📊 Reports & Analytics for Admin
* 📱 Mobile App with React Native

---

## License

This project is free to use and modify for learning purposes.

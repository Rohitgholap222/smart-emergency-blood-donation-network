# 🩸 Smart Blood Network – Full Stack Application

A full-stack web application that connects **blood donors, recipients, and organizations** to streamline blood donation and emergency requests.

---

## 🚀 Overview

Smart Blood Network is designed to:

* Reduce time to find blood donors
* Enable real-time blood request management
* Provide a centralized platform for donors and recipients
* Support admin monitoring and control

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React.js
* CSS / Tailwind / Bootstrap
* Axios / Fetch API
* React Router

### 🔹 Backend

* Spring Boot (Java)
* Spring Data JPA (Hibernate)
* REST APIs
* WebSocket (optional for real-time updates)

### 🔹 Database

* MySQL

### 🔹 Deployment

* Backend: Render
* Database: Railway / MySQL Cloud
* Frontend: Vercel / Netlify


## ⚙️ Setup Instructions

## 🔹 Backend Setup (Spring Boot)

### 1️⃣ Navigate to backend



### 2️⃣ Configure database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blood_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 3️⃣ Run backend

```bash
mvn spring-boot:run
```

👉 Runs on:

```
http://localhost:8080
```

---

## 🔹 Frontend Setup (React)

### 1️⃣ Navigate to frontend

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure API

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### 4️⃣ Run frontend

```bash
npm run dev
```

👉 Runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### 👤 Users

* `GET /api/users`
* `GET /api/users/{id}`

### 🩸 Donors

* `GET /api/donors`
* `POST /api/donors`

### 📢 Blood Requests

* `GET /api/requests`
* `POST /api/requests`

---

## 📸 Features

* 🔐 User Authentication (Login/Register)
* 🩸 Blood Donor Search
* 📢 Blood Request Creation
* 📊 Dashboard
* 🔄 Real-time updates (optional)
* 📱 Responsive UI

---

## 🌐 Deployment Guide

### 🔹 Backend (Render)

* Build Command:

```bash
mvn clean install
```

* Start Command:

```bash
java -jar target/app.jar
```

* Environment Variables:

```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

---

### 🔹 Frontend (Vercel / Netlify)

Update `.env`:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

Deploy using:

```bash
vercel
```

---

## ⚠️ Important Notes

* Do NOT use `localhost` in production
* Use cloud database (Railway / AWS RDS)
* Keep credentials secure using environment variables

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a Pull Request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Developed as a full-stack project using **Spring Boot + React** for real-world application development.

---

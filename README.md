# Car Auction

Modern full-stack car auction platform with live bidding, authentication, admin panel, filtering system, multilingual support, language switcher, and responsive UI.

## DEMO

Frontend:
[https://dmytrokolesnikov52.github.io/Car-auction/](https://dmytrokolesnikov52.github.io/Car-auction/)

Backend API:
[https://car-auction-backend-b0ba.onrender.com/api/cars](https://car-auction-backend-b0ba.onrender.com/api/cars)

---

# Technologies

## Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Context API
- i18next
- Vite

## Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Cookie Parser
- Helmet
- Express Rate Limit

## Deployment

- GitHub Pages — frontend
- Render — backend
- Aiven MySQL — database

---

# Features

- Live auction system
- Automatic bid updates
- Auction timer logic
- Buy now functionality
- Authentication and authorization
- Admin panel
- Protected admin routes
- Cars filtering system
- Search and pagination
- Dark / Light theme
- English / Ukrainian localization
- Responsive design
- Persistent auction state
- Daily auction reset system
- Full REST API
- MySQL database integration

---

# Authentication

The application uses JWT authentication with HTTP-only cookies.

Users can:

- Register
- Login
- Logout

Admins can:

- Create cars
- Edit cars
- Delete cars
- Manage auctions

---

# Auction System

The auction system includes:

- Real-time bid updates
- Automatic timer extension
- Persistent bid state
- Auction winner tracking
- Sold car state
- Automatic daily reset

Auction state is synchronized between frontend and backend.

---

# Project Structure

```txt
Car-auction/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── public/
│
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── api/
│
├── vite.config.ts
├── package.json
```

---

# Installation

## Clone repository

```bash
git clone https://github.com/dmytrokolesnikov52/Car-auction.git
```

---

# Frontend Setup

```bash
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

---

# Environment Variables

## Frontend `.env`

```env
VITE_API_URL=https://car-auction-backend-b0ba.onrender.com
```

---

## Backend `.env`

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
NODE_ENV=production
```

---

# API Routes

## Authentication

```txt
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

## Cars

```txt
GET    /api/cars
GET    /api/cars-with-images
GET    /api/cars/:id/full
PATCH  /api/cars/:id
POST   /api/cars
DELETE /api/cars/:id
```

## Auction

```txt
PATCH /api/auction/reset-daily
```

---

# Notes

- Render free plan may take a few seconds to wake up after inactivity.
- GitHub Pages is used only for frontend hosting.
- Backend and database are deployed separately.

---

# Author

Dmytro Kolesnikov

GitHub:
[https://github.com/dmytrokolesnikov52](https://github.com/dmytrokolesnikov52)

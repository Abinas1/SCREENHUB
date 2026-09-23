# 🎬 ScreenHub — Full-Stack Movie Ticket Booking Platform

ScreenHub is a full-stack movie ticket booking platform inspired by modern online movie-booking applications. The platform provides role-based workflows for **Admins, Customers, and Theater Managers**, covering movie management, theater management, show scheduling, seat selection, and ticket booking.

## ✨ Features

### 👤 Customer
- Browse available movies
- Explore theaters and available shows
- Select showtimes
- Select available seats
- Book movie tickets
- JWT-based authentication
- Google OAuth login

### 🛠️ Admin
- Add and manage movies
- Manage movie information and availability
- Control movies available on the platform

### 🏢 Theater Manager
- Manage theater information
- Manage available show slots
- Select movies for available shows
- Configure show schedules

## 🔐 Authentication & Authorization

ScreenHub implements secure authentication and role-based access control:

- **JWT Authentication** for user sessions
- **Google OAuth** for social login
- **Role-Based Authorization** for Admin, Customer, and Theater Manager workflows
- Middleware-based access control for protected routes

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- MongoDB
- Mongoose

## 🗄️ Data Model

The application is structured around five core entities:

| Entity | Description |
|---|---|
| **Users** | Stores user accounts, roles, and authentication information |
| **Movies** | Stores movie details and availability |
| **Theaters** | Stores theater information and available slots |
| **Shows** | Manages movie schedules and show timings |
| **Bookings** | Stores ticket booking and seat information |

## 🏗️ Backend Architecture

The backend follows a modular architecture separating different application responsibilities:

```text
SCREENHUB/
├── Services/       # Business logic
├── controller/     # Request handling
├── middlewares/    # Authentication & authorization
├── models/         # MongoDB/Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
├── index.js        # Application entry point
├── package.json
└── .gitignore
```

This separation keeps the application organized and makes individual components easier to maintain and extend.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/Abinas1/SCREENHUB.git
cd SCREENHUB
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables for:

- MongoDB connection
- JWT authentication
- Google OAuth
- Other application-specific configuration

### Run the Application

```bash
npm start
```

The backend will start in development mode using Nodemon.


## 🔮 Project Status

ScreenHub is an actively developed project. New features and improvements are being added as development progresses.

## 👨‍💻 Author

**Abinas Behera**

[GitHub](https://github.com/Abinas1) •
[LinkedIn](YOUR_LINKEDIN_URL) •
[LeetCode](https://leetcode.com/u/abinas135/) •
[Codeforces](https://codeforces.com/profile/Abinas135) •
[CodeChef](https://www.codechef.com/users/abinas246)

# **Salong Saxen - Booking System**

## **Project Status**

This booking system is still under development, and several features are not fully implemented. The following features are planned but not yet available in the current version:

- Full management of admin schedules in the frontend
- Users' ability to view available slots based on selected services
- Email notifications for bookings and reminders
- Responsive admin dashboard

The system works in its basic form, and more features are planned for future updates.

## **Overview**

Salong Saxen is a school project focusing on a booking system for hair salons. It allows users to book appointments with hairdressers (admins), view their bookings, and reschedule or cancel appointments.

The project is designed with ease of use, responsive design for mobile users, and clear interfaces for both users and administrators in mind.

## **Features**

### **User Features**:

- Create an account and log in
- Book appointments based on the hairdresser's schedule and available services
- View upcoming bookings and booking history _(in development)_
- Reschedule or cancel an appointment
- Profile management

### **Admin Features**:

- Create and manage services (e.g., haircut, coloring) with duration and price
- Create and manage work schedules with fixed time slots (30-minute intervals)
- Edit and remove slots from the schedule _(in development)_
- View and manage users' bookings in a calendar interface _(in development)_
- Manage user accounts (create, update, delete)

### **Other**:

- Calendar-based interface for bookings
- Role-based access control (user and admin)
- Dynamic availability based on selected services

## **Technology**

### **Frontend**:

- React with Vite (for fast development)
- Zustand (for state management)
- Tailwind CSS (for styling and responsive design)

### **Backend**:

- Node.js with Express (for server management and API endpoints)
- MongoDB via MongoDB Atlas (for data storage)

### **Other**:

- Authentication and authorization with JWT (Json Web Token)
- MongoDB Mongoose (for data modeling)
- API design following REST principles

## **Installation**

To run this project locally, follow the steps below:

1. **Clone the repository**:

```bash
git clone https://github.com/your-repo/salong-saxen.git
cd salong-saxen

```

2. **Backend-installation:**

```bash
Navigate to ``backend`` folder:

cd backend

Install dependencies:

npm install

Create a .env file with the following environment variables:

MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<your secret JWT key>
PORT=5000

Start the backend-server:

npm run dev
```

3. **Frontend-installation:**
```
Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Create a .env file with the following variables:

VITE_API_URL=http://localhost:5000/api

Start the frontend application:

npm run dev
```
4. **Usage**
```
Navigate to http://localhost:5173 in your browser to start using the system.
```
## **API Documentation**

### **Authentication Routes**

| Method | Endpoint                    | Description                                                         | Protected |
| ------ | --------------------------- | ------------------------------------------------------------------- | --------- |
| POST   | `/api/auth/login`           | Log in with the user's email and password.                          | No        |
| POST   | `/api/auth/user`            | Register a new user.                                                | No        |
| GET    | `/api/auth/dashboard`       | Access the user dashboard, returns user data.                       | Yes       |
| GET    | `/api/auth/admin/dashboard` | Access the admin dashboard, requires admin role, returns user data. | Yes       |

### **Booking Routes**

| Method | Endpoint             | Description                                  | Protected |
| ------ | -------------------- | -------------------------------------------- | --------- |
| GET    | `/api/bookings`      | Get all bookings (admin only).               | Yes       |
| GET    | `/api/bookings/user` | Get all bookings for the authenticated user. | Yes       |
| GET    | `/api/bookings/:id`  | Get a specific booking by ID.                | Yes       |
| POST   | `/api/bookings`      | Create a new booking (user only).            | Yes       |
| PUT    | `/api/bookings/:id`  | Update a specific booking by ID.             | Yes       |
| DELETE | `/api/bookings/:id`  | Delete a specific booking by ID.             | Yes       |

### **Schedule Routes**

| Method | Endpoint                   | Description                                      | Protected |
| ------ | -------------------------- | ------------------------------------------------ | --------- |
| GET    | `/api/schedules`           | Get all schedules (admin only).                  | Yes       |
| GET    | `/api/schedules/available` | Get all available schedules for users.           | Yes       |
| GET    | `/api/schedules/:adminId`  | Get schedules for a specific admin (admin only). | Yes       |
| POST   | `/api/schedules`           | Create a new schedule (admin only).              | Yes       |
| PUT    | `/api/schedules/:id`       | Update a specific schedule by ID (admin only).   | Yes       |
| DELETE | `/api/schedules/:id`       | Delete a specific schedule by ID (admin only).   | Yes       |

### **Service Routes**

| Method | Endpoint            | Description                                   | Protected |
| ------ | ------------------- | --------------------------------------------- | --------- |
| POST   | `/api/services`     | Create a new service (admin only).            | Yes       |
| GET    | `/api/services/:id` | Get a specific service by ID.                 | Yes       |
| GET    | `/api/services`     | Get all available services.                   | No        |
| PUT    | `/api/services/:id` | Update a specific service by ID (admin only). | Yes       |
| DELETE | `/api/services/:id` | Delete a specific service by ID (admin only). | Yes       |

### **User Routes**

| Method | Endpoint                           | Description                                         | Protected |
| ------ | ---------------------------------- | --------------------------------------------------- | --------- |
| GET    | `/api/users`                       | Get all users (admin only).                         | Yes       |
| GET    | `/api/admins`                      | Get all admins.                                     | Yes       |
| PUT    | `/api/user/:id`                    | Update a user (admin only).                         | Yes       |
| DELETE | `/api/user/:id`                    | Delete a user (admin only).                         | Yes       |
| PUT    | `/api/user/:id/update-password`    | Update the user's password.                         | Yes       |
| PUT    | `/api/user/:id/reset-password`     | Reset a user's password (requires token and email). | Yes       |
| POST   | `/api/user/request-reset-password` | Request a password reset link via email.            | No        |
| PUT    | `/api/user/reset-password/:token`  | Reset password using token.                         | No        |

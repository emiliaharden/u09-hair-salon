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
- Search for users

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
## API Collections

To test the APIs, you can import Postman/Bruno API collections located in the `/resources/api-collections` folder.

### How to Import into Postman/Bruno
1. Download the relevant JSON file from `/resources/api-collections`.
2. Open Postman or Bruno.
3. Go to `File -> Import` and select the downloaded JSON file.
4. You will now be able to test all APIs directly from the tool.



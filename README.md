# **Salon Lumi Locks - Booking System**

## Table of Contents
1. [Project Status](#project-status)
2. [Overview](#overview)
3. [Design Prototype](#design-prototype)
4. [User Experience](#user-experience-ux)
5. [Features](#features)
    - [User Features](#user-features)
    - [Admin Features](#admin-features)
    - [Other](#other)
6. [Technology](#technology)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other](#other-1)
7. [Installation](#installation)
8. [API Collections](#api-collections)
9. [VITE PWA Documentation](#vite-pwa-documentation)

## **Project Status**
...


This booking system is still under development, and several features are not fully implemented. The following features are planned but not yet available in the current version:

- Full management of admin schedules in the frontend
- Users' ability to view available slots based on selected services
- Email notifications for bookings and reminders
- Responsive admin dashboard

The system works in its basic form, and more features are planned for future updates.

## **Overview**

Salong Lumi Locks is a school project focusing on a booking system for hair salons. It allows users to book appointments with hairdressers (admins), view their bookings, and reschedule or cancel appointments.

The project is designed with ease of use, responsive design for mobile users, and clear interfaces for both users and administrators in mind.

## Design Prototype 

A lo-fi prototype for both desktop and mobile views has been created to outline the basic structure and flow of the booking system. While the design is not fully completed, and some elements have deviated from the original concept, the prototype serves as a foundation for further development and refinement in the future.

You can explore the current version of the prototype in the Figma file:

[![View Figma Prototype](https://img.shields.io/badge/Figma-Lo--Fi%20Prototype-blue?logo=figma)](https://www.figma.com/design/kKcA6w8dWrLdPSdrYOXb4D/u09-Hair-Salon?node-id=0-1&t=m75oR46499Nudeyw-1)


## User Experience (UX)

The design and functionality of the booking system are informed by user feedback collected through surveys and analysis. This section includes:

- **Personas**: Representing key user types based on survey insights.
- **Survey**: Collecting opinions and preferences to shape the booking system.
- **User Stories**: Defining user needs and desired features.
- **Sitemap**: Visualizing the structure and flow of the application.

You can explore the detailed feedback and design elements in the FigJam file:

[![View FigJam](https://img.shields.io/badge/FigJam-UX-yellow?logo=figma)](https://www.figma.com/board/hbTbaRO8EDV0aBsq15YDri/u09-Hair-Salon?node-id=0-1&t=bYhkcUKkp8IBM4oc-1)


## **Features**

### **User Features**:

- Create an account and log in
- Book appointments based on the hairdresser's schedule and available services
- View upcoming bookings
- Booking history _(in development)_
- Cancel an appointment
- Reschedule appointment  _(in development)_
- Profile management 
    - Change Password


### **Admin Features**:

- Create and manage services (e.g., haircut, coloring) with duration and price
- Create and manage work schedules with fixed time slots (30-minute intervals)
- Edit and remove slots from the schedule _(in development)_
- View and manage users' bookings in a calendar interface _(in development)_
- Manage user accounts (create, update, delete)
    - Update
        - Change name
        - Change email
        - Change role (user/admin)
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

```
Create a .env.development file (*for development*) with the following environment variables:
```
NODE_ENV=development
MONGO_URI=<your MongoDB Atlas URI>
PORT=3000
JWT_SECRET=<your secret JWT key>
```
Or/and a .env.production file (*for production*) with the following environment variables: 

```
NODE_ENV=production
MONGO_URI=<your MongoDB Atlas URI>
PORT=3000
JWT_SECRET=<your secret JWT key>
```

Start the backend-server:
```
npm run dev
```

3. **Frontend-installation:**

Navigate to the frontend folder:
```
cd frontend
````
Install dependencies:
```
npm install
```
Create a .env file with the following variables:
```
VITE_API_URL=https://your.chosen.backend/api 
```
And/Or for development
```
VITE_API_URL=http://localhost:3000/api 
```
Start the frontend application:
```
npm run dev
```
4. **Usage**
```
Navigate to http://localhost:5173 in your browser to start using the system.
```
## API Collections

To test the APIs, you can import Postman/Bruno API collections located in the `/resources/api-collections` folder.

APIs can be seen at `/resources/api-documentation` folder.

### How to Import into Postman/Bruno
1. Download the relevant JSON file from `/resources/api-collections`.
2. Open Postman or Bruno.
3. Go to `File -> Import` and select the downloaded JSON file.
4. You will now be able to test all APIs directly from the tool.

## **Vite PWA Documentation**

This project includes a simple implementation of Vite's Progressive Web App (PWA) integration. Currently, the PWA does not support automatic updates or service worker-based updates. Users need to uninstall and reinstall the app to get the latest version when a new deployment is made.

### How to Install the PWA
To install the PWA on your device:

1. **On Desktop**: In supported browsers (such as Chrome or Edge), you will see an "Install" icon in the address bar. Click the icon and follow the prompts to install the app.
2. **On Mobile**: Open the website in a browser like Chrome on Android, then click the three-dot menu in the top right and select "Add to Home screen."

Once installed, the PWA will behave like a native app, offering a more app-like experience.

### How Updates Work Right Now
- The PWA does not automatically update when a new version is deployed.
- Users must uninstall the app and reinstall it to access the latest version.

### Future Plans
- **Automatic updates**: Implementing a service worker that will handle caching and notify users when a new version is available.
- **Improved user experience**: Adding features like "New Version Available" prompts or automatic updates upon relaunch.





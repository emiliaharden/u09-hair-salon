## **API Documentation**

### **Authentication Routes**

| Method | Endpoint                    | Description                                                         | Protected |
| ------ | --------------------------- | ------------------------------------------------------------------- | --------- |
| POST   | /api/auth/login           | Log in with the user's email and password.                          | No        |
| POST   | /api/auth/user            | Register a new user.                                                | No        |
| GET    | /api/auth/dashboard       | Access the user dashboard, returns user data.                       | Yes       |
| GET    | /api/auth/admin/dashboard | Access the admin dashboard, requires admin role, returns user data. | Yes       |

### **Booking Routes**

| Method | Endpoint             | Description                                  | Protected |
| ------ | -------------------- | -------------------------------------------- | --------- |
| GET    | /api/bookings      | Get all bookings (admin only).               | Yes       |
| GET    | /api/bookings/user | Get all bookings for the authenticated user. | Yes       |
| GET    | /api/bookings/:id  | Get a specific booking by ID.                | Yes       |
| POST   | /api/bookings      | Create a new booking (user only).            | Yes       |
| PUT    | /api/bookings/:id  | Update a specific booking by ID.             | Yes       |
| DELETE | /api/bookings/:id  | Delete a specific booking by ID.             | Yes       |

### **Schedule Routes**

| Method | Endpoint                   | Description                                      | Protected |
| ------ | -------------------------- | ------------------------------------------------ | --------- |
| GET    | /api/schedules           | Get all schedules (admin only).                  | Yes       |
| GET    | /api/schedules/available | Get all available schedules for users.           | Yes       |
| GET    | /api/schedules/:adminId  | Get schedules for a specific admin (admin only). | Yes       |
| POST   | /api/schedules           | Create a new schedule (admin only).              | Yes       |
| PUT    | /api/schedules/:id       | Update a specific schedule by ID (admin only).   | Yes       |
| DELETE | /api/schedules/:id       | Delete a specific schedule by ID (admin only).   | Yes       |

### **Service Routes**

| Method | Endpoint            | Description                                   | Protected |
| ------ | ------------------- | --------------------------------------------- | --------- |
| POST   | /api/services     | Create a new service (admin only).            | Yes       |
| GET    | /api/services/:id | Get a specific service by ID.                 | Yes       |
| GET    | /api/services     | Get all available services.                   | No        |
| PUT    | /api/services/:id | Update a specific service by ID (admin only). | Yes       |
| DELETE | /api/services/:id | Delete a specific service by ID (admin only). | Yes       |

### **User Routes**

| Method | Endpoint                           | Description                                         | Protected |
| ------ | ---------------------------------- | --------------------------------------------------- | --------- |
| GET    | /api/users                       | Get all users (admin only).                         | Yes       |
| GET    | /api/admins                      | Get all admins.                                     | Yes       |
| PUT    | /api/user/:id                    | Update a user (admin only).                         | Yes       |
| DELETE | /api/user/:id                    | Delete a user (admin only).                         | Yes       |
| PUT    | /api/user/:id/update-password    | Update the user's password.                         | Yes       |
| PUT    | /api/user/:id/reset-password     | Reset a user's password (requires token and email). | Yes       |

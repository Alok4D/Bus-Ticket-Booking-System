# 🚌 Bus Ticket Booking System (Backend)

### 🎫 Complete Bus Reservation & Payment Management System

**🌐 LIVE API:** https://bus-ticket-booking-server-gules.vercel.app/

A full-featured **Bus Ticket Booking System** with secure payment integration, user management, and admin dashboard for managing bus operations.

---

## 🚀 Project Status: ✅ DEPLOYED & LIVE

This project is a **complete bus ticket booking platform** where:

- **Users** can search, book, and pay for bus tickets
- **Admins** can manage buses, routes, bookings, and payments
- **Secure payment** processing with SSLCommerz integration
- **JWT-based authentication** with refresh token support
- **Role-based access control** for users and admins
- **Real-time booking** management and seat availability
- **Deployed on Vercel** with serverless architecture

---

## 🧩 Core Modules & Features

### 👤 User Roles

| Role        | Access & Features                                                                     |
| ----------- | ------------------------------------------------------------------------------------- |
| **Admin**   | Manage Buses, Routes, Bookings, Users, Payments, and System Analytics                |
| **User**    | Search Buses, Book Tickets, Make Payments, View Booking History                      |

---

### 🚌 Bus Management

- Bus registration with details (name, number, capacity, type)
- Route assignment and scheduling
- Seat configuration and availability tracking
- Bus status management (active/inactive)
- Real-time seat booking and reservation

---

### 🛣️ Route Management

- Route creation with source and destination
- Distance and duration tracking
- Fare calculation based on route
- Multiple routes per bus support
- Route status management

---

### 📅 Booking System

- Real-time seat availability checking
- Multiple seat selection
- Booking confirmation and ticket generation
- Booking status tracking (pending, confirmed, cancelled)
- Journey date and time management

---

### 💳 Payment Integration

**Local Payment Gateway:**
- ✅ **SSLCommerz** - Primary payment gateway
- 💳 Credit/Debit Cards (Visa, MasterCard, American Express)
- 📱 Mobile Banking (bKash, Rocket, Nagad, Upay)
- 🏦 Internet Banking (All major Bangladeshi banks)
- 🏪 Over The Counter payments

### Payment Features

- Secure payment processing
- Real-time payment verification
- Automatic booking confirmation
- Payment history and receipts
- Refund management
- Transaction logging

---

## 🔐 Authentication & Security

### JWT Authentication
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry (httpOnly cookie)
- **Secure logout** with token cleanup
- **Forgot password** with email reset

### Security Features
- Password hashing with bcrypt
- Rate limiting for API endpoints
- Input sanitization and validation
- CORS protection
- Security headers with Helmet
- Request logging and monitoring

---

## 🧑💼 Admin Dashboard Features

- ✅ **User Management** (View, Block/Unblock users)
- ✅ **Bus Management** (CRUD operations, status control)
- ✅ **Route Management** (Create, update, delete routes)
- ✅ **Booking Management** (View all bookings, status updates)
- ✅ **Payment Reports** (Transaction history, revenue analytics)
- ✅ **Dashboard Analytics** (Users, bookings, revenue statistics)
- ✅ **System Settings** (Configuration management)

---

## 👨🎓 User Features

- **Account Management** (Register, login, profile update)
- **Bus Search** (By route, date, availability)
- **Seat Selection** (Interactive seat map)
- **Secure Booking** (Real-time confirmation)
- **Payment Processing** (Multiple payment options)
- **Booking History** (Past and upcoming journeys)
- **Ticket Management** (Download, view details)

---

## 🧰 Technology Stack

| Layer               | Technology                                    |
| ------------------- | --------------------------------------------- |
| **Backend**         | Node.js, Express.js, TypeScript              |
| **Database**        | MongoDB with Mongoose ODM                    |
| **Authentication**  | JWT (Access + Refresh Tokens)                |
| **Payment**         | SSLCommerz (Bangladesh)                       |
| **Security**        | Bcrypt, Helmet, Rate Limiting                |
| **Validation**      | Zod Schema Validation                         |
| **Environment**     | dotenv Configuration                          |
| **Deployment**      | Vercel Serverless Functions                  |
| **CI/CD**           | Vercel Auto-Deploy from Git                  |

---

## 🌐 Live API Endpoints

**Base URL:** https://bus-ticket-booking-system-virid.vercel.app

### System Status
```
GET  /                            # API status
GET  /health                      # Health check
GET  /api/v1/test                 # API test endpoint
```

### Authentication
```
POST /api/auth/login              # User login
POST /api/auth/refresh-token      # Refresh access token
POST /api/auth/logout             # Logout current device
POST /api/auth/logout-all         # Logout all devices
POST /api/auth/forgot-password    # Send reset token
POST /api/auth/reset-password     # Reset password
```

### User Management
```
POST /api/user/register           # User registration
GET  /api/user/all-users          # Get all users (Admin)
```

### Bus Management
```
GET    /api/bus                   # Get all buses
POST   /api/bus                   # Create bus (Admin)
GET    /api/bus/:id               # Get bus details
PUT    /api/bus/:id               # Update bus (Admin)
DELETE /api/bus/:id               # Delete bus (Admin)
```

### Route Management
```
GET    /api/route                 # Get all routes
POST   /api/route                 # Create route (Admin)
GET    /api/route/:id             # Get route details
PUT    /api/route/:id             # Update route (Admin)
DELETE /api/route/:id             # Delete route (Admin)
```

### Booking Management
```
GET    /api/booking               # Get user bookings
POST   /api/booking               # Create booking
GET    /api/booking/:id           # Get booking details
PUT    /api/booking/:id           # Update booking
DELETE /api/booking/:id           # Cancel booking
```

### Payment Processing
```
POST /api/payment/ssl-create      # Initialize SSL payment
GET  /api/payment/success         # Payment success callback
GET  /api/payment/fail            # Payment failure callback
GET  /api/payment/cancel          # Payment cancel callback
GET  /api/payment/user/:userId    # User payment history
GET  /api/payment/all             # All payments (Admin)
```

### Admin Dashboard
```
POST /api/admin/login             # Admin login
GET  /api/admin/summary           # Dashboard statistics
GET  /api/admin/users             # All users management
GET  /api/admin/bookings          # All bookings management
GET  /api/admin/payment-reports   # Payment analytics
POST /api/admin/manage-user       # Block/unblock users
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/bus-ticket-booking-system.git
cd bus-ticket-booking-system
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Setup
```bash
cp .env.example .env
```

### 4️⃣ Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development
DB_URL=your_mongodb_connection_string

# JWT Security
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES=7d

# SSLCommerz Payment Gateway
STORE_ID=your_sslcommerz_store_id
STORE_PASS=your_sslcommerz_store_password
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v3/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

# Frontend URLs
SSL_SUCCESS_FRONTEND_URL=http://localhost:3000/payment-success
SSL_FAIL_FRONTEND_URL=http://localhost:3000/payment-failed
SSL_CANCEL_FRONTEND_URL=http://localhost:3000/payment-cancel
```

### 5️⃣ Run Development Server
```bash
npm run dev
```

### 6️⃣ Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Security Features

- **JWT Authentication** with access and refresh tokens
- **Password Encryption** using bcrypt
- **Rate Limiting** to prevent abuse
- **Input Validation** with Zod schemas
- **CORS Protection** for cross-origin requests
- **Security Headers** with Helmet middleware
- **Request Logging** for monitoring
- **Environment Variables** for sensitive data

---

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: Enum ['USER', 'ADMIN'],
  isBlocked: Boolean,
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpiry: Date
}
```

### Bus Collection
```javascript
{
  busName: String,
  busNumber: String (unique),
  capacity: Number,
  busType: String,
  amenities: [String],
  isActive: Boolean
}
```

### Route Collection
```javascript
{
  source: String,
  destination: String,
  distance: Number,
  duration: Number,
  baseFare: Number
}
```

### Booking Collection
```javascript
{
  user: ObjectId (ref: User),
  bus: ObjectId (ref: Bus),
  route: ObjectId (ref: Route),
  seats: [String],
  journeyDate: Date,
  totalFare: Number,
  status: Enum ['pending', 'confirmed', 'cancelled']
}
```

### Payment Collection
```javascript
{
  user: ObjectId (ref: User),
  booking: ObjectId (ref: Booking),
  amount: Number,
  transactionId: String,
  paymentMethod: String,
  paymentStatus: Enum ['pending', 'success', 'failed', 'refunded'],
  sslSessionId: String,
  gatewayData: Object
}
```

---

## 🧪 Testing

### 🌐 Live API Testing

**Test the live API:**
```bash
# API Status
curl https://bus-ticket-booking-system-virid.vercel.app/

# Health Check
curl https://bus-ticket-booking-system-virid.vercel.app/health

# API Test Endpoint
curl https://bus-ticket-booking-system-virid.vercel.app/api/v1/test
```

### Local Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 📈 Performance & Monitoring

- Database indexing for optimized queries
- Request/Response logging
- Error handling and logging
- Performance monitoring
- Memory usage optimization

---

## 🚀 Deployment

### ✅ Live Deployment Status
- ✅ **Deployed on:** Vercel
- ✅ **Live URL:** https://bus-ticket-booking-server-gules.vercel.app/
- ✅ **Environment:** Production
- ✅ **Database:** MongoDB Atlas (Connected)
- ✅ **SSL:** Enabled (Vercel Auto-SSL)
- ✅ **Payment Gateway:** SSLCommerz Sandbox
- ✅ **Auto-Deploy:** GitHub Integration

### Quick Deploy Commands
```bash
# Deploy to Vercel
vercel --prod

# Or push to GitHub (auto-deploy)
git push origin main
```

---

## 👨💻 Author

**Developed by:** [Alok Roy]  
📧 **Email:** [alokroy602701@gmail.com]  
🌐 **Website:** https://alok-roy-dev.vercel.app  
💼 **LinkedIn:** [Your LinkedIn Profile]  
🐙 **GitHub:** [Your GitHub Profile]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support and queries:
- 📧 Email: alokroy602701@gmail.com
- 💬 Create an issue on GitHub
- 📱 WhatsApp: [Your WhatsApp Number]

---

## 📁 Project Structure

```
Bus-Ticket-Booking-System/
├── 📁 api/
│   ├── index.js                    # Vercel serverless entry point (JS)
│   └── index.ts                    # Vercel serverless entry point (TS)
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 auth/                # Authentication Module
│   │   │   ├── auth.controller.ts  # Auth controllers
│   │   │   ├── auth.route.ts       # Auth routes
│   │   │   ├── auth.service.ts     # Auth business logic
│   │   │   └── forgotPassword.service.ts # Password reset
│   │   ├── 📁 config/              # Configuration Files
│   │   │   ├── envVars.ts          # Environment variables
│   │   │   └── sslcommerz.ts       # Payment gateway config
│   │   ├── 📁 interfaces/          # TypeScript Interfaces
│   │   │   └── index.d.ts          # Global type definitions
│   │   ├── 📁 middleware/          # Express Middlewares
│   │   │   ├── AppError.ts         # Custom error class
│   │   │   ├── checkAuth.ts        # JWT authentication
│   │   │   ├── csrfProtection.ts   # CSRF protection
│   │   │   ├── globalErrorHandler.ts # Global error handler
│   │   │   ├── notFound.ts         # 404 handler
│   │   │   └── validateRequest.ts  # Request validation
│   │   ├── 📁 modules/             # Feature Modules
│   │   │   ├── 📁 Admin/           # Admin Management
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.interface.ts
│   │   │   │   ├── admin.routes.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── admin.validation.ts
│   │   │   ├── 📁 Booking/         # Booking Management
│   │   │   │   ├── booking.controller.ts
│   │   │   │   ├── booking.interface.ts
│   │   │   │   ├── booking.model.ts
│   │   │   │   ├── booking.route.ts
│   │   │   │   ├── booking.service.ts
│   │   │   │   └── booking.validation.ts
│   │   │   ├── 📁 Bus/             # Bus Management
│   │   │   │   ├── bus.controller.ts
│   │   │   │   ├── bus.interface.ts
│   │   │   │   ├── bus.model.ts
│   │   │   │   ├── bus.route.ts
│   │   │   │   ├── bus.service.ts
│   │   │   │   └── bus.validation.ts
│   │   │   ├── 📁 Payment/         # Payment Processing
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── payment.interface.ts
│   │   │   │   ├── payment.model.ts
│   │   │   │   ├── payment.route.ts
│   │   │   │   └── payment.service.ts
│   │   │   ├── 📁 route/           # Route Management
│   │   │   │   ├── route.controller.ts
│   │   │   │   ├── route.interface.ts
│   │   │   │   ├── route.model.ts
│   │   │   │   ├── route.route.ts
│   │   │   │   ├── route.service.ts
│   │   │   │   └── route.validation.ts
│   │   │   ├── 📁 sslCommerz/      # Payment Gateway
│   │   │   │   ├── sslCommerz.interface.ts
│   │   │   │   └── sslCommerz.service.ts
│   │   │   └── 📁 user/            # User Management
│   │   │       ├── user.controller.ts
│   │   │       ├── user.interface.ts
│   │   │       ├── user.model.ts
│   │   │       ├── user.route.ts
│   │   │       └── user.service.ts
│   │   ├── 📁 routes/              # Route Aggregation
│   │   │   └── index.ts            # Main route file
│   │   └── 📁 utlis/               # Utility Functions
│   │       ├── catchAsync.ts       # Async error handler
│   │       └── sendResponse.ts     # Response formatter
│   ├── 📁 types/                   # TypeScript Types
│   │   └── express.d.ts            # Express type extensions
│   ├── app.ts                      # Express app setup
│   └── server.ts                   # Server configuration
├── 📁 project_requirement/         # Project Documentation
│   └── 🚌 Bus Ticket Booking System (Backend Project Requirement).pdf
├── .env                            # Environment variables (not in git)
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── .vercelignore                   # Vercel ignore rules
├── Frontend-Requirements.md        # Frontend specifications
├── LICENSE                         # MIT License
├── package.json                    # Dependencies & scripts
├── package-lock.json              # Dependency lock file
├── README.md                       # Project documentation
├── tsconfig.json                   # TypeScript configuration
└── vercel.json                     # Vercel deployment config
```

### 📂 Folder Structure Explanation:

- **`api/`** - Vercel serverless functions entry point
- **`src/app/auth/`** - Authentication & authorization logic
- **`src/app/config/`** - Configuration files & environment setup
- **`src/app/middleware/`** - Express middlewares for security & validation
- **`src/app/modules/`** - Feature-based modules (Admin, Bus, Booking, etc.)
- **`src/app/routes/`** - Route aggregation and API endpoint management
- **`src/app/utlis/`** - Utility functions and helpers
- **`src/types/`** - TypeScript type definitions
- **`project_requirement/`** - Project documentation and requirements

## 📊 Current Status

- ✅ **Backend API:** Deployed & Running
- ✅ **Database:** Connected (MongoDB Atlas)
- ✅ **Authentication:** JWT Implementation Ready
- ✅ **Payment Gateway:** SSLCommerz Integration Ready
- ⚠️ **Frontend:** Not Connected (Next Phase)
- ⚠️ **Full API Routes:** Partially Implemented

---

**⭐ If you find this project helpful, please give it a star!**
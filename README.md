# 🧭 LMS & Digital Product Sales Platform (Fullstack)

### 📚 All-in-One Online Learning & Digital Product Platform

A full-featured, bilingual LMS and Digital Product Marketplace — combining **eLearning**, **Live Events**, and **Digital Product Sales** in one scalable system.

---

## 🚀 Project Overview

The goal of this project is to build a **complete online learning and digital marketplace platform** where:

- Students can **purchase and learn pre-recorded video courses**.
- Admins can **share live meeting links** for Zoom/Google Meet sessions.
- Users can **buy and download digital products**, such as:
  - Chrome Extensions
  - Software Plugins
  - WordPress Plugins
  - E-books
  - Other downloadable assets
- Payment supported for both **local and international gateways**.
- Fully **bilingual system** — all content, UI, and course dubbing switchable between Bangla and English.
- **Admin-controlled system** (No Instructor Panel).

---

## 🧩 Core Modules & Features

### 👤 User Roles

| Role        | Access & Features                                                                     |
| ----------- | ------------------------------------------------------------------------------------- |
| **Admin**   | Manage Courses, Digital Products, Payments, Users, and System Settings                |
| **Student** | Buy & Access Courses, Join Meetings, Download Digital Products, Payments, and Reviews |

---

### 📚 LMS (Learning Management System)

- Pre-recorded video course support
- Course module & lesson management
- Secure video streaming (anti-piracy enabled)
- Course progress tracking
- Optional quizzes & assignments
- Video/Text reviews by students
- Course exams & auto certificate generation (with admin approval)
- Course search, filter, cart, and coupon system
- Enrollment history & transaction log

---

### 📅 Live Meeting Integration

- Zoom / Google Meet integration
- Admin-side live link scheduling
- Student dashboard “Join Meeting” button
- Meeting reminders (Email/SMS optional)
- Post-meeting recording link (optional)

---

### 💻 Digital Product Marketplace

- Product listing + details page
- Support for Chrome Extensions, Plugins, E-books, etc.
- Auto license key / download link delivery
- Version update management
- Download limit control (optional)

---

### 🎉 Seminar / Event Management

- Create & manage events/seminars from Admin Panel
- Free/Paid registration system
- Attach live meeting links
- Event reminder and participant tracking
- Attendance record system

---

## 💳 Payment Gateway Integration

Supports both **Local** and **International** gateways:

| Type          | Gateways                                               |
| ------------- | ------------------------------------------------------ |
| Local         | ✅ SSLCommerz, ✅ aamarPay, ✅ bKash, ✅ Bank Transfer |
| International | ✅ Stripe, ✅ PayPal                                   |

### Payment Features

- Auto invoice generation
- Coupon & discount system
- User transaction history
- Admin payment reports (filter, export PDF/CSV)
- Manual payment verification

---

## 🧑‍💼 Admin Dashboard Features

- ✅ Course Management (CRUD, Upload, Price & Discount, Category & Tags)
- ✅ Digital Product Management (License Key, Version Update)
- ✅ Meeting Management (Schedule, Notifications)
- ✅ User Management (Active/Block, History, Manual Payment)
- ✅ Payment Reports & Export
- ✅ Event Management
- ✅ Certification Management (Exam/Test, Auto Approve)
- ✅ System Settings (Branding, SMTP, SEO, Backup)
- ✅ Notification Center (Email, In-App, Manual Announcement)
- ✅ Analytics Dashboard (Users, Revenue, Sales, Graphs)

---

## 👨‍🎓 Student Dashboard Features

- My Courses + Progress Tracking
- Live Meeting & Schedule
- Download Purchased Digital Products
- Transaction & Invoice Download
- Review Submission (Video/Text)
- Seminar/Event Registration
- Auto Certification (Admin Approval)
- Language Switch (বাংলা / English)
- Support Ticket / Help Center (optional)

---

## 🧰 Technology Stack

| Layer               | Technology                                                 |
| ------------------- | ---------------------------------------------------------- |
| **Frontend**        | Next.js, Tailwind CSS, TypeScript                          |
| **Backend**         | Node.js, Express.js                                        |
| **Database**        | MongoDB                                                    |
| **Payments**        | SSLCommerz, aamarPay, bKash, Bank Transfer, Stripe, PayPal |
| **Storage**         | AWS S3 / Cloudinary                                        |
| **Hosting**         | Vercel (Frontend), AWS / Render (Backend)                  |
| **Auth & Security** | JWT, Bcrypt, HTTPS                                         |

---

## 🔐 Security & Performance

- JWT Authentication & Role-based Access
- Password Encryption (Bcrypt)
- DDoS Protection & Firewall
- CDN & Cache Optimization
- Database Backup & Recovery
- Secure Video Streaming (Anti Piracy)
- License Protection for Digital Products

---

## 🧪 Testing & Quality Assurance

- Unit & Integration Testing
- Manual & Automated QA
- Load Testing for High Traffic
- Security Audit & Vulnerability Fixes
- Bug Fixing & UAT (User Acceptance Testing)

---

## 🧩 System Architecture (Overview)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/lms-digital-platform.git
cd lms-digital-platform
```
##  2️⃣ Backend Setup

cd backend
npm install
cp .env.example .env
npm run dev

## 3️⃣ Environment Variables

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_url
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
STRIPE_SECRET_KEY=your_stripe_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

## 👨‍💻 Author

Developed by: [Alok Roy]
📧 Email: [alokroy602701@gmail.com]
🌐 Website: https://alok-roy-dev.vercel.app

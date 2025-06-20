# 🔐 Node.js Authentication App with OTP Email Verification

This is a simple authentication system built with **Node.js**, **Express**, and **MongoDB**. It features user signup/login, session management, and OTP-based email verification for password reset.

---

## 🚀 Features

- User Signup and Login
- Session Management with `express-session`
- Flash Messaging using `connect-flash`
- OTP generation and email sending using `nodemailer`
- Password Reset via OTP Verification
- Templating with `EJS`
- UI styled with `Bootstrap`

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS Templating
- Bootstrap 5
- Nodemailer
- OTP Generator

---
├── index.js               # Main server file
├── views/                 # EJS templates
│   ├── Login.ejs
│   ├── Signup.ejs
│   ├── Home.ejs
│   ├── Everify.ejs
│   ├── OtpVerify.ejs
│   ├── ChangePassword.ejs
│   ├── NotFound.ejs
├── package.json
├── package-lock.json

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd auth

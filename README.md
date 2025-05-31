# Prescripto

Prescripto is a web-based appointment booking and management system designed for patients to easily book and view their medical appointments.

---

## 🚀 Features

- 🔐 User authentication (Login, JWT-based security)
- 🧑‍⚕️ Browse doctors by specialization
- 📅 Book appointments with doctors
- 📄 View and manage personal appointments
- 📁 Profile management
- 🛡️ Admin routes & management
- 🌩️ Image uploads with Cloudinary
- 💸 Payment integration with Razorpay & Stripe
- 🌈 Modern responsive UI using Tailwind CSS
- 🔔 Notifications via React Toastify

## 🛠️ Tech Stack

### Frontend:
- React
- React Router
- Tailwind CSS
- React Toastify
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Cloudinary (for image storage)
- Stripe & Razorpay (payment gateways)
- Multer (file uploads)
- JWT Authentication
- dotenv for environment variables


## 📂 Folder Structure

Prescripto/<br>
│
├── frontend/ # React frontend<br>
│ ├── src/<br>
│ │ ├── components/<br>
│ │ │ └── MyAppointment.js<br>
│ │ ├── App.js<br>
│ │ └── ...<br>
│
├── backend/ # Node.js backend<br>
│ ├── models/<br>
│ │ └── appointmentModel.js<br>
│ ├── routes/<br>
│ │ └── appointments.js<br>
│ ├── server.js<br>
│ └── ...<br>
│
└── README.md # This file

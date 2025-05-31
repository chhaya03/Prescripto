# Prescripto

Prescripto is a web-based appointment booking and management system designed for patients to easily book and view their medical appointments.

---

## 🚀 Features

- **Book Appointments:** Patients can select available slots with doctors.
- **View My Appointments:** Displays a list of upcoming and past appointments.
- **Doctor Details:** Each appointment shows the doctor’s photo, name, specialization, and address.
- **Date Formatting:** Appointments show human-friendly dates (e.g., 20 Jan 2025).
- **Data Management:** Backend stores appointment details, user, and doctor data securely using MongoDB.

---

## 🛠️ Technologies Used

### Frontend:
- **React** (with React Router)
- **Tailwind CSS** (for modern styling)
- **Axios** (for API requests)
- **React Toastify** (for notifications)

### Backend:
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT Authentication** (optional, if implemented)

---

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

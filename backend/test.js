import mongoose from 'mongoose';
import appointmentModel from './models/appointmentModel.js';
import doctorModel from './models/doctorModel.js';
import userModel from './models/userModel.js';

async function addSampleData() {
  try {
    await mongoose.connect('your_mongodb_connection_string');

    // Sample User
    const user = new userModel({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '1234567890',
      address: { line1: '123 Main St', line2: 'Apt 4' },
      gender: 'Male',
      dob: '1990-01-01',
    });
    await user.save();

    // Sample Doctor
    const doctor = new doctorModel({
      name: 'Dr. Smith',
      email: 'drsmith@example.com',
      password: 'securepassword',
      image: 'https://example.com/image.jpg',
      speciality: 'Cardiology',
      degree: 'MD',
      experience: '10 years',
      about: 'Experienced cardiologist',
      fees: 100,
      address: { line1: '456 Health St', line2: 'Suite 2' },
      date: Date.now(),
    });
    await doctor.save();

    // Sample Appointment
    const appointment = new appointmentModel({
      userId: user._id.toString(),
      docId: doctor._id.toString(),
      slotDate: '2025-06-01',
      slotTime: '10:00 AM',
      userData: {
        name: user.name,
        email: user.email,
      },
      docData: {
        name: doctor.name,
        speciality: doctor.speciality,
      },
      amount: doctor.fees,
      date: Date.now(),
      cancelled: false,
      isCompleted: false,
    });
    await appointment.save();

    console.log('Sample data inserted successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

addSampleData();

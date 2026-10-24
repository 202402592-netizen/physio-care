import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Appointment must belong to a patient']
  },
  clinician: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Appointment must belong to a clinician']
  },
  date: {
    type: Date,
    required: [true, 'Appointment must have a date and time']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    trim: true
  },
  meetingLink: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index to help with querying upcoming appointments quickly
appointmentSchema.index({ clinician: 1, date: 1 });
appointmentSchema.index({ patient: 1, date: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;

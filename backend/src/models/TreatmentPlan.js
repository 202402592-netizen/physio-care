import mongoose from 'mongoose';

const treatmentPlanSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Treatment plan must belong to a patient']
  },
  clinician: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Treatment plan must belong to a clinician']
  },
  title: {
    type: String,
    required: [true, 'Treatment plan must have a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise',
        required: true
      },
      sets: {
        type: Number,
        required: true
      },
      reps: {
        type: Number,
        required: true
      },
      frequency: {
        type: String, // e.g., 'daily', '3 times a week'
        required: true
      },
      notes: String
    }
  ]
}, {
  timestamps: true
});

const TreatmentPlan = mongoose.model('TreatmentPlan', treatmentPlanSchema);
export default TreatmentPlan;

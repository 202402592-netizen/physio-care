import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Progress must belong to a patient']
  },
  treatmentPlan: {
    type: mongoose.Schema.ObjectId,
    ref: 'TreatmentPlan'
  },
  date: {
    type: Date,
    default: Date.now
  },
  painLevel: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, 'Pain level is required']
  },
  mobilityLevel: {
    type: Number,
    min: 0,
    max: 10
  },
  notes: {
    type: String,
    trim: true
  },
  completedExercises: [
    {
      exercise: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise'
      },
      completedSets: Number,
      completedReps: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'hard', 'very hard']
      }
    }
  ]
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;

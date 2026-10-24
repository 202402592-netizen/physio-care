import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exercise must have a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Exercise must have a description'],
    trim: true
  },
  instructions: {
    type: String,
    trim: true
  },
  mediaUrl: {
    type: String, // Video or image URL
    trim: true
  },
  defaultSets: {
    type: Number,
    default: 3
  },
  defaultReps: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    enum: ['flexibility', 'strength', 'balance', 'endurance', 'other'],
    default: 'other'
  }
}, {
  timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;

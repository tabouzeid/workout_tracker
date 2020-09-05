const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ['cardio', 'resistance'],
    required: true,
  },
  weight: {
    type: Number,
    min: 1,
  },
  sets: {
    type: Number,
    min: 1,
  },
  reps: {
    type: Number,
    min: 1,
  },
  duration: {
    type: Number,
    min: 1,
  },
  distance: {
    type: Number,
    min: 1,
  },
},
{ 
  strict: true 
});

const WorkoutSchema = new Schema({
  day: {
    type: Date, 
    default: Date.now,
  },
  exercises: [ExerciseSchema],
},
{ 
  strict: true 
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

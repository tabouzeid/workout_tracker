const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
});

const WorkoutSchema = new Schema({
  day: {
    type: Date, 
    default: Date.now,
  },
  exercises: [ExerciseSchema],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

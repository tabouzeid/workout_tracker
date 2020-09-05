const path = require("path");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/api/workouts", (req, res, next) => {
    db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
});

app.post("/api/workouts", ({body}, res, next) => {
    db.Workout.create(body)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

app.put("/api/workouts/:id", (req, res, next) => {
    db.Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, { new: true, runValidators: true, })
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
});

app.get("/api/workouts/range", (req, res, next) => {
    let filterDate = new Date();
    filterDate = filterDate.setDate(filterDate.getDate() - 7);
    db.Workout.find({day: { $gte: filterDate }})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
        console.log(err);
        next(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

const express = require('express');

const Workout = require('../models/workoutModel');

const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController') 

const router = express.Router();

// get all workouts
router.get('/', getWorkouts);

// get a single workout
router.get('/:id', getWorkout);

// post workout
router.post('/', createWorkout);

// delete workout 
router.delete('/:id', deleteWorkout);

// get a single workoutb 
router.patch('/:id', updateWorkout);


module.exports = router;

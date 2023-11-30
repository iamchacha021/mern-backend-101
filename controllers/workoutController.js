const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')


//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1});

    res.status(200).json(workouts);
};


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    // check if the id is valid, ie: if it is more than 12 hex characters this will ensure our server does not crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'The workout does not exist'})
    }


    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({error: "The workout does not exist"});
    };

    res.status(200).json(workout);
};


// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps} = req.body;

    // check if one of the fields is missing even before trying to save it to the db
    // const emptyFields = []

    // if(!title) {
    //     emptyFields.push('title')
    // }

    // if(!load) {
    //     emptyFields.push('load')
    // }

    // if(!reps) {
    //     emptyFields.push('reps')
    // }

    // if(emptyFields.length > 0) {  //if the length is greater than 0 then it means one of the fileds is missing
    //     res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    // }

    // add doc to db
    try{
        const workout = await Workout.create({ title, load, reps });

        res.status(200).json(workout);
    } catch(error) {
        res.status(400).json({ error: error.message});
    }
};


// delete a workout
const deleteWorkout = async ( req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The workout does not exist'});
    };

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout) {
        return res.status(400).json({ error: 'The workout does not exist'});
    };

    res.status(200).json(workout);
}


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The workout does not exist'});
    };

    const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body }) //spread out whatever was passed into the body

    if(!workout) {
        return res.status(400).json({error: 'The workout does not exist'});;
    }

    res.status(200).json(workout);
};


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
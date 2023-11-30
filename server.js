const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');

// middleware
app.use(express.json()); //grabs content from the form

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });

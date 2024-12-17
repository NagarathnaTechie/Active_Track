require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');

// express app
const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // React frontend origin
}));

// Log each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Start the server
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log('connected to db & listening on port', port);
        });
    })
    .catch((error) => {
        console.log(error);
    });

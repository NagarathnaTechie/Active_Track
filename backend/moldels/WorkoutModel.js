const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //Number of repitition
    reps: {
        type: Number,
        required: true        
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)
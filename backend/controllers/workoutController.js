const Workout = require('../moldels/WorkoutModel')
const  mongoose= require('mongoose')

//get all workouts
const getWorkouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//create a new workout
const createWorkout = async(req, res) =>{
    const {title, load, reps} = req.body

    let emptyField = []

    if(!title) {
        emptyField.push('title')
    }
    if(!load) {
        emptyField.push('load')
    }
    if(!reps) {
        emptyField.push('reps')
    }
    if(emptyField.length > 0){
        return res.status(400).json({error: 'Please fill in all the Fields!', emptyField})
    }


    // add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//dlt a workout
const deleteWorkout = async(req, res) =>{
    const{id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout =await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    // Update the workout
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
};


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}

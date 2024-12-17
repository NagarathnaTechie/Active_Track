import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';



const WorkoutForm = () =>{
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            // make workout as string
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyField(json.emptyField)
        }
        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyField([])
            console.log('new workout is added!', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add a New Workout</h2>

            <label>Exercize Title: </label>
            <input 
                typt="text"
                onChange = {(e) => setTitle(e.target.value)}
                value={title}
                className= {emptyField.includes('title') ? 'error' : ''}
            />

            <label>Load (in Kg): </label>
            <input 
                typt="number"
                onChange = {(e) => setLoad(e.target.value)}
                value={load}
                className= {emptyField.includes('load') ? 'error' : ''}
            />

            <label>Reps: </label>
            <input 
                typt="number"
                onChange = {(e) => setReps(e.target.value)}
                value={reps}
                className= {emptyField.includes('reps') ? 'error' : ''}
            />

            <button> Add Workout </button>
            {error && <div className="error"> {error} </div>}

        </form>
    )
}

export default WorkoutForm;
import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                ...state,
                workouts: [action.payload, ...state.workouts]
            } 
        case 'DELETE_WORKOUT': 
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)  
            };
        default: 
            return state
        
    }
}

export const WorksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: []})

    return(
        <WorkoutsContext.Provider value = {{...state, dispatch}}>
           { children } 
        </WorkoutsContext.Provider>
    )
}
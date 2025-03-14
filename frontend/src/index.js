import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorksContextProvider } from './context/WorkoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorksContextProvider>
      <App />
    </WorksContextProvider>    
  </React.StrictMode>
);


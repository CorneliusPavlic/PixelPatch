import React from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.css'; // Import global CSS styles
import App from './App'; // Import the main App component

// Import any additional necessary libraries (like React Router)
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root') // This assumes you have a div with id "root" in your index.html
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReactGA from 'react-ga';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactGA.initialize('G-WNN7MV1HT0');
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();

// src/index.js  ← THIS IS THE ONLY FILE VERCEL WILL ACCEPT
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';        // ← .jsx because your App is .jsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
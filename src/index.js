// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';        // ← points to App.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
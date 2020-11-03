/* eslint-disable react/button-has-type */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App.jsx';
import './styles/index.css';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

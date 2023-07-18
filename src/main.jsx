import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter , Route, Link } from 'react-router-dom';
//const API_KEY = 6786787; https://api.themoviedb.org/3/movie/550?api_key=66103917f39fe2fd9c358ea96df71996;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
);

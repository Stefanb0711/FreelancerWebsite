import React from 'react';
import {Login } from './auth/Login';
import {Register } from './auth/Register';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from "./Home";



function App() {
  return (

    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>

    </BrowserRouter>

  );
}

export default App;

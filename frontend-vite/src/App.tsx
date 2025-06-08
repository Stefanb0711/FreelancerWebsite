import React from 'react';
import {Login } from './auth/Login';
import {RegisterStep1 } from './auth/RegisterStep1.tsx';
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
        <Link to="/register/step1">Register</Link>
      </nav>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register/step1' element={<RegisterStep1 />} />

        </Routes>

    </BrowserRouter>

  );
}

export default App;

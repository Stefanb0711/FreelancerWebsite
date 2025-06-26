import React, {useEffect, useState} from 'react';
import {Login } from './auth/Login';
import {RegisterStep1 } from './auth/RegisterStep1.tsx';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link, Router} from 'react-router-dom';
import Home from "./Home";
import NavigationBar from "./components/NavigationBar.tsx";
//import {AuthProvider} from "./Context/AuthContext.tsx";
import authService from "./services/AuthService.service.ts";
//import {AuthContext} from "./Context/AuthContext.tsx";
import {AuthProvider} from "./Context/AuthProvider.ts";

function App() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(authService.userLoggedIn);

    useEffect(() => {
        setIsUserLoggedIn(authService.userLoggedIn);
    }, []);

  return (

      <AuthProvider>
          <BrowserRouter>

              <NavigationBar />

              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register/step1' element={<RegisterStep1 />} />

              </Routes>

          </BrowserRouter>

      </AuthProvider>


  );
}

export default App;

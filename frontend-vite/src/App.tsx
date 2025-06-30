import React, {useState, } from 'react';
import {Login } from './auth/Login';
import {RegisterStep1 } from './auth/RegisterStep1.tsx';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from "./Home";
import {NavBar} from "./components/NavBar.tsx";

export const AuthContext = React.createContext();

function App() {

    const [signedIn, setSignedIn] = useState<boolean>(false);


    //<AuthContext.Provider value={{signedIn, setSignedIn}}>
    //      </AuthContext.Provider>
  return (

    <AuthContext.Provider value={[signedIn, setSignedIn]}>

          <BrowserRouter>
              <NavBar />

              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register/step1' element={<RegisterStep1 />} />

              </Routes>

          </BrowserRouter>
    </AuthContext.Provider>


  );
}

export default App;

/* eslint-disable no-unused-vars */
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home.jsx';
import './App.css'

function App() {

  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App

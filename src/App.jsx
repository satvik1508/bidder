import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Proifle from './pages/Profile'
function App() {
    return (
        <BrowserRouter>   
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<Proifle/>}></Route>
        </Routes>
           
        </BrowserRouter>
    )
}

export default App

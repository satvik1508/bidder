import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Proifle from './pages/Profile'
import Userdash from './pages/Userdash'
import Protected from './pages/Protected'
function App() {
    return (
        <BrowserRouter>   
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<Protected Component={Proifle}/>}></Route>
            <Route path='/Userdash' element={<Protected Component={Userdash}/>}></Route>
        </Routes>
           
        </BrowserRouter>
    )
}

export default App

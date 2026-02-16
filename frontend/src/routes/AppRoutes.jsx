import React from 'react'
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import UserRegister from '../Pages/UserRegister'
import Start from '../Pages/Start'
import Homepage from '../Pages/Homepage'

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={ <Start /> }/>
    <Route path="/home" element={ <Homepage /> }/>
    <Route path="/user/register" element={ <UserRegister />  }/>
        </Routes>
    </Router>
  )
}

export default AppRoutes  
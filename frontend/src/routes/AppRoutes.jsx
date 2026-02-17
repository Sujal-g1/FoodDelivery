import React from 'react'
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import UserRegister from '../Pages/auth/UserRegister'
import FoodPartnerRegister from '../Pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../Pages/auth/FoodPartnerLogin'
import Start from '../Pages/Start'
import Homepage from '../Pages/General/Homepage'
import UserLogin from '../Pages/auth/UserLogin'
import CreateFood from '../Pages/Food-partner/CreateFood'

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={ <Start /> }/>
    <Route path="/home" element={ <Homepage /> }/>
    <Route path="/user/register" element={ <UserRegister />  }/>
    <Route path="/user/login" element={ <UserLogin />  }/>
    <Route path="/food-partner/register" element={ <FoodPartnerRegister />  }/>
    <Route path="/food-partner/login" element={ <FoodPartnerLogin />  }/>
    {/* <Route path="/register" element={<ChooseRegister />} /> */}
    <Route path="/user/register" element={<UserRegister />} />
    <Route path="/user/login" element={<UserLogin />} />
    <Route path="/create-food" element={ <CreateFood /> } />
    {/* <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
    <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
    <Route path="/" element={<><Home /><BottomNav /></>} />
    <Route path="/saved" element={<><Saved /><BottomNav /></>} />
    <Route path="/create-food" element={<CreateFood />} />
    <Route path="/food-partner/:id" element={<Profile />} /> */}
        </Routes>
    </Router>
  )
}

export default AppRoutes  
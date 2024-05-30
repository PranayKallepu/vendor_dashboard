import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import './App.css'

import NavBar from './vendorDashboard/components/Navbar'
import Home from './vendorDashboard/components/Home'
import Login from './vendorDashboard/components/Login'
import Register from './vendorDashboard/components/Register'
import AddFirm from './vendorDashboard/components/AddFirm/'
import AddProduct from './vendorDashboard/components/AddProduct'
import AllProducts from './vendorDashboard/components/AllProducts'
import NotFound from './vendorDashboard/components/NotFound'
import { UserDetails } from './vendorDashboard/components/UserDetails'

const App = () => {

  return (
    <>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/register' element={<Register  />} />
          <Route exact path='/add-firm' element={<AddFirm />} />
          <Route exact path='/add-product' element={<AddProduct />} />
          <Route exact path='/all-products' element={<AllProducts />} />
          <Route exact path='/user-details' element={<UserDetails />} />
          <Route  path='/*' element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App

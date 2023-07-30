import React from 'react'
import Home from '../Pages/Home/Home'
import Navbar from '../Pages/Home/Navbar/Navbar'
import Footer from '../Pages/Home/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      </div>
  )
}

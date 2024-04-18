import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const Layout = () => {
  return (
    <div>
      <Outlet/>
      <Navbar/>
      <p>Layout</p>
    </div>
  )
}

export default Layout

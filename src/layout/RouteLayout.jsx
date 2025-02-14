import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RouteLayout = () => {
    const [form, setForm] = useState({})
    
  return (
    <div>
        <Navbar/>
        <Outlet context={{form, setForm}}/>
    </div>
  )
}

export default RouteLayout
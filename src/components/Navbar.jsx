import React from 'react'
import '../styles/Navbar.css'
import arrow from '../assets/div.svg'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div>
        <div className="navbar-bg">
           
            <div className="logo-div">
            <img src={logo} alt="" />
            </div>
            <div className='nav-list'>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><p className="navitems">Events</p></Link>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><p className="navitems">My Tickets</p></Link>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><p className="navitems">About project</p></Link>

            
            </div>
            <div className="my-tickets">
                    <button>My Tickets <img src={arrow} alt="" /></button>
            </div>
          
        </div>
    </div>
  )
}

export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">FitTrack</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/signup">Signup</Link> */}
        <Link to="/dashboard">Dashboard</Link>
        

        {/* External link to port 3005 */}
        <a 
          href="http://localhost:3005/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Live YOGA AI
        </a>
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;

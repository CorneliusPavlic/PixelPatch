import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoNoBorder.png';
import '../../styles/HeaderFooter.css';
import { Toggle } from '../Theme-toggle/theme-toggle'

const Header = () => {
  //for the light/dark toggle
  // const [isDark, setIsDark] = useState(true); 
  return (
    <header>
      {/* just a plain toggle atm
      <Toggle 
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      /> */}
      <nav>
        {/* <Link to="/"><img src= {logo} alt="PixelPatch Logo" className='logo-image-small'/></Link> */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}; 
export default Header;

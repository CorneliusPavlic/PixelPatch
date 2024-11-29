import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HeaderFooter.css';
import { Toggle } from '../Theme-toggle/theme-toggle'

const Header = () => {
  //for the light/dark toggle
  // const [isDark, setIsDark] = useState(true); 
  return (
    <header>
      <Link to="/"><img src="/assets/logoNoBorder" alt="PixelPatch Logo" /></Link>
      {/* just a plain toggle atm
      <Toggle 
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      /> */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}; 
export default Header;

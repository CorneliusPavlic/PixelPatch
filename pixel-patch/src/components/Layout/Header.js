import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HeaderFooter.css';
const Header = () => {
  return (
    <header>
      <Link to="/"><img src="/assets/logo.png" alt="PixelPatch Logo" /></Link>
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

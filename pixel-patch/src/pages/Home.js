import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logoNoBorder.png';
/*
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to PixelPatch</h1>
      <p>Explore latest posts, and create your own pixel art!</p>
      <a href="/create-post" className="create-post-btn">Create Post</a>
    </div>
  );
};
*/


const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="logo" class="logo-image" />
      <div className = "home-container-buttons">
        <a href="/login" className="create-post-btn">login</a>
        <a href="/signup" className="create-post-btn">signup</a>
        <a href="/about" className="create-post-btn">about</a>
      </div>  
      <a href="/create-post" className="create-post-btn">Create Post</a>
    </div>
  );
};


export default Home;

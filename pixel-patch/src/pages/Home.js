import React from 'react';
import '../styles/Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to PixelPatch</h1>
      <p>Explore latest posts, and create your own pixel art!</p>
      <a href="/create-post" className="create-post-btn">Create Post</a>
    </div>
  );
};

export default Home;

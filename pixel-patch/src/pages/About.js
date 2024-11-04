import React from 'react';
import '../styles/About.css';
const About = () => {
  return (
    <div className="about-container">
      <h1>About PixelPatch</h1>
      <p>
        Welcome to PixelPatch! This platform is designed for pixel art enthusiasts to create, share, and explore creative pixel artworks. Whether you're a seasoned artist or just getting started, PixelPatch offers a fun and interactive way to dive into the world of pixel art.
      </p>
      <h2>How to Use PixelPatch</h2>
      <ul>
        <li><strong>Create Posts:</strong> Use our easy-to-use pixel art editor to create unique pixel art posts. Once you're done, you can publish your work or save it to your private archive.</li>
        <li><strong>Explore Content:</strong> Scroll through posts by other users, interact with them, and get inspired!</li>
        <li><strong>Profile Management:</strong> Customize your profile, manage your posts, and control your visibility.</li>
      </ul>
      <h2>Key Features</h2>
      <ul>
        <li>Create pixel art directly from the browser.</li>
        <li>Tag your posts with relevant topics and explore trending tags.</li>
        <li>Bookmark your favorite posts and easily manage them from your profile.</li>
        <li>Switch between light and dark modes for a personalized experience.</li>
      </ul>
      <h2>Get Started</h2>
      <p>
        If you're new here, <a href="/signup">sign up</a> to create your first post. Already have an account? <a href="/login">Login</a> to continue your pixel art journey.
      </p>
    </div>
  );
};

export default About;

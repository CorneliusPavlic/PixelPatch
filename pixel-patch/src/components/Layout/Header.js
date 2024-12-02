import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/HeaderFooter.css';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleCreatePostClick = () => {
    const token = localStorage.getItem('accessToken'); // Check if the user is logged in
    if (!token) {
      alert('You must be logged in to create a post. Redirecting to login...');
      navigate('/login'); // Redirect to the login page if not logged in
    } else {
      navigate('/create-post'); // Allow navigation to the Create Post page
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {loggedIn && <Link to="/profile">Profile</Link>}
        {!loggedIn && <Link to="/login">Login</Link>}
        {loggedIn && (
          <button
            className="nav-link-button styled-link"
            onClick={() => {
              localStorage.removeItem('accessToken');
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
        <button onClick={handleCreatePostClick} className="nav-link-button styled-link">
          Create Post
        </button>
        <Link to="/search"><FaSearch /></Link>
          
      </nav>
    </header>
  );
};

export default Header;

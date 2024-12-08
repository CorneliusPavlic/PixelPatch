import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/HeaderFooter.css';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleCreatePostClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('You must be logged in to create a post. Redirecting to login...');
      navigate('/login');
    } else {
      navigate('/create-post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/search">
          <FaSearch />
        </Link>
        <button
          onClick={handleCreatePostClick}
          className="nav-link-button styled-link"
        >
          Create Post
        </button>
        {loggedIn && (
          <>
            <button
              className="nav-link-button styled-link"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>
            <Link to="/profile">Profile</Link>
          </>
        )}
        {!loggedIn && <Link to="/login">Login</Link>}
      </nav>

      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="confirm-button">
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

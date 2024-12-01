import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './styles/globals.css'; // Global styles
import './styles/theme.css';
import UserProfile from './pages/UserProfile'; // Import the UserProfile component 


function App() {
  return (
    <Router>
      <>
        <Header/>
        <button id="theme-toggle" className="main-btn" >toggle</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-profile/:user_id" element={<UserProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;

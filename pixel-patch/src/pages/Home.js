import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Ensure axios is installed
import '../styles/Home.css';
import '../styles/theme.css'; 
import { Link } from 'react-router-dom';  // Add this to handle navigation
import logo from '../assets/logoNoBorder.png';
import Drawing from '../components/PixelCreator/Drawing';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
    
  // Fetch posts from the backend
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/retrieve_posts?page=${page}&per_page=10`, // Adjust per_page if needed
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, // Assuming you're storing the token in localStorage
        }
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchPosts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPosts]);

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="home-container" data-theme = "lightHome" >
      <img src={logo} alt="logo" class="logo-image" />
      <div className = "home-container-buttons">
        <a href="/login" className="main-btn" data-theme = "lightBtn" >login</a>
        <a href="/signup" className="main-btn" data-theme = "lightBtn">signup</a>
        <a href="/about" className="main-btn" data-theme = "lightBtn">about</a>
      </div>
      <a href="/create-post"className="main-btn" data-theme = "lightBtn">create post</a>
      <p>Explore the latest posts and create your own pixel art!</p>
      
      <div className="posts-container">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h2>{post.title}</h2>
            {/* Link to the user’s profile page */}
            <Link to={`/user-profile/${post.user_id}`} className="username-link">
              {post.username}
            </Link>
            <Drawing initialGrid={JSON.parse(post.content)} disableGridLines={true} disableDrawing={true} disableClearGrid={true} disableColors={true}/>
          </div>
        ))}
      </div>

      {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to show.</p>}
    </div>
  );
};

export default Home;

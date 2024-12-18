import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/api';
import '../styles/Profile.css'; // Assuming your CSS is correctly styled
import Drawing from '../components/PixelCreator/Drawing'; // Make sure this is the correct path

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // The post being edited
  const [newTitle, setNewTitle] = useState(''); // New title for the post
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch user posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get the token from localStorage
        if (!token) {
          setStatusMessage('User is not authenticated. Login or Signup to view this page!');
          setLoading(false);
          return;
        }

        const response = await api.get('/retrieve_user_posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setStatusMessage('Error retrieving posts.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await api.delete(`/delete_post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== postId)); // Remove deleted post from the list
      setStatusMessage('Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error);
      setStatusMessage('Error deleting post.');
    }
  };

  // Start editing a post
  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
  };

  // Save the edited post
  const handleSave = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await api.put(
        `/edit_post/${postId}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.map((post) => (post.id === postId ? { ...post, title: newTitle } : post)));
      setEditingPost(null); // Stop editing
      setNewTitle('');
      setStatusMessage('Post updated successfully.');
    } catch (error) {
      console.error('Error saving post:', error);
      setStatusMessage('Error saving post.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p>{statusMessage || 'Here you can view and update your information, manage posts, and more.'}</p>

      {/* Posts List */}
      <div className="posts-list">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              {editingPost?.id === post.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button onClick={() => handleSave(post.id)}>Save</button>
                  <button onClick={() => setEditingPost(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{post.title}</h3>
                  <p>{post.hashtags}</p> {/* Display hashtags if available */}
                  
                  {/* Render the Drawing component */}
                  <div className="post-content">
                    <Drawing
                      initialGrid={JSON.parse(post.content)} // Assuming `post.content` holds the pixel art grid data as JSON
                      disableGridLines={true}
                      disableDrawing={true}
                      disableClearGrid={true}
                      disableFill={true}
                      disableColors={true}
                    />
                  </div>

                  <div className="post-actions">
                    <button onClick={() => handleEdit(post)}>Edit Title</button>
                    <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;

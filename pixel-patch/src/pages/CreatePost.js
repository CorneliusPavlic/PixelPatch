import React, { useRef, useState } from 'react';
import '../styles/CreatePost.css'; // Assuming styles are in a separate CSS file
import Drawing from '../components/PixelCreator/Drawing';
import axios from 'axios';
import api from '../api/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreatePost = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const drawingRef = useRef();

  const handlePost = async () => {
    // Ensure all necessary fields are filled
    if (!title.trim() || !tags.trim()) {
      setStatusMessage('Title and tags are required.');
      return;
    }

    if (drawingRef.current) {
      try {
        const gridData = drawingRef.current.getGridData(); // Get pixel art data
        const token = localStorage.getItem('accessToken'); // Retrieve JWT token

        if (!token) {
          setStatusMessage('User is not authenticated.');
          return;
        }

        // Make POST request to backend
        const response = await api.post(
          '/submitPost',
          {
            title,
            dataSend: gridData,
            hashtags: tags,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
            },
          }
        );

        // Handle success
        setStatusMessage('Post created successfully!');
        console.log('Post response:', response.data);
        navigate('/profile')
        // Clear the canvas after successful post
        clearCanvas();
      } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        setStatusMessage(
          error.response?.data?.message || 'Error creating post. Please try again.'
        );
      }
    } else {
      setStatusMessage('Error with canvas reference.');
    }
  };

  const clearCanvas = () => {
    setTitle('');
    setTags('');
    setStatusMessage('');
    if (drawingRef.current) {
      drawingRef.current.clearGridData();
    } else {
      setStatusMessage('Error clearing canvas.');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Pixel Art Post</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags (comma-separated)"
        />
      </div>
      <div className="pixel-art-canvas">
        <Drawing ref={drawingRef} cellSize={1.7}/>
      </div>
      <div className="actions">
        <button onClick={handlePost}>Post</button>
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default CreatePost;

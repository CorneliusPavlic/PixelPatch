import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css'; // Add the appropriate styles
import Drawing from '../components/PixelCreator/Drawing';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const { user_id } = useParams();
  console.log('userId:', user_id);
  // Fetch user posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        
        const response = await axios.get(`http://127.0.0.1:5000/user_posts/${user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setStatusMessage('Error retrieving posts.');
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user_id]);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {statusMessage && <p>{statusMessage}</p>}
      
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>This user has not posted anything yet.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <Drawing
                initialGrid={JSON.parse(post.content)} // Display the pixel art
                disableGridLines={true}
                disableDrawing={true}
                disableClearGrid={true}
                disableColors={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

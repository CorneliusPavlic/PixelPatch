import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/UserProfile.css'; // Add the appropriate styles
import Drawing from '../components/PixelCreator/Drawing';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null); // To store user information
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const { user_id } = useParams();
  console.log('userId:', user_id);

  // Fetch user profile and posts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user details
        const userResponse = await api.get(`/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(userResponse.data);

        // Fetch user posts
        const postsResponse = await api.get(`/user_posts/${user_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setPosts(postsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile or posts:', error);
        setStatusMessage('Error retrieving profile or posts.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user_id]);

  return (
    <div className="user-profile-container">
      <h2>{user ? `${user.username}'s Profile` : 'Loading Profile...'}</h2>
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
                disableFill={true}
                disableClearGrid={true}
                disableColors={true}
                cellSize={1.7}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

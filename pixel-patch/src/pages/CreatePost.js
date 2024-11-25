import React, { useRef, useState } from 'react';
import '../styles/CreatePost.css'; // Assuming styles are in a separate CSS file
import Drawing from '../components/PixelCreator/Drawing';
import $ from "jquery";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [canvasData, setCanvasData] = useState(''); // Placeholder for canvas data
  const [statusMessage, setStatusMessage] = useState('');
  const drawingRef = useRef();

  const handlePost = () => {
    // Logic for posting the pixel art
    if(drawingRef.current){
      const gridData = drawingRef.current.getGridData();
      setCanvasData(gridData);
      $.ajax({
        type: "POST",
        url: 'http://localhost/phpmyadmin/Example/HIC/PixelPatch/pixel-patch/src/php/submitPost.php',
        dataType: 'json',
        data: {"title": title, "dataSend": gridData, "hashtags": tags, "userID": 5},
        success: function(data) {
          // Do something with the response data
          console.log('Success:',data);
        },
        error: function(error) {
          // Handle errors
          console.error('Error:', error);
        }
        
                
      });
      //console.log(gridData);
      
      clearCanvas();
    } else{
      setStatusMessage('Error with creating post')
    }
    
  };

  const handleArchive = () => {
    // Logic for archiving the post
    setStatusMessage('Post saved to archive.');
    clearCanvas();
  };

  const handleDelete = () => {
    // Logic for deleting the post
    setStatusMessage('Post successfully deleted.');
    clearCanvas();
  };

  const clearCanvas = () => {
    // Logic to clear the canvas and reset form fields
    setTitle('');
    setTags('');
    setCanvasData(''); // Reset canvas data
    if(drawingRef.current){
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
        <Drawing ref={drawingRef}/>
        {/* Placeholder for canvas component */}
      </div>
      <div className="actions">
        <button onClick={handlePost}>Post</button>
        <button onClick={handleArchive}>Archive</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default CreatePost;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/api';
import '../styles/Search.css'; // Add styles for the search page
import Drawing from '../components/PixelCreator/Drawing';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // When the component mounts or query changes, update the search results
  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    setQuery(queryParam); // Set the query from the URL
    if (queryParam) {
      handleSearch(queryParam); // Perform search if a query exists
    }
  }, [searchParams]);

  const handleSearch = async (queryParam) => {
    setLoading(true);
    setStatusMessage('');
    setResults([]);

    try {
      const response = await api.get(`/search`, {
        params: { query: queryParam },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error performing search:', error);
      setStatusMessage('Error fetching search results.');
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      // Update the URL with the new search term without reloading the page
      setSearchParams({ query });
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by username or hashtag..."
          value={query}
          onChange={handleQueryChange}
          required
        />
        <button type="submit">Search</button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-results">
          {results.length === 0 && <p>No results found.</p>}
          {results.map((result) => (
            <div
              key={result.id}
              className="search-item"
              onClick={() => navigate(`/user-profile/${result.user_id}`)}
            >
              <h3>{result.title || `@${result.username}`}</h3>
              {result.content && (
                <Drawing
                  initialGrid={JSON.parse(result.content)} // Display the pixel art
                  disableGridLines={true}
                  disableDrawing={true}
                  disableFill={true}
                  disableClearGrid={true}
                  disableColors={true}
                  cellSize={1.7}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

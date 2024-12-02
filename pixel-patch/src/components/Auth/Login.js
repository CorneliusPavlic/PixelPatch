import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import '../../styles/Auth.css';
import '../../styles/theme.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });

      // Store the JWT token
      localStorage.setItem('accessToken', response.data.access_token);

      setSuccess('Login successful!');
      console.log('Login Response:', response.data);

      // Redirect user after login if needed
      // window.location.href = '/profile';
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className='auth-form'>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          placeholder="Username"
          id="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='login-createAccount-btn' data-theme = 'lightBtn'>Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;

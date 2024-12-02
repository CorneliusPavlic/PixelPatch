import React, { useState } from 'react';
import axios from 'axios'; // Axios for API calls
import '../../styles/Auth.css';
import '../../styles/theme.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        email,
        password,
      });

      setSuccess('Account created successfully! You can now log in.');
      console.log('Signup Response:', response.data);

      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className='auth-form'>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className='login-createAccount-btn' data-theme = "lightBtn">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

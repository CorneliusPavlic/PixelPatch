import React, { useState } from 'react';
import '../../styles/Auth.css';
import $ from "jquery";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Add signup logic here
    console.log("Signing up:", { username, email, password, theme });
    const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: {"Username": username,"Email": email, "Password" : password, "Theme": theme},
            success(data) {
              console.log("Signed Up:", data);
            },
        });
  };

  return (
    <div className="signup-container">
      <form 
      action="http://localhost/phpmyadmin/Example/HIC/PixelPatch/pixel-patch/src/php/signup.php"
      method="post"
      onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="theme"
          placeholder="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

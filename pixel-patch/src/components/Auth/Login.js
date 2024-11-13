import React, { useState } from 'react';
import '../../styles/Auth.css';
import $ from "jquery";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Logging in:", { username, password });
    const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: {"Username": username, "Password" : password},
            success(data) {
              console.log(data);
            },
        });
  };

  return (
    <div className="login-container">
      
        <form 
          action="http://localhost/phpmyadmin/Example/HIC/PixelPatch/pixel-patch/src/php/login.php"
          method="post"
          onSubmit={handleLogin}
        >
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>

    /*
    const [name, setName] = useState("");
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        });
    };
    return (
      <div className="login-container">
        
        <form
          action="http://localhost/phpmyadmin/Example/HIC/PixelPatch/pixel-patch/src/php/server.php"
          method="post"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label htmlFor="name">Name: </label>
          <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) =>
                  handleChange(event)
              }
          />
          <br />
          <button type="submit">Submit</button>
      </form>
      <h1>{result}</h1>
      </div>*/
  );
};

export default Login;

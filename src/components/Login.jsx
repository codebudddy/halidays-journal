import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const appPassword = process.env.APP_PASSWORD;
  const handleLogin = (e) => {
    if (password === 'INtuit#014') {
      localStorage.setItem('user', appPassword);
      navigate('/');
    }
    console.log(password);

    setPassword('');
  };
  return (
    <div className="login">
      <h1 className="login__heading">Enter Password to Continue</h1>
      <div className="login__password">
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter Password"
          />
        </label>
        <button type="button" onClick={handleLogin} className="login__submit">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

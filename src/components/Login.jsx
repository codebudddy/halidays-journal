import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase.config';
import './login.css';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="login">
      <h1 className="login__heading">Sign In </h1>
      <div className="login__password">
        <label htmlFor="password">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter Email"
          />
        </label>
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

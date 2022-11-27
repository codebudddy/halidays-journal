import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TfiWrite } from 'react-icons/tfi';
import { SlCalender } from 'react-icons/sl';
import { HiOutlineHome } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { authentication } from '../firebase.config';
import { signOut } from 'firebase/auth';
import './header.css';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    signOut(authentication)
      .then(() => {
        console.log('User signed out');
        window.location.reload();
        navigate('/login');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="header">
      <Link to="/">
        <h1 className="header__brand">Dday</h1>
      </Link>
      <ul className="header__nav">
        <li className="header__nav-link">
          <Link to="/">
            <HiOutlineHome />
          </Link>
        </li>
        <li className="header__nav-link">
          <Link to="/posts">
            <SlCalender />
          </Link>
        </li>
        <li className="header__nav-link">
          <Link to="/compose">
            <TfiWrite />
          </Link>
        </li>
        {user && (
          <li className="header__nav-link power" onClick={logout}>
            <AiOutlinePoweroff />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;

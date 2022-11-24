import React from 'react';
import { Link } from 'react-router-dom';
import { TfiWrite } from 'react-icons/tfi';
import { SlCalender } from 'react-icons/sl';
import { HiOutlineHome } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import './header.css';

const Header = () => {
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
        <li className="header__nav-link power">
          <AiOutlinePoweroff />
        </li>
      </ul>
    </div>
  );
};

export default Header;

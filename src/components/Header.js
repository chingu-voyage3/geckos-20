import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="board__header">
    <Link to="/dashboard" className="board__header__title">
      Just in Time
    </Link>
    <p className="board__header__logout">Log Out</p>
  </div>
);

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../store/actions/authActions';

const Header = ({ onStartLogout }) => (
  <div className="board__header">
    <Link to="/" className="board__header__title">
      Just in Time
    </Link>
    <button onClick={onStartLogout} className="board__header__logout">
      Log Out
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onStartLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(Header);

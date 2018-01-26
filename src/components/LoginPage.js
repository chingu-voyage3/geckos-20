import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../store/actions/authActions';

const LoginPage = props => (
  <div className="login-page">
    <h1>Just in time</h1>
    <h2>Kanban cards</h2>
    <div>
      <button onClick={props.onLogin} className="btn btn--animated btn--login">
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);

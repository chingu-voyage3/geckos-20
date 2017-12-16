import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  signIn() {
    const { email, password } = this.state;
    /* firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log('error ', error);
        this.setState({ error });
      }); */
  }

  render() {
    return (
      <div className="sign">
        <div className="header">Geckos-20 Trello Clone</div>
        <h2>Sign In</h2>
        <h5>{this.state.error}</h5>
        <input
          onChange={e => this.setState({ email: e.target.value })}
          className="input"
          type="email"
          placeholder="Email"
          required
          autoComplete="false"
        />
        <input
          onChange={e => this.setState({ password: e.target.value })}
          className="input"
          type="password"
          placeholder="Password"
          required
          autoComplete="false"
        />
        <button onClick={() => this.signIn()} className="access">
          SIGN IN
        </button>
        <div>
          <Link to="/Signup">Create account</Link>
        </div>
      </div>
    );
  }
}

export default Signin;

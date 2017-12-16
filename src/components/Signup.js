import React, { Component } from 'react';
import { firebaseApp } from '../firebase/firebase';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  signUp() {
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log('error ', error);
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className="sign">
        <div className="header">Geckos-20 Trello Clone</div>
        <h2>Sign Up</h2>
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
        <button onClick={() => this.signUp()} className="access">
          SIGN UP
        </button>
      </div>
    );
  }
}

export default Signup;

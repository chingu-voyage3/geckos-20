import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    );
  }
}

export default App;

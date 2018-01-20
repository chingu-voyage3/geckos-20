import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/Header';
import BoardContainer from './containers/BoardContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BoardContainer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/Header';
import BoardContainer from './containers/BoardContainer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <BoardContainer />
      </React.Fragment>
    );
  }
}

export default App;

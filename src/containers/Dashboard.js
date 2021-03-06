import React, { Component } from 'react';
import BoardContainer from './BoardContainer';

export default class Dashboard extends Component {
  state = {
    boards: []
  };
  render() {
    return (
      <React.Fragment>
        {this.state.boards.length > 1 ? <BoardContainer /> : null}
      </React.Fragment>
    );
  }
}

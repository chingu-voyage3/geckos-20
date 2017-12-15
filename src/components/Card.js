import React, { Component } from 'react';
import CheckList from './CheckList';

export default class ColumnCard extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false,
    };
  }

  onToggleDesc = () => {
    this.setState((state, props) => ({ showDetails: !this.state.showDetails }));
  };

  render() {
    // Var and conditional for toggling description of the card on and off
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          {this.props.description}
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card__title" onClick={this.onToggleDesc}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

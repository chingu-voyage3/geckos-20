import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import CheckList from './CheckList';

const titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(`${propName} in ${componentName} is longer than 80 characters`, );
    }
  }
};

export default class ColumnCard extends Component {
  constructor() {
    super();
    this.state = {
      showDetails: false,
    };
  }

  onToggleDetails = () => {
    this.setState((state, props) => ({ showDetails: !this.state.showDetails }));
  };

  render() {
    /* eslint-disable jsx-a11y/no-static-element-interactions  */ /* eslint-disable react/no-danger */
    // Var and conditional for toggling description of the card on and off
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <span
            dangerouslySetInnerHTML={{ __html: marked(this.props.description) }}
          />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      );
    }
    const sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color,
    };
    return (
      <div className="card">
        <div style={sideColor} />
        <div
          className={
            this.state.showDetails
              ? 'card__title card__title--is-open'
              : 'card__title'
          }
          onClick={this.onToggleDetails}
          onKeyDown={this.onToggleDetails}
        >
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

ColumnCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

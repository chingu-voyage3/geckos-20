import React, { Component } from 'react';

export default class ColumnCard extends Component {
  render() {
    return (
      <div className="card">
        <div>
          <h3>Card title</h3>
          <p>Card body</p>
          <ul>
            <li>SDD</li>
            <li>IB</li>
            <li>AI</li>
            <li>XSS</li>
            <li>XML</li>
            <li>ADP</li>
          </ul>
        </div>
      </div>
    );
  }
}

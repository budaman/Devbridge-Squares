import React, { Component } from 'react'


class Counting extends Component {

  render() {
    return (
    <div
      className="counting">
        <h5>Points</h5>
        <p>{this.props.coord}</p>
      </div>
    );
  }
}

export default Counting

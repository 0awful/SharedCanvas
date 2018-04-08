import React, { Component } from 'react';
import subscribeToTimer from './sockets';

class Timer extends Component {
  constructor(...props) {
    super(...props);
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  state = {
    timestamp: 'Please Wait...'
  };

  render() {
    return (
      <div>
        <p id="Timer">{this.state.timestamp}</p>
      </div>
    );
  }
}
export default Timer;

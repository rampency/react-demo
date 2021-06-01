import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

// This is the list of messages.
import { messages } from './data.json';

class App extends Component {
  render() {
    return <p>123</p>;
  }
}

render(<App />, document.getElementById('root'));

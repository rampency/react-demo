import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Messages from './components/Messages';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Messages />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

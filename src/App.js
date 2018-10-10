import React, { Component } from 'react';
import Streamers from './Components/Streamers/Streamers';
import './sass/main.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Streamers />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Streamers from './Components/Streamers/Streamers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Streamers />
      </div>
    );
  }
}

export default App;

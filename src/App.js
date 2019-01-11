import React, { Component } from 'react';
import Streamers from './Components/Streamers/Streamers';
import './sass/main.css';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <div id='app-title'>
          <h1 id='app-title-main'>Twitch Viewer</h1>
          <h1 id='app-title-shadow'>Twitch Viewer</h1>
        </div>
        <Streamers />
      </div>
    );
  }
}

export default App;

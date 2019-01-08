import React, { Component } from 'react';
import TwitchPlayer from './TwitchPlayer';

class StreamerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  expandTwitchPlayer = (playerId) => {
    this.props.focusedStreamer(playerId);
  }

  render() {
    const twitchPlayer = this.props.expanded ? (
        <TwitchPlayer channelName={this.props.channelName} expanded={this.props.expanded}/>
      ) : null;

    const playerStyle = this.props.expanded ? {opacity: '1'} : {opacity: '0'};

    return (
      <div className='streamer-info' id={this.props.id}>
        <div className='info-top'>
          <div className='logo'>
            <a href={this.props.channelLink} target='_blank'>
              <img src={this.props.logo} alt='player-logo' />
            </a>
          </div>
          <div className='channel'>
            <a href={this.props.channelLink} target='_blank'>
              <h4>{this.props.channelName}</h4>
            </a>
          </div>
          <div className='status'>
            <a href={this.props.channelLink} target='_blank'>
              {this.props.status}
            </a>
          </div>
          <span id='delete-button' onClick={this.props.onDelete}> x </span>
        </div>
        <div className={this.props.expanded ? 'info-bottom expanded' : 'info-bottom'}>
          <div className='player-container' style={playerStyle}>
            {twitchPlayer}
          </div>
          {this.props.id === 'online' ? <p className='expand-btn' onClick={() => {this.expandTwitchPlayer(this.props.userId)}}>V</p> : null}
        </div>
      </div>
    );
  }
}

export default StreamerInfo;

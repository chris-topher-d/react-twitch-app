import React, { Component } from 'react';
import TwitchPlayer from './TwitchPlayer';

class StreamerInfo extends Component {
  expandTwitchPlayer = (playerId) => {
    this.props.focusedStreamer(playerId);
  }

  render() {
    const twitchPlayer = this.props.expanded ? (
        <TwitchPlayer channelName={this.props.channelName} expanded={this.props.expanded}/>
      ) : null;

    const playerStyle = this.props.expanded ? {opacity: '1', height: '500px'} : {opacity: '0', height: '0px'};

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
          <div className='streamer-btns'>
            <span className='delete-button' onClick={this.props.onDelete} title="Remove">x</span>
            {
              this.props.id === 'online' ?
              <i
                className={this.props.expanded ? 'fas fa-angle-double-down expand-btn rotate' : 'fas fa-angle-double-down expand-btn'}
                onClick={() => {this.expandTwitchPlayer(this.props.userId)}}
              ></i>
              : null
            }
          </div>
        </div>
        <div className={this.props.expanded ? 'info-bottom expanded' : 'info-bottom'}>
          <div className='player-container' style={playerStyle}>
            {twitchPlayer}
          </div>
        </div>
      </div>
    );
  }
}

export default StreamerInfo;

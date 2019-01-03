import React, { Component } from 'react';
import TwitchPlayer from './TwitchPlayer';

class StreamerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  expandChannel = () => {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const twitchPlayer = this.state.expanded ? (
        <TwitchPlayer channelName={this.props.channelName} />
      ) : null;

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
        <div className='info-bottom'>
          {twitchPlayer}
          {this.props.id === 'online' ? <p className='expand-btn' onClick={this.expandChannel}>V</p> : null}
        </div>
      </div>
    );
  }
}

export default StreamerInfo;
